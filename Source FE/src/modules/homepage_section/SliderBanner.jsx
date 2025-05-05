import { Carousel } from 'flowbite-react';
import React from 'react';

import slider1 from '../../assets/homepage/slider-1.jpg'
import slider2 from '../../assets/homepage/slider-2.jpg'
import slider3 from '../../assets/homepage/slider-3.jpg'

const SliderBanner = () => {
    return (
        <div className="h-56 sm:h-64 xl:h-[350px] mb-6 md:mb-16 flex justify-center">
            <Carousel slideInterval={2500} className="w-[90%] lg:w-2/3 z-0">
                <img src={slider1} alt="..." className="w-full object-contain" />
                <img src={slider2} alt="..." className="w-full object-contain" />
                <img src={slider3} alt="..." className="w-full object-contain" />
            </Carousel>
        </div>
    );
};

export default SliderBanner;