import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import OneRecordPage from "../../components/OneRecordPage";
import { isProduct, type ProductData } from "../../../../shared/data/ProductData";

const path = "product";

function ProductOneRecord({onerec}: {onerec: ProductData}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Product ID: </td><td>{onerec.product_id}</td></tr>
                    <tr><td>Image ID: </td><td>{onerec.image_id}</td></tr>
                    <tr><td>Product Name: </td><td>{onerec.productname}</td></tr>
                    <tr><td>Description: </td><td>{onerec.description}</td></tr>
                    <tr><td>Sale Price: </td><td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(onerec.saleprice)}</td></tr>
                    <tr><td>Stock: </td><td>{onerec.stock}</td></tr>
                    <tr><td>Homepage: </td><td>{onerec.homepage}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function ProductOneRecordPage() {
    const { id } = useParams();
    if (!id) {
        return <ErrorPage error={new Error("Id is not defined")} />;
    } else {
        return <OneRecordPage path={path} id={id} isType={isProduct} Component={ProductOneRecord} />;
    }
}