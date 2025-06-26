import React from "react";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import heading from '../../../assets/customer-top.png'

const reviewData = [
  {
    id: 1,
    description:
      "A posture corrector provides support and alignment to your shoulders, back, and spine, encouraging proper posture throughout the day.",
    name: "Rahat Hossain",
    designation: "Fitness Trainer",
    
    profile: "/profiles/rahat.png",
  },
  {
    id: 2,
    description:
      "Daily use has improved my posture significantly. It's now easier to move and I feel less back strain.",
    name: "Sanjida Rahman",
    designation: "Yoga Instructor",
    
    profile: "/profiles/sanjida.png",
  },
  {
    id: 3,
    description:
      "This is a perfect product for aligning your body and reducing discomfort. Easy and comfortable to wear.",
    name: "Mahir Islam",
    designation: "Wellness Blogger",
    
    profile: "/profiles/mahir.png",
  },
  {
    id: 4,
    description:
      "Long office hours used to hurt my back, but not anymore. Posture Pro made a big difference.",
    name: "Faria Jannat",
    designation: "Office Executive",
    
    profile: "/profiles/faria.png",
  },
  {
    id: 5,
    description:
      "I regained confidence as my posture improved. My overall energy and appearance feel better now.",
    name: "Abir Mahmud",
    designation: "Entrepreneur",
    
    profile: "/profiles/abir.png",
  },
  {
    id: 6,
    description:
      "Lightweight and easy to wear under clothing. The build quality is great and it's truly effective.",
    name: "Rumana Kabir",
    designation: "Physiotherapist",
    
    profile: "/profiles/rumana.png",
  },
  {
    id: 7,
    description:
      "One of the most effective posture tools I've used. Noticeable results within just a week!",
    name: "Sohan Hasan",
    designation: "Athlete",
    
    profile: "/profiles/sohan.png",
  },
];

const Reviews = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-16 bg-base-100 text-center px-4">
      {/* Center image */}
      <img
        src={heading}
        alt="heading icon"
        style={{ width: "244.12px", height: "100px" }}
        className="mx-auto mb-6"
      />

      {/* Title */}
      <h2 className="text-[40px] font-extrabold text-[#03373D] mb-4">
        What our customers are sayings
      </h2>

      {/* Description */}
      <p className="text-[#606060] max-w-3xl mx-auto mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* Carousel */}
      <Slider {...settings}>
        {reviewData.map((review) => (
          <div
            key={review.id}
            className="px-4 opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            <ReviewCard {...review} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Reviews;
