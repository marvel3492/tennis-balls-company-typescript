import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import OneRecordPage from "../../components/OneRecordPage";
import { isSaleOrder, type SaleOrderData } from "../../../../shared/data/SaleOrderData";

const path = "saleorder";

function SaleOrderOneRecord({onerec}: {onerec: SaleOrderData}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Order ID: </td><td>{onerec.order_id}</td></tr>
                    <tr><td>Customer ID: </td><td>{onerec.customer_id}</td></tr>
                    <tr><td>Sale Date: </td><td>{new Date(onerec.saledate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                    <tr><td>Customer Notes: </td><td>{onerec.customernotes}</td></tr>
                    <tr><td>Payment Status: </td><td>{onerec.paymentstatus}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function SaleOrderOneRecordPage() {
    const { id } = useParams();
    if (!id) {
        return <ErrorPage error={new Error("Id is not defined")} />;
    } else {
        return <OneRecordPage path={path} id={id} isType={isSaleOrder} Component={SaleOrderOneRecord} />;
    }
}