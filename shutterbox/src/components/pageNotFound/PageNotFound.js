import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-5 text-center" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="mb-4">
                    <img
                        src="/assets/logo.png"
                        alt="ShutterBox Logo"
                        className="img-fluid"
                        style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    />
                </div>

                <h1 className="display-3 fw-bold text-primary mb-3">404</h1>
                <h4 className="fw-semibold mb-3 text-dark">Page Not Found</h4>
                <p className="text-muted mb-4">
                    The page you’re looking for doesn’t exist or may have been moved.
                </p>

                <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate("/dashboard")}
                >
                    Go Back to Dashboard
                </button>

                <div className="mt-3">
                    <a
                        href="/"
                        className="text-decoration-none text-primary fw-semibold"
                        style={{ fontSize: "0.95rem" }}
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
