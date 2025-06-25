import React from 'react';
import location from '../../../assets/location-merchant.png'

const BeMerchant = () => {
    return (
        <div data-aos="zoom-in-up" className="bg-no-repeat bg-[url(assets/be-a-merchant-bg.png)] p-20 rounded-4xl bg-[#03373D]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold text-[#FFFFFF]">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-[#DADADA]">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button className="btn rounded-full mr-4 bg-[#CAEB66] ">Become A Merchant</button>
                    <button className="btn rounded-full btn-outline text-[#CAEB66] border-[#CAEB66] hover:text-[#03373D] hover:bg-[#CAEB66] ">Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;