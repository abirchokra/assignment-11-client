import React from 'react';
import { Link } from 'react-router-dom';

const Service = ({ service }) => {
    const {
        _id,
        serviceImage,
        serviceName,
        serviceDescription,
        viewDetailButton = "View Details",
        serviceProvider = {}, 
        servicePrice = "N/A",
    } = service;

    const { providerImage = "", providerName = "Unknown Provider" } = serviceProvider;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                {serviceImage ? (
                    <img
                        src={serviceImage}
                        alt="Service"
                        className="rounded-xl h-[300px]"
                    />
                ) : (
                    <p>No image available</p>
                )}
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{serviceName || "Service Name Unavailable"}</h2>
                <p>{serviceDescription}</p>
                <div className="flex items-center justify-start gap-4">
                    {providerImage ? (
                        <img
                            src={providerImage}
                            alt={providerName}
                            className="w-12 h-12 rounded-full"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                    <p>{providerName}</p>
                </div>

                <div className="card-actions flex items-center justify-between gap-8">
                    <p>
                        <span className="font-semibold">Service Charge:</span> ${servicePrice}
                    </p>
                    <Link to={`/services/${_id}`}>
                        <button className="btn btn-primary">{viewDetailButton}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Service;
