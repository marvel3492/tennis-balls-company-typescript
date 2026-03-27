import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRecord, fetchDataWithCatch, hasError, type SubmitFormEvent } from "../../Utils";
import { isSaleOrder } from "../../../../shared/data/SaleOrderData";
import ErrorPage from "../ErrorPage";

const path = "saleorder";

export default function SaleOrderEditRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useState<unknown>(null);
    const [customer_id, setCustomerId] = useState("");
    const [saledate, setSaleDate] = useState("");
    const [customernotes, setCustomerNotes] = useState("");
    const [paymentstatus, setPaymentStatus] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: SubmitFormEvent) => {
        e.preventDefault(); // prevent page reload
        editRecord(path, {id, customer_id, saledate, customernotes, paymentstatus}, setResponse, navigate);
    };

    useEffect(() => fetchDataWithCatch(`http://localhost:5000/${path}/${id}/edit`, (data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isSaleOrder(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setCustomerId(data.customer_id.toString());
            setSaleDate(data.saledate);
            setCustomerNotes(data.customernotes);
            setPaymentStatus(data.paymentstatus.toString());
            setResponse(data);
        }
    }, setResponse, {credentials: "include"}), [id]);

    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isSaleOrder(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Edit Record</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="order_id" value={response.order_id} />
                    <table>
                        <tbody>
                            <tr><td>Customer ID: </td><td><input type="number" name="customer_id" min={0} max={9223372036854775807n.toString()} value={customer_id} onChange={(e) => setCustomerId(e.target.value)} required /></td></tr>
                            <tr><td>Sale Date: </td><td><input type="date" name="saledate" value={saledate} onChange={(e) => setSaleDate(e.target.value)} required /></td></tr>
                            <tr><td>Customer Notes: </td><td><textarea name="customernotes" rows={10} cols={30} placeholder="Description" maxLength={500} value={customernotes} onChange={(e) => setCustomerNotes(e.target.value)} /></td></tr>
                            <tr><td>Payment Status: </td><td><input type="number" name="paymentstatus" min={0} max={2} value={paymentstatus} onChange={(e) => setPaymentStatus(e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}