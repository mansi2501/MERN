import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { UpdateUserDetailSchema } from '../../schema';

function EditProfile() {

    const [userData, setUserData] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/user/${userId}`)
            .then(response => response.json())
            .then(json => {
                setUserData(json.user);
            });
    }, [])

    const userDetails = {
        userName: userData?.name || "",
        email: userData?.email || "",
        password: userData?.password || "",
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: userDetails,
        validationSchema: UpdateUserDetailSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`http://localhost:5000/user/${userId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: userId,
                        name: values.userName,
                        email: values.email,
                        password: values.password,
                    }),
                });
                const data = await response.json();
                console.log("data", data);

                if (response.ok) {
                    console.log("Profile updated successfully!!");
                    navigate("/profile")
                }
                else {
                    console.log("Update Failed!!");
                }
            } catch (error) {
                console.error("Error: ", error);
                alert("Update Failed!!!");
            }
        },
    });

    return (
        <>
            <Header />
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-xl-4">

                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body text-center">
                                    <div className="mt-3 mb-4">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                            className="rounded-circle img-fluid" style={{ width: '100px' }} />
                                    </div>
                                    <form onSubmit={formik.handleSubmit}>

                                        <div className="mb-3 text-start">
                                            <input
                                                type="text"
                                                name="userName"
                                                value={formik?.values?.userName}
                                                onChange={formik.handleChange}
                                                placeholder="Enter User Name"
                                                className="form-control"
                                            />
                                            {formik.errors.userName && <div className="text-danger">{formik.errors.userName}</div>}
                                        </div>

                                        <div className="mb-3 text-start">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                placeholder="Enter Email"
                                                className="form-control"
                                                readOnly
                                            />
                                            {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                                        </div>

                                        <div className="mb-3 text-start position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                placeholder="Enter Password"
                                                className="form-control"
                                                style={{ paddingRight: "40px" }}
                                            />
                                            <i
                                                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: "10px",
                                                    transform: "translateY(-50%)",
                                                    cursor: "pointer",
                                                    fontSize: "1.1rem",
                                                    color: "#555",
                                                }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            ></i>
                                            {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                                        </div>

                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-rounded btn-lg">
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default EditProfile;