// src/components/BenefitCard.jsx

import React from "react";

const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="card card-side bg-base-200 shadow-md flex flex-col sm:flex-row items-center">
      {/* Left image */}
      <figure className="p-4">
        <img src={image} alt={title} className="w-24 h-24 object-contain" />
      </figure>

      {/* Vertical line for large screens */}
      <div className="hidden sm:block w-px h-24 bg-primary mx-2"></div>

      {/* Right content */}
      <div className="card-body text-center sm:text-left">
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
