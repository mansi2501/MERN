import React, { useEffect, useState } from 'react';
import Header from '../header/Header';

function Profile() {

    const [userData, setUserData] = useState([])
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        fetch(`http://localhost:5000/user/${userId}`)
            .then(response => response.json())
            .then(json => {
                setUserData(json.user);
            });
    }, [])

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
                                    <h4 className="mb-2">{userData?.name?.charAt(0).toUpperCase() + userData?.name
                                        ?.slice(1).toLowerCase()}</h4>
                                    <p className="text-muted mb-4">@User<span className="mx-2">|</span> <a
                                        href="#!">{userData?.email}</a></p>

                                    <a type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-rounded btn-lg" href='/edit-profile'>
                                        Edit Profile
                                    </a>
                                    <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                        <div>
                                            <p className="mb-2 h5">1</p>
                                            <p className="text-muted mb-0">Like</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-2 h5">1</p>
                                            <p className="text-muted mb-0">Total Post</p>
                                        </div>
                                        <div>
                                            <p className="mb-2 h5">1</p>
                                            <p className="text-muted mb-0">Dislike</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Profile;