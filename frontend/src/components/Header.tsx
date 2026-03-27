import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { isUser } from "../../../shared/data/UserData";
import { fetchDataWithCatch, fetchWithCatch, hasError } from "../Utils";
import ErrorPage from "../views/ErrorPage";

export default function Header() {
    const [search, setSearch] = useState("");
    const [response, setResponse] = useState<unknown>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        navigate(`/search?searchcriteria=${search}`);
    };

    const logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // prevent page reload
        fetchWithCatch("http://localhost:5000/customer/logout", () => navigate(0), setResponse, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        });
    };

    useEffect(() => {
        fetchDataWithCatch("http://localhost:5000/customer/credentials", (data) => setResponse(data), setResponse, {credentials: "include"});
    }, []);

    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isUser(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <table bgcolor='white' width='100%'>
                    <tbody>
                        <tr>
                            <td width='20%' align='left'>
                                <a href="/"><img src={logo} width="50%" height="50%" alt="A yellow tennis ball." /></a>
                            </td>
                            <td width='60%' align='center'><h1>Tennis Balls Company</h1></td>
                            <td width='10%' align='center'>
                                {(response && response.customer_id ?
                                    <>
                                        <b>Hello <b>{response.custname}</b></b>
                                        <br />
                                        <a href='/' onClick={logout}>Logout</a>
                                    </>
                                    :
                                    <>
                                        <a href='/customer/register'>New Customer</a>
                                        <br />
                                        <a href='/customer/login'>Login</a>
                                    </>
                                )}
                            </td>
                            <td width='10%' align='center'><a href="/catalog/cart">Cart</a></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <form onSubmit={handleSubmit}>
                    Search: <input type="text" name="searchcriteria" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <input type="submit" value="Go" />
                </form>
                <br />
                <ul>
                    <li> <a href="/">Home</a> </li>
                    <li> <a href="/catalog">Catalog</a> </li>
                    <li> <a href="/about">About Us</a> </li>
                    <li> <a href="/contact">Contact Us</a> </li>
                    {response && response.isadmin == 1 && <>
                        <li> <a href="/customer">Customers</a> </li>
                        <li> <a href="/image">Images</a> </li>
                        <li> <a href="/product">Products</a> </li>
                        <li> <a href="/saleorder">Sale Orders</a> </li>
                        <li> <a href="/orderdetail">Order Details</a> </li>
                        <li> <a href="/promotion">Promotions</a> </li>
                        <li> <a href="/report">Reports</a> </li>
                    </>}
                </ul>
            </>
        );
    }
}