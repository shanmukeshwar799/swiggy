import { use } from "react";
import { useRouteError } from "react-router";


const Error = () => {
    const err = useRouteError();
    return (
        <div className="error">
        <h1>404</h1>
        <p>Page not found</p>
        <h2>{err.status} {err.Error}</h2>
        </div>
    );
}
export default Error;