import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { addRecord, hasError, isValidDecimal, type SubmitFormEvent } from "../../Utils";

const path = "promotion";

export default function PromotionAddRecordPage() {
    const [image_id, setImageId] = useState("");
    const [promotitle, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [discountrate, setDiscount] = useState("");
    const [response, setResponse] = useState<unknown>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: SubmitFormEvent) => {
        e.preventDefault(); // prevent page reload
        if (!isValidDecimal(discountrate)) {
            alert("Discount rate must be a finite non-negative decimal with up to two decimals");
        } else {
            addRecord(path, {promotitle, image_id, description, startdate, enddate, discountrate}, setResponse, navigate);
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