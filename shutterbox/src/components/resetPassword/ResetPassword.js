
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../../schema";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../logo.png";

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const userPasswordData = {
        password: "",
        confirmPassword: "",
    };

    useEffect(() => {

        setTimeout(() => {
            const token = new URLSearchParams(window.location.search).get("token");

            if (!token) {
                navigate("/forgot-password");
                return;
            }

            fetch(`http://localhost:5000/auth/verify-token?token=${token}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.valid) {
                        setIsValid(true);
                        setLoading(false);
                    } else {
                        alert(data.message);
                        navigate("/forgot-password");
                    }
                })
                .catch(() => {
                    navigate("/forgot-password");
                });
        }, 4000);
    }, []);


    const formik = useFormik({
        initialValues: userPasswordData,
        validationSchema: ResetPasswordSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch("http://localhost:5000/auth/update-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token,
                        password: values.password
                    }),
                });

                const data = await response.json();
                if (response.status === 200) {
                    navigate("/")
                }
                else {
                    resetForm({ values: userPasswordData })
                }

            } catch (error) {
                console.log("Error:", error);
            }
        },
    });


    return loading ? (<div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-primary">
            <img
                src={logo}
                alt="Verifying"
                style={{ width: "150px", height: "150px", marginBottom: "20px" }}
            />
        </div>
        <div>
            <h5 className="text-secondary">Verifying your link</h5>
            <p className="text-secondary">Please wait a few seconds while we validate your reset token.</p>
        </div>
    </div>) : (
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
                <h6 className="text-start">Create New Password</h6>
                <small className="text-start mb-4">Set a strong password to keep your account secure.</small>

                {/* Form */}
                <form onSubmit={formik.handleSubmit}>

                    <div className="mb-3 text-start position-relative">
                        <label className="form-label text-primary">New Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Enter your password"
                            className="form-control"
                        />
                        <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                            style={{ top: "38px", right: "10px", cursor: "pointer", fontSize: "1.1rem" }}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                        {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                    </div>

                    <div className="mb-3 text-start position-relative">
                        <label className="form-label text-primary">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            placeholder="Re-enter Password"
                            className="form-control"
                        />
                        <i
                            className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                            style={{ top: "38px", right: "10px", cursor: "pointer", fontSize: "1.1rem" }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        ></i>
                        {formik.errors.confirmPassword && (
                            <div className="text-danger">{formik.errors.confirmPassword}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
