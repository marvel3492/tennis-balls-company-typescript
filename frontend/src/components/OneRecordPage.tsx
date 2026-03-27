import { useState, useEffect } from "react";
import { fetchDataWithCatch, hasError } from "../Utils";
import ErrorPage from "../views/ErrorPage";

export default function OneRecordPage<T>({path, id, isType, Component}: {
    path: string,
    id: string,
    isType: (result: unknown) => result is T,
    Component: React.ComponentType<{ onerec: T }>
}) {
    const [response, setResponse] = useState<unknown>(null);
    useEffect(() => fetchDataWithCatch(`http://localhost:5000/${path}/${id}/show`, (data) => setResponse(data), setResponse, {credentials: "include"}), [id]);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isType(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return <Component onerec={response} />;
    }
}