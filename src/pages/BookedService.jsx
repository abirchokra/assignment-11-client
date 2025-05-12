import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const BookedService = () => {
    const [booked, setBooked] = useState([]);
    const { user } = useContext(AuthContext);  
    const navigate = useNavigate();
    

useEffect(()=>{},[])
    useEffect(() => {
        if (user && user.email) {
            fetch(`https://assignment-eleven-server-green.vercel.app/bookings?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setBooked(data));
            }
                
        },[user.email])
 


    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className="max-w-7xl md:mx-auto py-10 mx-4 ">
                <h2 className="text-2xl text-center font-bold mb-4">Your Booked Services</h2>
             
                {booked.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {booked.map((service, index) => (
                            <div key={index} className="card bg-base-100 shadow-xl">
                                <figure className="px-10 pt-10">
                                    <img
                                        src={service.serviceImage}
                                        alt={service.serviceName}
                                        className="rounded-xl h-[300px]"
                                    />
                                </figure>
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title">{service.serviceName}</h2>
                                    <p>{service.serviceDescription}</p>
                                    <div className="flex items-center justify-center gap-4">
                                        <img
                                            src={service.providerImage}
                                            alt={service.providerName}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <p>{service.providerName}</p>
                                    </div>
                                    <div className="card-actions flex items-center justify-between gap-8">
                                        <p><span className="font-semibold">Service Charge:</span> ${service.servicePrice}</p>
                                        <p><span className='font-semibold'>Status:</span> {service.serviceStatus}</p> 
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-red-700 text-xl font-semibold mt-6 mb-[300px]">You have not booked any services yet.</p>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default BookedService;
