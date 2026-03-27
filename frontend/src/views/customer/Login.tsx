import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLogin } from "../../../../shared/data/LoginData";
import { fetchDataWithCatch, hasError } from "../../Utils";
import ErrorPage from "../ErrorPage";

export default function Login() {
    const [response, setResponse] = useState<unknown>({success: false, message: "Please Login"});
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        fetchDataWithCatch("http://localhost:5000/customer/login", (data) => {
            if (hasError(data)) {
                setResponse(data);
            } else if (!isLogin(data)) {
                setResponse(new Error("Unexpected data type"));
            } else if (data.success) {
                navigate(0);
            } else {
                setResponse(data);
            }
        }, setResponse, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
            credentials: "include"
        });
    };

    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isLogin(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <p>{response.message}</p>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="username">Username: </label>
                            <input type="text" id="username" name="username" maxLength={20} value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </p>
                        <p>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password" maxLength={30} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </p>
                        <p>
                            <input type="submit" value="Submit" />
                        </p>
                    </form>
                </div>
            </>
        );
    }
}