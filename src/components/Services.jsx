import React, { useEffect, useState } from 'react';
import Service from './Service';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
const Services = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        fetch('https://assignment-eleven-server-green.vercel.app/homeServices')
            .then(res => res.json())
            .then(data => {
                const sortedServices = data
                    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
                    .slice(0, 6);
                setServices(sortedServices);
            })
            .catch(err => console.error('Error fetching featured services:', err));
    }, []);
    return (
        <div className='my-6'>
            <motion.h2
                className='text-center text-5xl font-bold my-8'
                initial={{ opacity: 0, x: -200 }}  
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1.5, ease: 'easeOut' }} 
            >
                Popular Services
            </motion.h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4  mx-4 md:mx-0'>
                {
                    services.map(service => <Service key={service._id} service={service}></Service>)
                }

            </div>
            <div className='flex justify-center my-5'>
                <Link to={'/allServices'}><button className='btn btn-lg bg-blue-800 text-white'>Show All</button></Link>
            </div>
        </div>
    );
};

export default Services;