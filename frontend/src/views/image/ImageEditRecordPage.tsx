import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import type { OptionalType } from "../../../../shared/Optional";
import { isImage } from "../../../../shared/data/ImageData";
import { fetchDataWithCatch, hasError, type SubmitFormEvent } from "../../Utils";

const path = "image";

export default function ImageEditRecordPage() {
    const { id } = useParams();
    if (!id) {
        return <ErrorPage error={new Error("Id is not defined")} />;
    } else {
        const [response, setResponse] = useState<unknown>(null);
        const [image, setImage] = useState<OptionalType<File>>(null);
        const [description, setDescription] = useState("");
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
                formData.append("id", id);
                formData.append("description", description);

                fetchDataWithCatch(`http://localhost:5000/${path}/save`, (data) => {
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

        useEffect(() => fetchDataWithCatch(`http://localhost:5000/${path}/${id}/edit`, (data) => {
            if (hasError(data)) {
                setResponse(data);
            } else if (!isImage(data)) {
                setResponse(new Error("Unexpected data type"));
            } else {
                setDescription(data.description);
                setResponse(data);
            }
        }, setResponse, {credentials: "include"}), [id]);

        if (response === null) {
            return <p>Loading...</p>;
        } else if (hasError(response)) {
            return <ErrorPage error={response} />;
        } else if (!isImage(response)) {
            return <ErrorPage error={Error("Unknown data type")} />;
        } else {
            return (
                <>
                    <h1>Edit Record</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="image_id" value={response.image_id} />
                        <table>
                            <tbody>
                                <tr><td>Image (optional): </td><td><input type="file" name="image" accept=".png,.jpg,.jpeg,.gif" onChange={onImageChange} /></td></tr>
                                <tr><td>Description: </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} /></td></tr>
                            </tbody>
                        </table>
                        <button type="submit">Save</button>
                    </form>
                </>
            );
        }
    }
}