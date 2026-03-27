import type { NavigateFunction } from "react-router-dom";
import { isError } from "../../shared/data/ErrorData";

export type SubmitFormEvent = React.SubmitEvent<HTMLFormElement>;
export type SetResponse = React.Dispatch<React.SetStateAction<unknown>>;

export function fetchWithCatch(input: string, thenClause: () => void, setResponse: SetResponse, init?: RequestInit) {
    fetch(input, init).then(thenClause).catch(err => {
        setResponse(err);
    });
}

export function fetchDataWithCatch(input: string, thenClause: (data: unknown) => void, setResponse: SetResponse, init?: RequestInit) {
    fetch(input, init).then(res => res.json()).then(thenClause).catch(err => {
        setResponse(err);
    });
}

export function getAllRecords(path: string, setResponse: SetResponse) {
    fetchDataWithCatch(`http://localhost:5000/${path}`, (data) => setResponse(data), setResponse, {credentials: "include"});
}

export function addRecord(path: string, data: object, setResponse: SetResponse, navigate: NavigateFunction) {
    fetchDataWithCatch(`http://localhost:5000/${path}`, (data) => hasError(data) ? setResponse(data) : navigate(`/${path}`), setResponse, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(data)
    });
}

export function editRecord(path: string, data: object, setResponse: SetResponse, navigate: NavigateFunction) {
    fetchDataWithCatch(`http://localhost:5000/${path}/save`, (data) => hasError(data) ? setResponse(data) : navigate(`/${path}`), setResponse, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(data)
    });
}

export function deleteRecord(e: React.MouseEvent<HTMLAnchorElement>, path: string, recordid: number, setResponse: React.Dispatch<React.SetStateAction<unknown>>) {
    e.preventDefault(); // prevent page reload
    fetchDataWithCatch(`http://localhost:5000/${path}/delete`, (data) => hasError(data) ? setResponse(data) : getAllRecords(path, setResponse), setResponse, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({recordid})
    });
}

export function hasError(response: unknown) {
    return response instanceof Error || isError(response);
}

/*
export function checkResponse<T>(response: unknown, isType: (result: unknown) => result is T, Component: React.ComponentType<{response: T}>) {
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isType(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return <Component response={response} />;
    }
}
*/

export function isValidDecimal(value: string) {
    // Must be a number
    if (isNaN(parseFloat(value))) return false;
    const num = Number(value);
    // Must be >= 0
    if (num < 0) return false;
    // Must be <= 1e308
    if (num > 1e308) return false;
    // Must have at most 2 decimal places
    return /^\d+(\.\d{1,2})?$/.test(value);
}