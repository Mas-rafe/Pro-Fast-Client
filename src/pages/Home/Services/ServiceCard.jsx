// src/components/ServiceCard.jsx

import React from 'react';

const ServiceCard = ({ service }) => {
     const {title,description,icon} = service
  return (
    <div
      className="card p-6 shadow-md transition duration-300 hover:bg-[#CAEB66] bg-[#FFFFFF] text-white text-center"
    >
      <div className="flex justify-center mb-4 text-[#03373D] ">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#03373D]">{title}</h3>
      <p className="text-sm text-[#606060]">{description}</p>
    </div>
  );
};

export default ServiceCard;
