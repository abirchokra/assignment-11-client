import React, { useContext } from 'react';
import logo from '../assets/cleaning-service-concept-illustration_114360-12701.avif';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('Sign out successful');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="navbar bg-base-100 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow-lg fixed"
                    >

                        <li >
                            <Link to={'/'}>Home</Link>
                        </li>

                        <li>
                            <Link to={'/allServices'}>Services</Link>
                        </li>
                        <li>
                            <details>
                                <summary>Dashboard</summary>
                                <ul className="p-2">
                                    <li>
                                        <Link to={'/addServices'}>Add Service</Link>
                                    </li>
                                    <li>
                                        <Link to={'/manageService'}>Manage Service</Link>
                                    </li>
                                    <li>
                                        <Link to={'/bookedService'}>Booked-Services</Link>
                                    </li>
                                    <li>
                                        <Link to={'/serviceTo'}>Service-To-Do</Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <img src={logo} alt="" className="w-12 h-12 rounded-full border-2 border-green-200" />
                <Link to={'/'}>
                    <button className="btn btn-ghost md:text-xl">ManageMate</button>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-8">
                    <Link to={'/'}>
                        <li>
                            <a className='hover:text-blue-600 hover:underline font-semibold'>Home</a>
                        </li>
                    </Link>
                    <Link to={'/allServices'}>
                        <li>
                            <a className='hover:text-blue-600 hover:underline font-semibold'>Services</a>
                        </li>
                    </Link>
                    <li>
                        <details className="w-[160px]">
                            <summary className='hover:text-blue-600 hover:underline font-semibold'>Dashboard</summary>
                            <ul className="p-2 menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 shadow-lg fixed">

                                <Link to={'/addServices'}>
                                    <li>
                                        <a className='hover:text-blue-600 hover:underline font-semibold'>Add Service</a>
                                    </li>
                                </Link>
                                <Link to={'/manageService'}>
                                    <li>
                                        <a className='hover:text-blue-600 hover:underline font-semibold'>Manage Service</a>
                                    </li>
                                </Link>
                                <Link to={'/bookedService'}>
                                    <li>
                                        <a className='hover:text-blue-600 hover:underline font-semibold'>Booked-Services</a>
                                    </li>
                                </Link>
                                <Link to={'/serviceTo'}>   <li>
                                    <a className='hover:text-blue-600 hover:underline font-semibold'>Service-To-Do</a>
                                </li></Link>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
               
                {user ? (
                    <div className="flex gap-3 items-center">
                        <p className='font-semibold text-red-800'>{user.displayName}</p>
                        {user.photoURL && (
                            <img
                                className="w-6 h-6 md:w-12 md:h-12 rounded-full"
                                src={user.photoURL}
                                alt={`${user.displayName}'s avatar`}
                            />
                        )}
                        <Link to={'/'}>
                            <button onClick={handleSignOut} className="btn">
                                Signout
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to={'/registration'}>
                            <button className="btn md:btn-primary">Register</button>
                        </Link>
                        <Link to={'/login'}>
                            <button className="btn ml-2">LogIn</button>
                        </Link>
                    </>
                )}
            </div>
          
        </div>
    );
};

export default Navbar;
