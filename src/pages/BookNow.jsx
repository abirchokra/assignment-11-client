import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import Swal from 'sweetalert2';

const BookNow = () => {
    const { state } = useLocation(); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingDetails = {
            serviceId: state.serviceId,
            serviceName: state.serviceName,
            serviceImage: state.serviceImage,
            providerEmail: state.providerEmail,
            providerName: state.providerName,
            currentUserEmail: state.currentUserEmail,
            currentUserName: state.currentUserName,
            servicePrice: state.servicePrice,
            serviceLocation: state.serviceLocation,
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
                     Swal.fire('Updated!', 'The service has been updated.', 'success');
                    navigate('/');
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <div className="md:max-w-2xl mx-auto p-5">
                <h2 className="text-2xl font-bold mb-4">Book Service</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold">Service ID:</label>
                        <input
                            type="text"
                            value={state.serviceId}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Service Name:</label>
                        <input
                            type="text"
                            value={state.serviceName}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Provider Email:</label>
                        <input
                            type="text"
                            value={state.providerEmail}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">User Email:</label>
                        <input
                            type="text"
                            value={state.currentUserEmail}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Service Date:</label>
                        <input
                            type="date"
                            name="serviceTakingDate"
                            required
                            className="input input-bordered w-full"
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
                    <div>
                        <label className="block font-semibold">Price:</label>
                        <input
                            type="text"
                            value={`$${state.servicePrice}`}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button className="btn btn-primary w-full">Purchase</button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default BookNow;
