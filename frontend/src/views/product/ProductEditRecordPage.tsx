import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRecord, fetchDataWithCatch, hasError, isValidDecimal, type SubmitFormEvent } from "../../Utils";
import { isProduct } from "../../../../shared/data/ProductData";
import ErrorPage from "../ErrorPage";

const path = "product";

export default function ProductEditRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useState<unknown>(null);
    const [productname, setProductName] = useState("");
    const [image_id, setImageId] = useState("");
    const [description, setDescription] = useState("");
    const [saleprice, setPrice] = useState("");
    const [homepage, setHomepage] = useState(false);
    const [stock, setStock] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: SubmitFormEvent) => {
        e.preventDefault(); // prevent page reload
        if (!isValidDecimal(saleprice)) {
            alert("Sale price must be a finite non-negative decimal with up to two decimals");
        } else {
            editRecord(path, {id, productname, image_id, description, saleprice, homepage, stock}, setResponse, navigate);
        }
    };

    useEffect(() => fetchDataWithCatch(`http://localhost:5000/${path}/${id}/edit`, (data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isProduct(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setProductName(data.productname);
            setImageId(data.image_id ? data.image_id.toString() : "");
            setDescription(data.description);
            setPrice(data.saleprice.toString());
            setHomepage(data.homepage ? true : false);
            setStock(data.stock.toString());
            setResponse(data);
        }
    }, setResponse, {credentials: "include"}), [id]);

    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isProduct(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Edit Record</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="product_id" value={response.product_id} />
                    <table>
                        <tbody>
                            <tr><td>Image ID (optional): </td><td><input type="number" name="image_id" min={1} max={9223372036854775807n.toString()} value={image_id} onChange={(e) => setImageId(e.target.value)} /></td></tr>
                            <tr><td>Product Name: </td><td><input type="text" name="productname" maxLength={50} value={productname} onChange={(e) => setProductName(e.target.value)} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} /></td></tr>
                            <tr><td>Price: </td><td><input type="text" name="saleprice" value={saleprice} onChange={(e) => setPrice(e.target.value)} required /></td></tr>
                            <tr><td>Homepage: </td><td><input type="checkbox" name="homepage" checked={homepage} onChange={(e) => setHomepage(e.target.checked)} /></td></tr>
                            <tr><td>Stock: </td><td><input type="number" name="stock" min={0} max={9223372036854775807n.toString()} value={stock} onChange={(e) => setStock(e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}