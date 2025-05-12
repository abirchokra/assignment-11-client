import Swal from "sweetalert2";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";


import useAuth from "../hooks/useAuth";

const AddServices = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);


        const newService = {
            serviceImage: formData.get("serviceImage"),
            serviceName: formData.get("serviceName"),
            servicePrice: formData.get("servicePrice"),

            serviceDescription: formData.get("serviceDescription"),

            serviceProvider: {
                providerImage: user?.photoURL,
                providerName: user?.displayName,

            },
            details: {
                includedServices: formData
                    .get("includedServices")
                    .split(",")
                    .map((item) => item.trim()),
                additionalBenefits: formData
                    .get("additionalBenefits")
                    .split(",")
                    .map((item) => item.trim()),
            },
            providerEmail: user?.email,
        };

        console.log(newService);


        fetch("https://assignment-eleven-server-green.vercel.app/services", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newService),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    console.log(data);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Service has been added.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    e.target.reset();
                    navigate('/allServices')
                }
            })
            .catch((error) => {
                console.error("Error adding service:", error);
            });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <Navbar />
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
                <h2 className="text-2xl font-bold text-center mb-6">Add New Service</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="serviceImage">
                            Image URL of the Service
                        </label>
                        <input
                            type="text"
                            id="serviceImage"
                            name="serviceImage"
                            placeholder="Enter the service image URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="serviceName">
                            Service Name
                        </label>
                        <input
                            type="text"
                            id="serviceName"
                            name="serviceName"
                            placeholder="Enter the service name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="serviceDescription">
                            Description
                        </label>
                        <textarea
                            id="serviceDescription"
                            name="serviceDescription"
                            placeholder="Enter the service description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="servicePrice"
                            name="servicePrice"
                            placeholder="Enter the price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="includedServices">
                            Included Services (comma-separated)
                        </label>
                        <textarea
                            id="includedServices"
                            name="includedServices"
                            placeholder="e.g., Venue Selection, Catering"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="additionalBenefits"
                        >
                            Additional Benefits (comma-separated)
                        </label>
                        <textarea
                            id="additionalBenefits"
                            name="additionalBenefits"
                            placeholder="e.g., Event Manager, Custom Themes"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                 
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Add Service
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddServices;
