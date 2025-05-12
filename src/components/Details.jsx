import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import AuthContext from '../context/AuthContext';
import { getAuth } from 'firebase/auth';
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

const Details = () => {
    const user = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setCurrentUser({
                email: user.email,
                name: user.displayName || "Guest", 
            });
        }
    }, []);
    const {
        _id,
        serviceName,
        serviceImage,
        servicePrice,
        serviceLocation,
        providerEmail,
        serviceProvider: { providerName, providerImage },


        details: { includedServices, additionalBenefits },
    } = useLoaderData();



    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBookNow = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleBooking = (e) => {
        e.preventDefault();

        const bookingDetails = {
            serviceId: _id,
            serviceName,
            serviceImage,
            providerImage,

            providerEmail: providerEmail,
            providerName,
            currentUserEmail: user.email,
            currentUserName: user.displayName,
            servicePrice,
            serviceLocation,
            serviceTakingDate: e.target.serviceTakingDate.value,
            specialInstruction: e.target.specialInstruction.value,
            serviceStatus: "pending",
        };

        fetch('https://assignment-eleven-server-green.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire('Booked!', 'The service has been Purchased.', 'success');
                    setIsModalOpen(false);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
               
                <div className='ml-[30px] md:ml-0'>
                    <h2 className="text-2xl font-bold mb-4">Service Details</h2>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Included Services:</h3>
                        <ul className="list-disc pl-5 mb-4">
                            {includedServices.map((service, index) => (
                                <li key={index}>{service}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Additional Benefits:</h3>
                        <ul className="list-disc pl-5">
                            {additionalBenefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="font-semibold mt-3">Provider Information:</p>
                    <div className="cursor-pointer space-y-2 border border-gray-200 md:w-[300px] p-4 my-3 hover:bg-blue-300 rounded-md duration-100 shadow-xl">
                        <div className="flex gap-4 items-center">
                            <img src={providerImage} alt="" className="w-12 h-12 rounded-full" />
                            <p>{providerName}</p>
                        </div>
                        <p>
                            <span className="font-semibold">Location:</span> {serviceLocation}
                        </p>
                    </div>
                    <p>
                        <span className="font-semibold">Service Charge: </span>${servicePrice}
                    </p>
                </div>

                <motion.div
                    className="flex justify-center items-center"
                    animate={{
                        y: [0, -10, 0], 
                    }}
                    transition={{
                        duration: 1, 
                        repeat: Infinity, 
                        ease: "easeInOut", 
                    }}
                >
                    <img
                        src={serviceImage}
                        alt="Service"
                        className="rounded-lg shadow-lg w-[300px] md:w-full  max-w-md"
                    />
                </motion.div>
            </div>

            {/* Book Now Button */}
            <div className="flex justify-center py-5">
                <button className="btn btn-primary" onClick={handleBookNow}>
                    Book Now
                </button>
            </div>

            {/* Booking Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg max-w-5xl w-full ">
                        <h3 className="text-xl font-bold mb-4">Book Service</h3>
                        <form onSubmit={handleBooking} className="space-y-4">
                            <div >
                                <label className="block font-semibold">Service ID:</label>
                                <input
                                    type="text"
                                    value={_id}
                                    readOnly
                                    className="input input-bordered w-full"
                                />

                                <label className="block font-semibold">Service Name:</label>
                                <input
                                    type="text"
                                    value={serviceName}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Provider Email</label>
                                <input
                                    type="text"
                                    value={providerEmail}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">User Email:</label>
                                <input
                                    type="text"
                                    value={currentUser.email}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className='flex items-center gap-4'>
                                <label className="block font-semibold">Service Date:</label>
                                <input
                                    type="date"
                                    name="serviceTakingDate"
                                    required
                                    className="input input-bordered w-[50%]"
                                />
                                <label className="block font-semibold">Service Price: $</label>
                                <input
                                    type="text"
                                    value={servicePrice}
                                    readOnly
                                    className="input input-bordered w-[50%]"
                                />

                            </div>

                            <div>
                                <label className="block font-semibold">Special Instruction:</label>
                                <textarea
                                    name="specialInstruction"
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Enter instructions here"
                                ></textarea>
                            </div>
                            <button className="btn btn-primary w-full" type="submit">
                                Purchase
                            </button>
                            <button
                                className="btn btn-secondary w-full mt-2"
                                type="button"
                                onClick={handleModalClose}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Details;
