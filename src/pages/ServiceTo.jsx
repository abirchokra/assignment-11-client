import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Swal from 'sweetalert2';

const ServiceTo = () => {
    const [bookedServices, setBookedServices] = useState([]);


    useEffect(() => {
        fetch('https://assignment-eleven-server-green.vercel.app/bookings') 
            .then((res) => res.json())
            .then((data) => setBookedServices(data));
    }, []);

 
    const handleStatusChange = (id, newStatus) => {
        fetch(`https://assignment-eleven-server-green.vercel.app/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ serviceStatus: newStatus }),
        })
            .then((res) => res.json())
            .then((updatedService) => {
                if (updatedService.modifiedCount > 0) {
                    setBookedServices((prevServices) =>
                        prevServices.map((service) =>
                            service._id === id ? { ...service, serviceStatus: newStatus } : service
                        )
                    );
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Status Has been Updated.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <h2 className="text-center text-2xl font-bold my-6">Booking Information</h2>
            <div className="overflow-x-auto mb-[300px] mx-5 md:mx-0">
                <table className="table table-zebra w-full">
                   
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Provider Email</th>
                            <th>Service Name</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                      
                        {bookedServices.length > 0 ? (
                            bookedServices.map((service, index) => (
                                <tr key={service._id}>
                                    <th>{index + 1}</th>
                                    <td>{service.providerEmail}</td>
                                    <td>{service.serviceName}</td>
                                    <td>{service.serviceStatus}</td>
                                    <td>
                                        <select
                                            value={service.serviceStatus}
                                            onChange={(e) => handleStatusChange(service._id, e.target.value)}
                                            className="select select-bordered"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Working">Working</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No booked services found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
};

export default ServiceTo;
