import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { fetchDataWithCatch, hasError, type SubmitFormEvent } from "../../Utils";
import type { OptionalType } from "../../../../shared/Optional";

const path = "image";

export default function ImageAddRecordPage() {
    const [image, setImage] = useState<OptionalType<File>>(null);
    const [description, setDescription] = useState("");
    const [response, setResponse] = useState<unknown>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: SubmitFormEvent) => {
        e.preventDefault(); // prevent page reload
        if (!image) {
            alert("Please select an image");
        } else if (image.size > 2 * 1024 * 1024) {
            alert("Image must be under 2 MB");
        } else {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("description", description);

            fetchDataWithCatch(`http://localhost:5000/${path}`, (data) => {
                if (hasError(data)) {
                    setResponse(data);
                } else {
                    navigate(`/${path}`);
                }
            }, setResponse, {
                method: "POST",
                credentials: "include",
                body: formData
            });
        }
    };

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
        }
    }

    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr><td>Image: </td><td><input type="file" name="image" accept=".png,.jpg,.jpeg,.gif" onChange={onImageChange} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}