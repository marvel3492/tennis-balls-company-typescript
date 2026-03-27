import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import OneRecordPage from "../../components/OneRecordPage";
import { isPromotion, type PromotionData } from "../../../../shared/data/PromotionData";

const path = "promotion";

function PromotionOneRecord({onerec}: {onerec: PromotionData}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Promotion ID: </td><td>{onerec.promotion_id}</td></tr>
                    <tr><td>Image ID: </td><td>{onerec.image_id}</td></tr>
                    <tr><td>Promotion Title: </td><td>{onerec.promotitle}</td></tr>
                    <tr><td>Description: </td><td>{onerec.description}</td></tr>
                    <tr><td>Start Date: </td><td>{new Date(onerec.startdate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                    <tr><td>End Date: </td><td>{new Date(onerec.enddate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                    <tr><td>Discount Rate: </td><td>{onerec.discountrate + "%"}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function PromotionOneRecordPage() {
    const { id } = useParams();
    if (!id) {
        return <ErrorPage error={new Error("Id is not defined")} />;
    } else {
        return <OneRecordPage path={path} id={id} isType={isPromotion} Component={PromotionOneRecord} />;
    }
}