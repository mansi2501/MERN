import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;

}

export default PrivateRoute;
