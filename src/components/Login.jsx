
import React, { useContext, useState } from 'react';


import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import SocialLogin from '../shared/SocialLogin';

import AuthContext from '../context/AuthContext';



const Login = () => {
    const { signInUser } = useContext(AuthContext)


    const location = useLocation()
    const [error, setError] = useState({})
    const navigate = useNavigate();
    const from = location.state || ('/')
    console.log(location)
    const handleSignin = (event) => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password })
        signInUser(email, password)
            .then(result => {
                console.log(result.user.email)
             
             
                navigate(location?.state ? location.state : '/')
            })
            .catch(err => {
                setError({ ...error, login: err.code });

            })





    }
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className="hero bg-base-200 md:p-8 my-4">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                        <form onSubmit={handleSignin} className="card-body">
                            <h1 className="text-5xl font-bold">Login now!</h1>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                {
                                    error.login && (
                                        <label className="label text-sm text-red-600">
                                            {error.login}


                                        </label>

                                    )
                                }

                            </div>
                            <Link to={'/registration'}><button className='underline text-blue-600'>Register</button></Link>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">LogIn</button>
                            </div>
                            <div className="divider">OR</div>
                            <SocialLogin></SocialLogin>



                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Login;