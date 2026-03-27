import { useState, useEffect } from "react";
import { deleteRecord, getAllRecords } from "../../Utils";
import { isSaleOrderArray, type SaleOrderData } from "../../../../shared/data/SaleOrderData";
import AllRecordsPage from "../../components/AllRecordsPage";

const path = "saleorder";

export default function SaleOrderAllRecordsPage() {
    const [response, setResponse] = useState<unknown>(null);

    function SaleOrderAllRecords({allrecs}: {allrecs: SaleOrderData[]}) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer ID</th>
                            <th>Sale Date</th>
                            <th>Customer Notes</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.order_id}>
                                <td>{recref.order_id}</td>
                                <td>{recref.customer_id}</td>
                                <td>{new Date(recref.saledate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{recref.customernotes}</td>
                                <td>{recref.paymentstatus}</td>
                                <td>
                                    <a href={`/${path}/${recref.order_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.order_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.order_id, setResponse); }}>Delete</a>
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
        
    return <AllRecordsPage path={path} response={response} isTypeArray={isSaleOrderArray} Component={SaleOrderAllRecords} />;
}