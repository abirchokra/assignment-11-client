import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const Update = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [service, setService] = useState({
        serviceName: '',
        serviceDescription: '',
        servicePrice: '',
        serviceImage: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://assignment-eleven-server-green.vercel.app/services/${id}`)
            .then(res => res.json())
            .then(data => {
                setService(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching service:", error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const data = {
            ...service,
            [name]: value,
        } 
        delete data._id
        setService({
            ...data
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://assignment-eleven-server-green.vercel.app/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            if (response.ok) {
                Swal.fire('Updated!', 'The service has been updated.', 'success');
                navigate('/manageService'); 
            } else {
                const error = await response.json();
                Swal.fire('Error!', error.message, 'error');
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error!', 'Failed to update the service.', 'error');
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <h2 className="text-2xl font-bold text-center mb-6">Update Service</h2>
            <form onSubmit={handleSubmit} className="space-y-6 my-5 mx-4 md:mx-0">
                <div>
                    <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">Service Name</label>
                    <input
                        type="text"
                        id="serviceName"
                        name="serviceName"
                        value={service.serviceName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700">Service Description</label>
                    <textarea
                        id="serviceDescription"
                        name="serviceDescription"
                        value={service.serviceDescription}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="servicePrice" className="block text-sm font-medium text-gray-700">Service Price</label>
                    <input
                        type="number"
                        id="servicePrice"
                        name="servicePrice"
                        value={service.servicePrice}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="serviceImage" className="block text-sm font-medium text-gray-700">Service Image URL</label>
                    <input
                        type="text"
                        id="serviceImage"
                        name="serviceImage"
                        value={service.serviceImage}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button type="submit" className="btn btn-primary px-4 py-2 font-semibold">Update</button>
                </div>
            </form>
            <Footer></Footer>
        </div>
    );
};

export default Update;
