import { useState } from "react";
import { useFormik } from "formik";
import { LoginSchema } from "../../schema";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
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
                <h6 className="text-start">Forgot Password?</h6>
                <small className="text-start mb-4">If you've forgotten your password, please enter your email to reset it.</small>

                {/* Form */}
                <form>
                    {/* onSubmit={formik.handleSubmit}> */}
                    <div className="mb-3 text-start">
                        <label className="form-label text-primary">Enter Your Registered Email</label>
                        <input
                            type="email"
                            name="email"
                            // value={formik.values.email}
                            // onChange={formik.handleChange}
                            placeholder="Enter email"
                            className="form-control"
                        />
                        {/* {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>} */}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Request Reset Link
                    </button>
                </form>

                <p className="text-center mt-3">
                    <a href="/" className="text-primary">Back To Login</a>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
