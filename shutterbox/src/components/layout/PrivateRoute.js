import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {

    //    const token = sessionStorage.getItem("token");
    // return token ? <Outlet /> : <Navigate to="/" replace />;
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        setIsAuthenticated(!!userId);
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;

}

export default PrivateRoute;
