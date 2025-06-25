// src/components/Benefits.jsx

import BenefitCard from "./BenefitCard";
import tracking from '../../assets/live-tracking.png'
import call from '../../assets/safe-delivery.png'
import support from '../../assets/tiny-deliveryman.png'

const benefits = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: tracking,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: call,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: support,
  },
];

const Benefits = () => {
  return (
    <div className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
       

        <div className="space-y-6">
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              image={benefit.image}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
