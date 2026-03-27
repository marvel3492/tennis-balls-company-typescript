import { useState, useEffect } from "react";
import { deleteRecord, getAllRecords } from "../../Utils";
import { isPromotionArray, type PromotionData } from "../../../../shared/data/PromotionData";
import AllRecordsPage from "../../components/AllRecordsPage";

const path = "promotion";

export default function PromotionAllRecordsPage() {
    const [response, setResponse] = useState<unknown>(null);

    function PromotionAllRecords({allrecs}: {allrecs: PromotionData[]}) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Promotion ID</th>
                            <th>Image ID</th>
                            <th>Promotion Title</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Discount Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.promotion_id}>
                                <td>{recref.promotion_id}</td>
                                <td>{recref.image_id}</td>
                                <td>{recref.promotitle}</td>
                                <td>{recref.description}</td>
                                <td>{new Date(recref.startdate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{new Date(recref.enddate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{recref.discountrate + "%"}</td>
                                <td>
                                    <a href={`/${path}/${recref.promotion_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.promotion_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.promotion_id, setResponse); }}>Delete</a>
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
        
    return <AllRecordsPage path={path} response={response} isTypeArray={isPromotionArray} Component={PromotionAllRecords} />;
}