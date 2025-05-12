import React from "react";
import { FaRegHandshake, FaUserTie, FaUsers, FaFileInvoiceDollar, FaCheckCircle, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
const Timeline = () => {
    const steps = [
        { title: "Say Hello", description: "Get Connected", icon: <FaRegHandshake size={28} /> },
        { title: "Get Free Consultancy", description: "Expert Meet", icon: <FaUserTie size={28} /> },
        { title: "Greet in Person", description: "Conduct Site Visit By Expert", icon: <FaUsers size={28} /> },
        { title: "Get The Estimation", description: "Price Quote", icon: <FaFileInvoiceDollar size={28} /> },
        { title: "Onboarding Meet", description: "Confirmation of Order", icon: <FaCheckCircle size={28} /> },
        { title: "Construct The Dream", description: "Project Execution", icon: <FaHome size={28} /> },
    ];

    return (
        <div className="max-w-5xl mx-auto my-12">
            <motion.h2
                className='text-center text-2xl md:text-5xl font-bold my-8'
                initial={{ opacity: 0, x: -200 }}  
                animate={{ opacity: 1, x: 0 }}    
                transition={{ duration: 1.5, ease: 'easeOut' }} 
            >
                7 Easy Steps For Everything You Need
            </motion.h2>

            <div className="relative flex flex-col items-center space-y-10">
            
                <div className="absolute w-1 h-full bg-green-500 left-1/2 transform -translate-x-1/2"></div>

                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="flex items-center w-full max-w-3xl"
                    >
                
                        <div className="w-1/2 text-right pr-8">
                            <h3 className="text-xl font-semibold text-gray-700">{step.title}</h3>
                            <p className="text-sm text-gray-500">{step.description}</p>
                        </div>

                     
                        <div className="w-10 flex justify-center relative">
                            <div
                                className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white transform transition-all duration-300 hover:bg-green-700 hover:scale-110"
                                title={`Step ${index + 1}`}
                            >
                                {index + 1}
                            </div>
                        </div>

              
                        <div className="w-1/2 text-left pl-8">
                            <div className="text-green-500">{step.icon}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
