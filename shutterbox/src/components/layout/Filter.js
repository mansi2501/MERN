import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { filterSchema } from "../../schema";

function Filter({ setFilterURL }) {

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const filterData = { title: "" };

    const formik = useFormik({
        initialValues: filterData,
        validationSchema: filterSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setFilterURL(`http://localhost:5000/post?title=${encodeURIComponent(values.title)}`);
                resetForm({ values: filterData });
                setShowModal(false);
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-primary btn-rounded btn-sm ms-4"
                onClick={() => setShowModal(true)}
            >
                <i className="bi bi-funnel"></i> Filter
            </button>

            {showModal &&
                (<div
                    className="modal d-block"
                    tabIndex="-1"
                    ref={modalRef}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Filter
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => { formik.resetForm(); setShowModal(false) }}
                                ></button>
                            </div>

                            <form onSubmit={formik.handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3 text-start">
                                        <label className="form-label text-primary">By Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                            placeholder="Enter Title"
                                        />
                                        {formik.errors.title && (
                                            <div className="text-danger mt-1">
                                                {formik.errors.title}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                        onClick={() => { formik.resetForm(); setShowModal(false); }}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Filter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>)}
        </>
    );
}

export default Filter;
