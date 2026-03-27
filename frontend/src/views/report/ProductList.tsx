import { useState, useEffect } from "react";
import { getAllRecords, hasError } from "../../Utils";
import { isProductArray } from "../../../../shared/data/ProductData";
import ErrorPage from "../ErrorPage";

const path = "report/product";

export default function ProductList() {
    const [response, setResponse] = useState<unknown>(null);
    useEffect(() => getAllRecords(path, setResponse), []);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isProductArray(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        if (response.length > 0) {
            return (
                <>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Image ID</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Homepage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {response.map((recref) => (
                                <tr key={recref.product_id}>
                                    <td>{recref.product_id}</td>
                                    <td>{recref.image_id}</td>
                                    <td>{recref.productname}</td>
                                    <td>{recref.description}</td>
                                    <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td>
                                    <td>{recref.stock}</td>
                                    <td>{recref.homepage}</td>
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