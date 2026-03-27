import { useState, useEffect } from "react";
import { getAllRecords, hasError } from "../../Utils";
import { isSaleArray } from "../../../../shared/data/SaleData";
import ErrorPage from "../ErrorPage";

const path = "report/sale";

export default function SaleList() {
    const [response, setResponse] = useState<unknown>(null);
    useEffect(() => getAllRecords(path, setResponse), []);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isSaleArray(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        if (response.length > 0) {
            return (
                <>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Order Date</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {response.map((recref) => (
                                <tr key={recref.order_id}>
                                    <td>{recref.order_id}</td>
                                    <td>{recref.firstname}</td>
                                    <td>{recref.lastname}</td>
                                    <td>{new Date(recref.saledate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                    <td>{recref.productname}</td>
                                    <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td>
                                    <td>{recref.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            );
        } else {
            return (
                <>
                    <p>No Records Available</p>
                </>
            );
        }
    }
}