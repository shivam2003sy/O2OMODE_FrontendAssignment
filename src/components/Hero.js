import React from "react";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-[400px] bg-hero bg-no-repeat bg-cover bg-center py-20">
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[10px] mr-3 bg-cyan-700"></div>O2OMODE
          </div>
          <h1 className="uppercase text-[20px] md:text-[30px] leading-[1.1] font-semibold mb-4">We are making Discovery of Fashion Stores Easy<br />
          <span className="font-light">Enabling Fashion Stores on ONDC</span></h1>
          <Link to={'/'} className='self-start uppercase font-semibold border-b-2 border-primary'>Discover More</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
