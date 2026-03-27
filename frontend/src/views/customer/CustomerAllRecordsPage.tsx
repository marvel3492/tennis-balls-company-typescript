import { useState, useEffect } from "react";
import { deleteRecord, getAllRecords } from "../../Utils";
import { isCustomerArray, type CustomerData } from "../../../../shared/data/CustomerData";
import AllRecordsPage from "../../components/AllRecordsPage";

const path = "customer";

export default function CustomerAllRecordsPage() {
    const [response, setResponse] = useState<unknown>(null);

    function CustomerAllRecords({allrecs}: {allrecs: CustomerData[]}) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Username</th>
                            <th>Admin?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.customer_id}>
                                <td>{recref.customer_id}</td>
                                <td>{recref.firstname}</td>
                                <td>{recref.lastname}</td>
                                <td>{recref.email}</td>
                                <td>{recref.phone}</td>
                                <td>{recref.address}</td>
                                <td>{recref.city}</td>
                                <td>{recref.state}</td>
                                <td>{recref.zip}</td>
                                <td>{recref.username}</td>
                                <td>{recref.isadmin ? 'Yes' : 'No'}</td>
                                <td>
                                    <a href={`/${path}/${recref.customer_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.customer_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.customer_id, setResponse); }}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
            </>
        );
    }

    useEffect(() => getAllRecords(path, setResponse), []);

    return <AllRecordsPage path={path} response={response} isTypeArray={isCustomerArray} Component={CustomerAllRecords} />;
}