import { useState, useEffect } from "react";
import { deleteRecord, getAllRecords } from "../../Utils";
import { isOrderDetailArray, type OrderDetailData } from "../../../../shared/data/OrderDetailData";
import AllRecordsPage from "../../components/AllRecordsPage";

const path = "orderdetail";

export default function OrderDetailAllRecordsPage() {
    const [response, setResponse] = useState<unknown>(null);
    
    function OrderDetailAllRecords({allrecs}: {allrecs: OrderDetailData[]}) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Order Detail ID</th>
                            <th>Order ID</th>
                            <th>Product ID</th>
                            <th>Sale Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.orderdetail_id}>
                                <td>{recref.orderdetail_id}</td>
                                <td>{recref.order_id}</td>
                                <td>{recref.product_id}</td>
                                <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td>
                                <td>{recref.qty}</td>
                                <td>
                                    <a href={`/${path}/${recref.orderdetail_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.orderdetail_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.orderdetail_id, setResponse); }}>Delete</a>
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
    
    return <AllRecordsPage path={path} response={response} isTypeArray={isOrderDetailArray} Component={OrderDetailAllRecords} />;
}