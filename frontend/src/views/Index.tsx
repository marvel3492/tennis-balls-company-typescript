import { useState, useEffect } from "react";
import logo from "../../src/assets/logo.png"
import Product from "../components/Product";
import { isIndex } from "../../../shared/data/IndexData";
import { fetchDataWithCatch, hasError } from "../Utils";
import ErrorPage from "./ErrorPage";

export default function Index() {
    const [response, setResponse] = useState<unknown>(null);
    useEffect(() => fetchDataWithCatch("http://localhost:5000/", (data) => setResponse(data), setResponse), []);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isIndex(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Home</h1>
                <table border={1} width="100%">
                    <tbody>
                        <tr>
                            <td width="80%">
                                <p>Welcome to Tennis Balls Company</p>
                                <hr />
                                {response.catalog.length > 0 && response.catalog.map((recref) => (
                                    <Product recref={recref} key={recref.product_id} />
                                ))}
                            </td>
                            <td width="20%">
                                {response.promotions.length > 0 && response.promotions.map((recref) => (
                                    <p key={recref.promotion_id}><a href={`/promotion/${recref.promotion_id}/show`}><img src={recref.filename ? `http://localhost:5000/images/${recref.filename}` : logo} alt={recref.description} width="100" height="100" /></a></p>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}