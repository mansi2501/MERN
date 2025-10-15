// import React, { useRef } from 'react';
import { useFormik } from "formik";
import Header from '../header/Header';
import { AddPostSchema } from '../../schema';
import { useNavigate } from "react-router-dom";

function AddPost() {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId")

    const postData = {
        image: "",
        title: "",
        description: "",
    };

    const formik = useFormik({
        initialValues: postData,
        validationSchema: AddPostSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append("image", values.image[0]);
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("userId", userId);

                const response = await fetch("http://localhost:5000/post/add", {
                    method: "POST",
                    //headers: { "Content-Type": "multipart/form-data" },
                    body: formData,
                });
                const data = await response.json();

                if (response.status === 200) {
                    navigate("/dashboard");
                }
                else {
                    resetForm({ values: postData });
                    navigate("/");
                }

                alert(JSON.stringify(values, null, 2));
            } catch (error) {
                console.log("Error:", error);
                alert("Post not added");
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
                                    <h4 className="mb-2">Add Post</h4>

                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-3 text-start">
                                            <label for="formFileSm" className="form-label text-primary">Upload photo</label>
                                            <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={(event) => {
                                                formik.setFieldValue("image", event.currentTarget.files);
                                            }} />
                                            <small className='fw-lighter'>.jpg, .jpeg and .png images accepted (max 2MB)</small>
                                            {formik.errors.image && <div className="text-danger">{formik.errors.image}</div>}
                                        </div>

                                        <div className="mb-3 text-start">
                                            <label className="form-label text-primary">Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                                placeholder="Enter Title"
                                                className="form-control"
                                            />
                                            {formik.errors.title && <div className="text-danger">{formik.errors.title}</div>}
                                        </div>

                                        <div className="mb-3 text-start position-relative">
                                            <label className="form-label text-primary">Description</label>
                                            <textarea
                                                type="text"
                                                name="description"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                placeholder="Enter Description"
                                                className="form-control"
                                            />

                                            {formik.errors.description && <div className="text-danger">{formik.errors.description}</div>}
                                        </div>

                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-rounded btn-sm">
                                            Add Post
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

export default AddPost;