import React from "react";
import icon from '../../../assets/reviewQuote.png'
const ReviewCard = ({  description, name, designation,  }) => {
  return (
    <div className=" bg-base-200 rounded-xl shadow-md p-6 flex flex-col justify-between">
      <div>
        {/* Review icon top left */}
        <img src={icon} alt="review icon" className="w-6 h-6 mb-4" />
        {/* Review text */}
        <p className="text-gray-600 text-sm mb-6">{description}</p>
        {/* Dot divider */}
        <div className="border-dotted border-t border-gray-300 w-full"></div>
      </div>

      {/* Reviewer info */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <img
            src=""
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="text-sm font-bold text-[#03373D]">{name}</h4>
            <p className="text-xs text-gray-500">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
