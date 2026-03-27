import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editRecord, fetchDataWithCatch, hasError, isValidDecimal, type SubmitFormEvent } from "../../Utils";
import { isPromotion } from "../../../../shared/data/PromotionData";
import ErrorPage from "../ErrorPage";

const path = "promotion";

export default function ProductEditRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useState<unknown>(null);
    const [image_id, setImageId] = useState("");
    const [promotitle, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [discountrate, setDiscount] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e: SubmitFormEvent) => {
        e.preventDefault(); // prevent page reload
        if (!isValidDecimal(discountrate)) {
            alert("Discount rate must be a finite non-negative decimal with up to two decimals");
        } else {
            editRecord(path, {id, promotitle, image_id, description, startdate, enddate, discountrate}, setResponse, navigate);
        }
    };

    useEffect(() => fetchDataWithCatch(`http://localhost:5000/${path}/${id}/edit`, (data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isPromotion(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setTitle(data.promotitle);
            setImageId(data.image_id ? data.image_id.toString() : "");
            setDescription(data.description);
            setStartDate(data.startdate);
            setEndDate(data.enddate);
            setDiscount(data.discountrate.toString());
            setResponse(data);
        }
    }, setResponse, {credentials: "include"}), [id]);

    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isPromotion(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Edit Record</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="promotion_id" value={response.promotion_id} />
                    <table>
                        <tbody>
                            <tr><td>Image ID (optional): </td><td><input type="number" name="image_id" min={1} max={9223372036854775807n.toString()} value={image_id} onChange={(e) => setImageId(e.target.value)} /></td></tr>
                            <tr><td>Promotion Title: </td><td><input type="text" name="promotitle" maxLength={50} value={promotitle} onChange={(e) => setTitle(e.target.value)} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} /></td></tr>
                            <tr><td>Start Date: </td><td><input type="date" name="startdate" value={startdate} onChange={(e) => setStartDate(e.target.value)} required /></td></tr>
                            <tr><td>End Date: </td><td><input type="date" name="enddate" value={enddate} onChange={(e) => setEndDate(e.target.value)} /></td></tr>
                            <tr><td>Discount Rate: </td><td><input type="text" name="discountrate" value={discountrate} onChange={(e) => setDiscount(e.target.value)} /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}