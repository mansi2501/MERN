import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { RegistrationSchema } from "../../schema";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const userData = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const formik = useFormik({
        initialValues: userData,
        validationSchema: RegistrationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch("http://localhost:5000/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userName: values.userName,
                        email: values.email,
                        password: values.password,
                    }),
                });
                const data = await response.json();
                // console.log("response Data", data);
                // alert(JSON.stringify(values, null, 2));
                resetForm({ values: userData });
                navigate("/")
            } catch (error) {
                console.error("Error: ", error);
                alert("Registration Failed!!!");
            }
        },
    });

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
                <h3 className="text-center mb-4">ShutterBox Registration</h3>

                {/* Form */}
                <form onSubmit={formik.handleSubmit}>
                    {/* User Name */}
                    <div className="mb-3 text-start">
                        <label className="form-label text-primary">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            placeholder="Enter User Name"
                            className="form-control"
                        />
                        {formik.errors.userName && <div className="text-danger">{formik.errors.userName}</div>}
                    </div>


                    {/* Email */}
                    <div className="mb-3 text-start">
                        <label className="form-label text-primary">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Enter Email"
                            className="form-control"
                        />
                        {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3 text-start position-relative">
                        <label className="form-label text-primary">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Enter Password"
                            className="form-control"
                        />
                        <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                            style={{ top: "38px", right: "10px", cursor: "pointer", fontSize: "1.1rem" }}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                        {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
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
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <a href="/" className="text-primary">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
