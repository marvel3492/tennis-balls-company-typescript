import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRecord, fetchDataWithCatch, hasError, isValidDecimal, type SubmitFormEvent } from "../../Utils";
import { isOrderDetail } from "../../../../shared/data/OrderDetailData";
import ErrorPage from "../ErrorPage";

const path = "orderdetail";

export default function OrderDetailEditRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useState<unknown>(null);
    const [order_id, setOrderId] = useState("");
    const [product_id, setProductId] = useState("");
    const [saleprice, setSalePrice] = useState("");
    const [qty, setQuantity] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: SubmitFormEvent) => {
        e.preventDefault(); // prevent page reload
        if (!isValidDecimal(saleprice)) {
            alert("Sale price must be a finite non-negative decimal with up to two decimals");
        } else {
            editRecord(path, {id, order_id, product_id, saleprice, qty}, setResponse, navigate);
        }
    };

    useEffect(() => fetchDataWithCatch(`http://localhost:5000/${path}/${id}/edit`, (data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isOrderDetail(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setOrderId(data.order_id.toString());
            setProductId(data.product_id.toString());
            setSalePrice(data.saleprice.toString());
            setQuantity(data.qty.toString());
            setResponse(data);
        }
    }, setResponse, {credentials: "include"}), [id]);

    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isOrderDetail(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Edit Record</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="orderdetail_id" value={response.orderdetail_id} />
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