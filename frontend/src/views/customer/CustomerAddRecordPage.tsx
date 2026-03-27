import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { fetchDataWithCatch, hasError } from "../../Utils";

const path = "customer";

export default function CustomerAddRecordPage() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState<unknown>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        fetchDataWithCatch(`http://localhost:5000/${path}`, (data) => {
            if (hasError(data)) {
                setResponse(data);
            } else if (!data || !(typeof data === "object") || !("redirect" in data) || !(typeof data.redirect === "boolean")) {
                setResponse(new Error("Unexpected data type"));
            } else if (data.redirect) {
                navigate(`/customer/login`);
            } else {
                navigate(`/${path}`);
            }
        }, setResponse, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({firstname, lastname, email, phone, address, city, state, zip, username, password})
        });
    };

    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr><td>First Name: </td><td><input type="text" name="firstname" maxLength={20} value={firstname} onChange={(e) => setFirstName(e.target.value)} required /></td></tr>
                            <tr><td>Last Name: </td><td><input type="text" name="lastname" maxLength={20} value={lastname} onChange={(e) => setLastName(e.target.value)} required /></td></tr>
                            <tr><td>Email: </td><td><input type="email" name="email" maxLength={25} value={email} onChange={(e) => setEmail(e.target.value)} required /></td></tr>
                            <tr><td>Phone: </td><td><input type="text" name="phone" maxLength={20} value={phone} onChange={(e) => setPhone(e.target.value)} required /></td></tr>
                            <tr><td>Address: </td><td><input type="text" name="address" maxLength={50} value={address} onChange={(e) => setAddress(e.target.value)} required /></td></tr>
                            <tr><td>City: </td><td><input type="text" name="city" maxLength={20} value={city} onChange={(e) => setCity(e.target.value)} required /></td></tr>
                            <tr><td>State: </td><td><input type="text" name="state" maxLength={50} value={state} onChange={(e) => setState(e.target.value)} required /></td></tr>
                            <tr><td>Zip: </td><td><input type="text" name="zip" maxLength={10} value={zip} onChange={(e) => setZip(e.target.value)} required /></td></tr>
                            <tr><td>Username: </td><td><input type="text" name="username" maxLength={20} value={username} onChange={(e) => setUsername(e.target.value)} required /></td></tr>
                            <tr><td>Password: </td><td><input type="password" name="password" maxLength={30} value={password} onChange={(e) => setPassword(e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}