import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import useAuth from "../hooks/useAuth";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageServices = () => {
    const { user } = useAuth(); 
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const service = useLoaderData()




    useEffect(() => {
        setLoading(true)


        fetch(`https://assignment-eleven-server-green.vercel.app/services?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(user.email)
                console.log("Fetched services:", data);
                setServices(data);
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
            });

    }, [user]);
    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `https://assignment-eleven-server-green.vercel.app/services/${id}`,
                {
                    method: 'DELETE',
                }
            );
            if (response.ok) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                    navigate('/allServices');
                });

            } else {
                const error = await response.json();
                Swal.fire('Error!', error.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error!', 'Failed to delete the service.', 'error');
        }
    };
 


    if (services.length === 0) {
        return (
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <h2 className="text-2xl md:text-4xl font-bold text-center  my-[200px] text-red-600">No Services Available</h2>
                <Footer />
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <h2 className="text-2xl font-bold text-center mb-6">Manage Your Services: {services.length}</h2>
            <div className="grid grid-cols-1 gap-6 my-6 mx-4 md:mx-0">
                {services.map((service, index) => {
                    const {
                        _id,
                        serviceImage,
                        serviceName,
                        serviceDescription,
                        servicePrice,
                        serviceProvider,
                    } = service;

                    const { providerImage, providerName } = serviceProvider || {}; 

                    return (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row  bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            
                            <div className="w-full md:w-1/3">
                                <img
                                    src={serviceImage}
                                    alt={serviceName}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                  
                            <div className="p-6 flex-1 ">
                                <h3 className="text-2xl font-semibold text-gray-800">{serviceName}</h3>
                                <p className="text-gray-600 my-3">
                                    {serviceDescription || "No description available."}
                                </p>
                                <p className="text-lg font-semibold text-blue-600 mb-4">
                                    Service Price: ${servicePrice || "N/A"}
                                </p>

                 
                                <div className="flex items-center gap-4 mt-4">
                                    {providerImage ? (
                                        <img
                                            src={providerImage}
                                            alt={providerName}
                                            className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-800">{providerName || "Unknown Provider"}</p>
                                        <p className="text-sm text-gray-500">Service Provider</p>
                                    </div>
                                </div>
                            </div>
                      
                            <div className="p-4 flex justify-end items-end gap-3">
                                <Link to={`/update/${_id}`}> <button className="btn btn-primary px-4 py-2 font-semibold">
                                    update
                                </button></Link>
                                <button onClick={() => handleDelete(_id)} className="btn btn-primary px-4 py-2 font-semibold">
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Footer />
        </div>
    );
};

export default ManageServices;