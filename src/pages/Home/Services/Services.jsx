// src/components/Services.jsx

import {
  FaShippingFast,
  FaGlobeAsia,
  FaWarehouse,
  FaMoneyBillWave,
  FaHandshake,
  FaUndo,
} from 'react-icons/fa';
import ServiceCard from './ServiceCard';

const servicesData = [
  {
    icon: <FaShippingFast className="text-4xl" />,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    icon: <FaGlobeAsia className="text-4xl" />,
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
  },
  {
    icon: <FaWarehouse className="text-4xl" />,
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl" />,
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    icon: <FaHandshake className="text-4xl" />,
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
  },
  {
    icon: <FaUndo className="text-4xl" />,
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-[#03373D] text-center px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl  font-bold mb-4 text-[#FFFFFF]">Our Services</h2>
        <p className="text-[#FFFFFF] mb-10 max-w-3xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
             service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
