// src/components/LogoMarquee.jsx

import Marquee from "react-fast-marquee";


 import amazon from '../../../assets/brands/amazon.png';
 import vector from'../../../assets/brands/amazon_vector.png';
 import casio from'../../../assets/brands/casio.png';
 import moonstar from'../../../assets/brands/moonstar.png';
 import randstad from'../../../assets/brands/randstad.png';
 import people from'../../../assets/brands/start-people 1.png';
 import start from'../../../assets/brands/start.png';
  
const logos = [amazon,vector,casio,moonstar,randstad,people,start ]

const LogoMarquee = () => {
  return (
    <section className="py-10 bg-base-200 my-4">
      <h2 className="text-2xl font-bold text-center mb-20    text-[#03373D]">We've helped thousands of sales teams</h2>
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-20">
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="h-6 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default LogoMarquee;
