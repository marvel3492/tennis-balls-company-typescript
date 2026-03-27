import { hasError } from "../Utils";
import ErrorPage from "../views/ErrorPage";

export default function AllRecordsPage<T>({path, response, isTypeArray, Component}: {
    path: string,
    response: unknown,
    isTypeArray: (result: unknown) => result is T[],
    Component: React.ComponentType<{ allrecs: T[] }>
}) {
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isTypeArray(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        if (response.length === 0) {
            return (
                <>
                    <p>No Records Available</p>
                    <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
                </>
            );
        } else {
            return <Component allrecs={response} />;
        }
    }
}