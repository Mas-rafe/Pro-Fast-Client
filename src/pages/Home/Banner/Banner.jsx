import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import banner1 from '../../../assets/banner/banner1.png'
import banner2 from '../../../assets/banner/banner2.png'
import banner3 from '../../../assets/banner/banner2.png'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
          <Carousel autoPlay={true} infiniteLoop={true} stopOnHover={true} transitionTime={1000}   interval={2000} showThumbs={false}  >
                <div>
                    <img src={banner1} />
                  
                </div>
                <div>
                    <img src={banner2} />
                   
                </div>
                <div>
                    <img src={banner3} />
                    
                </div>
            </Carousel>
    );
};

export default Banner;