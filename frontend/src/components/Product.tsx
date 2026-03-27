import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/assets/logo.png"
import type { CatalogData } from "../../../shared/data/CatalogData";
import { fetchWithCatch, hasError } from "../Utils";
import ErrorPage from "../views/ErrorPage";

export default function Product({ recref }: { recref: CatalogData }) {
    const [response, setResponse] = useState<unknown>(null);
    const [qty, setQuantity] = useState(1);
    const navigate = useNavigate();
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        const product_id = recref.product_id;
        fetchWithCatch("http://localhost:5000/catalog/add", () => navigate("/catalog/cart"), setResponse, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id, qty }),
            credentials: "include"
        });
    };

    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <div className="product">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="product_id" value={recref.product_id} />
                    <table>
                        <tbody>
                            <tr><td colSpan={2}><b>{recref.productname}</b></td></tr>
                            <tr><td colSpan={2}><img src={recref.filename ? `http://localhost:5000/images/${recref.filename}` : logo} alt={recref.description ? recref.description : undefined} width="100" height="100" /></td></tr>
                            <tr>
                                <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td><td>Stock: {recref.stock}</td>
                                <td><a href={`/product/${recref.product_id}/show`}>Details</a></td>
                            </tr>
                            <tr>
                                <td>Quantity:
                                    <select name="qty" value={qty} onChange={(e) => setQuantity(parseInt(e.target.value))} required>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </td>
                                <td><button type="submit">Add to Cart</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}