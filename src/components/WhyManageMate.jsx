import React from "react";
import { FaProjectDiagram, FaUsers, FaTools } from "react-icons/fa";

const WhyManageMate = () => {
  return (
    <div className="max-w-7xl mx-auto my-16 px-6">
   
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
          <span className="before:block before:absolute before:-inset-1 before:bg-[rgb(63,0,231)] before:h-1 before:bottom-0 before:rounded-full">
          </span>
          Why ManageMate
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          At ManageMate, we specialize in simplifying complex project management. From ideation to execution, our expertise ensures seamless handling of every detail, enabling you to focus on what truly matters. We foster collaboration, deliver results with precision, and provide tailored solutions for diverse needs. Let us transform your challenges into achievements.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 relative inline-block">
          <span className="before:block before:absolute before:-inset-1 before:bg-[rgb(63,0,231)] before:h-1 before:bottom-0 before:rounded-full">
          </span>
          In Our 8 Years Journey We Have
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
   
          <div className="bg-gray-100 rounded-lg shadow-sm py-8 px-4 flex flex-col items-center">
            <FaProjectDiagram size={40} className="text-[rgb(63,0,231)] mb-4" />
            <h3 className="text-4xl font-bold text-gray-800">3000+</h3>
            <p className="text-gray-600">Projects Completed</p>
          </div>


          <div className="bg-gray-100 rounded-lg shadow-sm py-8 px-4 flex flex-col items-center">
            <FaUsers size={40} className="text-[rgb(63,0,231)] mb-4" />
            <h3 className="text-4xl font-bold text-gray-800">400+</h3>
            <p className="text-gray-600">Happy Clients</p>
          </div>

          <div className="bg-gray-100 rounded-lg shadow-sm py-8 px-4 flex flex-col items-center">
            <FaTools size={40} className="text-[rgb(63,0,231)] mb-4" />
            <h3 className="text-4xl font-bold text-gray-800">100+</h3>
            <p className="text-gray-600">Managed Resources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyManageMate;
