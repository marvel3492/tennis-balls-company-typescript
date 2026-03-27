import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isUser } from "../../shared/data/UserData";
import { fetchDataWithCatch, hasError } from "./Utils";
import ErrorPage from "./views/ErrorPage";

export default function ProtectedRoute({permissions, children}: {permissions: number, children: React.PropsWithChildren<React.ReactElement>}) {
    const [response, setResponse] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => fetchDataWithCatch("http://localhost:5000/customer/credentials", (data) => {
        setResponse(data);
        setLoading(false);
    }, setResponse, {credentials: "include"}), []);

    if (loading) return null;
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isUser(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        let guest = false;
        let customer = false;
        let admin = false;
        if (response.isadmin) {
            admin = true;
        } else if (response.customer_id) {
            customer = true;
        } else {
            guest = true;
        }

        if (permissions % 2 === 0 && guest) {
            return <Navigate to="/" replace />;
        } else if ((permissions >> 1) % 2 === 0 && customer) {
            return <Navigate to="/" replace />;
        } else if ((permissions >> 2) % 2 === 0 && admin) {
            return <Navigate to="/" replace />;
        }
        return children;
    }
}