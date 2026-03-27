import { useState, useEffect } from "react";
import Product from "../../components/Product";
import { isCatalogArray } from "../../../../shared/data/CatalogData";
import { fetchDataWithCatch, hasError } from "../../Utils";
import ErrorPage from "../ErrorPage";

export default function Catalog() {
    const [response, setResponse] = useState<unknown>(null);
    useEffect(() => fetchDataWithCatch("http://localhost:5000/catalog", (data) => setResponse(data), setResponse), []);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isCatalogArray(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Catalog</h1>
                {response.length > 0 && response.map((recref) => (
                    recref.stock > 0 && // Not all of the products will show, since some products are out of stock.
                    <Product recref={recref} key={recref.product_id} />
                ))}
            </>
        );
    }
}