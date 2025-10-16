
import { useState } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../schema";
import { useNavigate } from "react-router-dom";


function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    // const userData = {
    //     email: "",
    //     password: "",
    // };

    // const formik = useFormik({
    //     initialValues: userData,
    //     validationSchema: LoginSchema,
    //     onSubmit: async (values, { resetForm }) => {
    //         try {
    //             const response = await fetch("http://localhost:5000/auth/login", {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({
    //                     email: values.email,
    //                     password: values.password,
    //                 }),
    //             });
    //             // alert(JSON.stringify(values, null, 2));
    //             const data = await response.json();
    //             sessionStorage.setItem("username", data?.user?.name)
    //             sessionStorage.setItem("userId", data?.user?.id)

    //             if (response.status === 200) {
    //                 navigate("/dashboard");
    //             }
    //             else {
    //                 resetForm({ values: userData });
    //                 navigate("/");
    //             }
    //         } catch (error) {
    //             console.error("Error: ", error);
    //             alert("Login Failed!!!");
    //         }
    //     },
    // });


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>

                {/* Logo */}
                <div className="text-center mb-4">
                    <img
                        src="/assets/logo.png" // make sure logo is in public/assets/
                        alt="ShutterBox Logo"
                        className="img-fluid"
                        style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    />
                </div>

                {/* Title */}
                <h6 className="text-start">Create New Password</h6>
                <small className="text-start mb-4">Set a strong password to keep your account secure.</small>

                {/* Form */}
                <form>
                    {/* onSubmit={formik.handleSubmit}> */}

                    <div className="mb-3 text-start position-relative">
                        <label className="form-label text-primary">New Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            // value={formik.values.password}
                            // onChange={formik.handleChange}
                            placeholder="Enter your password"
                            className="form-control"
                        />
                        <i
                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                            style={{ top: "38px", right: "10px", cursor: "pointer", fontSize: "1.1rem" }}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                        {/* {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>} */}
                    </div>

                    <div className="mb-3 text-start position-relative">
                        <label className="form-label text-primary">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            // value={formik.values.confirmPassword}
                            // onChange={formik.handleChange}
                            placeholder="Re-enter Password"
                            className="form-control"
                        />
                        <i
                            className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                            style={{ top: "38px", right: "10px", cursor: "pointer", fontSize: "1.1rem" }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        ></i>
                        {/* {formik.errors.confirmPassword && (
                            <div className="text-danger">{formik.errors.confirmPassword}</div>
                        )} */}
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
