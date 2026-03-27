import { useState, useEffect, useRef } from "react";
import { fetchDataWithCatch, hasError } from "../../Utils";
import ErrorPage from "../ErrorPage";

export default function Checkout() {
    const [response, setResponse] = useState<unknown>(null);
    const didRun = useRef(false);

    function showCheckout() {
        if (didRun.current) return;
        didRun.current = true;

        fetchDataWithCatch("http://localhost:5000/catalog/checkout", (data) => setResponse(data), setResponse, {
            method: "POST",
            credentials: "include"
        });
    }

    useEffect(showCheckout, []);

    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!(response !== null && (typeof response === "object") && ("ordernum" in response) && (typeof response.ordernum === "number"))) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        if (response.ordernum === -1) {
            return <p>Add products to your cart before checking out.</p>;
        } else {
            return (
                <>
                    <p>Thank you for the order.</p>
                    <p>Your order number is: {response.ordernum}</p>
                </>
            );
        }
    }
}