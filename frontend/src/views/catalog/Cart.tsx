import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUser } from "../../../../shared/data/UserData";
import { isCart } from "../../../../shared/data/CartData";
import { fetchDataWithCatch, hasError } from "../../Utils";
import { getCartLength } from "../../../../shared/Cart";
import ErrorPage from "../ErrorPage";

export default function Cart() {
    const [response, setResponse] = useState<unknown>(null);
    const navigate = useNavigate();

    function showCart() {
        fetchDataWithCatch("http://localhost:5000/catalog/cart", (data) => setResponse(data), setResponse, {
            method: "GET",
            credentials: "include"
        });
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>, product_id: number) => {
        e.preventDefault(); // prevent page reload
        fetchDataWithCatch("http://localhost:5000/catalog/remove", (data) => hasError(data) ? setResponse(data) : showCart(), setResponse, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({product_id}),
            credentials: "include"
        });
    };

    function checkout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        fetchDataWithCatch("http://localhost:5000/customer/credentials", (data) => {
            if (!isUser(data)) {
                setResponse(Error("Unexpected data type"));
            } else if (data.customer_id) {
                navigate('/catalog/checkout');
            } else {
                navigate('/customer/login');
            }
        }, setResponse, {credentials: "include"});
    }
    
    useEffect(showCart, []);

    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isCart(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        if (getCartLength(response.cart) > 0) {
            return (
                <>
                    <p>Here products selected in your cart:</p>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Line Cost</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {response.cartitems.map((item, index) => (
                                <tr key={item.product_id}>
                                    <td>{item.productname}</td>
                                    <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.saleprice)}</td>
                                    <td>{response.cart[item.product_id]}</td>
                                    <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(response.lineItemCosts[index])}</td>
                                    <td><form onSubmit={(e) => handleSubmit(e, item.product_id)}>
                                        <input type="hidden" name="product_id" value={item.product_id} />
                                        <button type="submit">Remove</button>
                                    </form></td>
                                </tr>
                            ))}
                            <tr style={{backgroundColor: "yellow"}}>
                                <td colSpan={2}><b>Totals</b></td>
                                <td>Quantity: {response.totqty}</td>
                                <td>Cost: {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(response.totprice)}</td>
                                <td><button className='button1' onClick={checkout}>Checkout</button></td>
                            </tr>
                        </tbody>
                    </table>
                </>
            );
        } else {
            return <p>Cart Is Empty</p>;
        }
    }
}