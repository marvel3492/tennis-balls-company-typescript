import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { isCustomer, type CustomerData } from "../../../../shared/data/CustomerData";
import OneRecordPage from "../../components/OneRecordPage";

const path = "customer";

function CustomerOneRecord({onerec}: {onerec: CustomerData}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Customer ID: </td><td>{onerec.customer_id}</td></tr>
                    <tr><td>First Name: </td><td>{onerec.firstname}</td></tr>
                    <tr><td>Last Name: </td><td>{onerec.lastname}</td></tr>
                    <tr><td>Email: </td><td>{onerec.email}</td></tr>
                    <tr><td>Phone: </td><td>{onerec.phone}</td></tr>
                    <tr><td>Address: </td><td>{onerec.address}</td></tr>
                    <tr><td>City: </td><td>{onerec.city}</td></tr>
                    <tr><td>State: </td><td>{onerec.state}</td></tr>
                    <tr><td>Zip: </td><td>{onerec.zip}</td></tr>
                    <tr><td>Username: </td><td>{onerec.username}</td></tr>
                    <tr><td>Admin? </td><td>{onerec.isadmin ? 'Yes' : 'No'}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function CustomerOneRecordPage() {
    const { id } = useParams();
    if (!id) {
        return <ErrorPage error={new Error("Id is not defined")} />;
    } else {
        return <OneRecordPage path={path} id={id} isType={isCustomer} Component={CustomerOneRecord} />;
    }
}