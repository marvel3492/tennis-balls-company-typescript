import { useParams } from "react-router-dom";
import { isImage, type ImageData } from "../../../../shared/data/ImageData";
import ErrorPage from "../ErrorPage";
import OneRecordPage from "../../components/OneRecordPage";

const path = "image";

function ImageOneRecord({onerec}: {onerec: ImageData}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Image ID: </td><td>{onerec.image_id}</td></tr>
                    <tr><td>Filename: </td><td>{onerec.filename}</td></tr>
                    <tr><td>Image: </td><td><img src={`http://localhost:5000/images/${onerec.filename}`} alt={onerec.description} width="100" height="100" /></td></tr>
                    <tr><td>Description: </td><td>{onerec.description}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function ImageOneRecordPage() {
    const { id } = useParams();
    if (!id) {
        return <ErrorPage error={new Error("Id is not defined")} />;
    } else {
        return <OneRecordPage path={path} id={id} isType={isImage} Component={ImageOneRecord} />;
    }
}