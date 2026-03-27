import { useState, useEffect } from "react";
import { deleteRecord, getAllRecords } from "../../Utils";
import { isImageArray } from "../../../../shared/data/ImageData";
import AllRecordsPage from "../../components/AllRecordsPage";
import type { ImageData } from "../../../../shared/data/ImageData";

const path = "image";

export default function ImageAllRecordsPage() {
    const [response, setResponse] = useState<unknown>(null);
    
    function ImageAllRecords({allrecs}: {allrecs: ImageData[]}) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Image ID</th>
                            <th>Filename</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.image_id}>
                                <td>{recref.image_id}</td>
                                <td>{recref.filename}</td>
                                <td><img src={`http://localhost:5000/images/${recref.filename}`} alt={recref.description} width="100" height="100" /></td>
                                <td>{recref.description}</td>
                                <td>
                                    <a href={`/${path}/${recref.image_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.image_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.image_id, setResponse); }}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
            </>
        );
    }
    
    useEffect(() => getAllRecords(path, setResponse), []);

    return <AllRecordsPage path={path} response={response} isTypeArray={isImageArray} Component={ImageAllRecords} />;
}