function VerifyEmail() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                {/* Logo */}
                <div className="text-center mb-4">
                    <img
                        src="/assets/logo.png"
                        alt="ShutterBox Logo"
                        className="img-fluid"
                        style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    />
                </div>
                {/* Title */}
                <h6>Check Your Email</h6>
                <small className="text-start mb-4">Please check your inbox ad follow the link to securely reset your password</small>

                <p className="text-center mt-3">
                    <a href="/" className="text-primary">Back To Login</a>
                </p>
            </div>
        </div >
    );
}

export default VerifyEmail;
