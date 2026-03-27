import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { addRecord, hasError, isValidDecimal, type SubmitFormEvent } from "../../Utils";

const path = "orderdetail";

export default function OrderDetailAddRecordPage() {
    const [order_id, setOrderId] = useState("");
    const [product_id, setProductId] = useState("");
    const [saleprice, setSalePrice] = useState("");
    const [qty, setQuantity] = useState("");
    const [response, setResponse] = useState<unknown>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: SubmitFormEvent) => {
        e.preventDefault(); // prevent page reload
        if (!isValidDecimal(saleprice)) {
            alert("Sale price must be a finite non-negative decimal with up to two decimals");
        } else {
            addRecord(path, {order_id, product_id, saleprice, qty}, setResponse, navigate);
        }
    };

    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr><td>Order ID: </td><td><input type="number" name="order_id" min={1} max={9223372036854775807n.toString()} value={order_id} onChange={(e) => setOrderId(e.target.value)} required /></td></tr>
                            <tr><td>Product ID: </td><td><input type="number" name="product_id" min={1} max={9223372036854775807n.toString()} value={product_id} onChange={(e) => setProductId(e.target.value)} required /></td></tr>
                            <tr><td>Sale Price: </td><td><input type="text" name="saleprice" value={saleprice} onChange={(e) => setSalePrice(e.target.value)} required /></td></tr>
                            <tr><td>Quantity: </td><td><input type="number" name="qty" min={1} max={9223372036854775807n.toString()} value={qty} onChange={(e) => setQuantity(e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}