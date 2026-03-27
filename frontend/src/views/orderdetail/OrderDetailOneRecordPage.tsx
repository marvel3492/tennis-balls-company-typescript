import { useParams } from "react-router-dom";
import { isOrderDetail, type OrderDetailData } from "../../../../shared/data/OrderDetailData";
import ErrorPage from "../ErrorPage";
import OneRecordPage from "../../components/OneRecordPage";

const path = "orderdetail";

function OrderDetailOneRecord({onerec}: {onerec: OrderDetailData}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Order Detail ID: </td><td>{onerec.orderdetail_id}</td></tr>
                    <tr><td>Order ID: </td><td>{onerec.order_id}</td></tr>
                    <tr><td>Product ID: </td><td>{onerec.product_id}</td></tr>
                    <tr><td>Sale Price: </td><td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(onerec.saleprice)}</td></tr>
                    <tr><td>Quantity: </td><td>{onerec.qty}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function OrderDetailOneRecordPage() {
    const { id } = useParams();
    if (!id) {
        return <ErrorPage error={new Error("Id is not defined")} />;
    } else {
        return <OneRecordPage path={path} id={id} isType={isOrderDetail} Component={OrderDetailOneRecord} />;
    }
}