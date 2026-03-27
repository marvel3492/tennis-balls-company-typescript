import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { isCustomer } from "../../../../shared/data/CustomerData";
import { editRecord, fetchDataWithCatch, hasError, type SubmitFormEvent } from "../../Utils";

const path = "customer";

export default function CustomerEditRecordPage() {
    const { id } = useParams();
    if (!id) {
        return <ErrorPage error={new Error("Id is not defined")} />;
    } else {
        const [response, setResponse] = useState<unknown>(null);
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
        const navigate = useNavigate();
        const handleSubmit = async (e: SubmitFormEvent) => {
            e.preventDefault(); // prevent page reload

            editRecord(path, {id, firstname, lastname, email, phone, address, city, state, zip, username, password}, setResponse, navigate);
        };

        useEffect(() => fetchDataWithCatch(`http://localhost:5000/${path}/${id}/edit`, (data) => {
            if (hasError(data)) {
                setResponse(data);
            } else if (!isCustomer(data)) {
                setResponse(new Error("Unexpected data type"));
            } else {
                setFirstName(data.firstname);
                setLastName(data.lastname);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
                setCity(data.city);
                setState(data.state);
                setZip(data.zip);
                setUsername(data.username);
                setResponse(data);
            }
        }, setResponse, {credentials: "include"}), [id]);

        if (response === null) {
            return <p>Loading...</p>;
        } else if (hasError(response)) {
            return <ErrorPage error={response} />;
        } else if (!isCustomer(response)) {
            return <ErrorPage error={Error("Unknown data type")} />;
        } else {
            return (
                <>
                    <h1>Edit Record</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="customer_id" value={response.customer_id} />
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
                                <tr><td>Password: </td><td><input type="password" name="password" maxLength={30} value={password} onChange={(e) => setPassword(e.target.value)} /></td></tr>
                            </tbody>
                        </table>
                        <button type="submit">Save</button>
                    </form>
                </>
            );
        }
    }
}