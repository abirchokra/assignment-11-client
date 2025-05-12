import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Service from './Service';

const AllServices = () => {
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('https://assignment-eleven-server-green.vercel.app/allServices')
            .then((res) => res.json())
            .then((data) => {
                setServices(data);
                setFilteredServices(data);
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setFilteredServices(
            services.filter((service) =>
                service.serviceName.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, services]);

    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='p-6'>
                <h1 className='text-center text-6xl font-bold mb-6'>All Services</h1>

                <div className='mb-6 flex justify-center'>
                    <input
                        type='text'
                        placeholder='Search services...'
                        className='input input-bordered w-full max-w-md'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                {loading ? ( 
                    <div className='flex justify-center my-10'>
                        <span className="loading loading-bars loading-md"></span>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-5'>
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                                <Service key={service._id} service={service} />
                            ))
                        ) : (
                            <p className='text-center text-gray-500 col-span-full'>
                                No services found for "{searchText}"
                            </p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AllServices;
