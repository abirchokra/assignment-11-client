import React, { useContext } from 'react';

import AuthContext from '../context/AuthContext';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SocialLogin from '../shared/SocialLogin';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registration = () => {
    const { createUser, user } = useContext(AuthContext);

    const handleRegister = (event) => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const photo = form.photo.value;
        const password = form.password.value;

        console.log({ email, password, name, photo });

        createUser(email, password)
            .then((res) => {
                const createdUser = res.user;
                console.log(res)

       
                return updateProfile(createdUser, {
                    displayName: name,
                    photoURL: photo,
                });
            })
            .then(() => {
                console.log('User profile updated successfully');
                if (user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Service has been added.",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                }
            })
            .catch((error) => {
                console.error('Error during registration:', error);
            });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <div className="hero bg-base-200 md:p-8 my-4">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left"></div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleRegister} className="card-body">
                            <h1 className="text-5xl font-bold">Register now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="url"
                                    name="photo"
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            <div className="divider">OR</div>
                            <SocialLogin />
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Registration;
