import type { ErrorData } from "../../../shared/data/ErrorData";

export default function ErrorPage({error}: {error: Error | ErrorData}) {
    return (
        <>
            <h1>{error.name}</h1>
            <h2>{error.message}</h2>
            <pre>{error.stack}</pre>
        </>
    );
}