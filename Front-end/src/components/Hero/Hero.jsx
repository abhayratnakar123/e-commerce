import React from "react"; 
import {Link} from "react-router-dom"
const Hero = () => {
  return (
    <section className="hero h-[90vh] sm:px-4 sm:h-[90vh] text-white flex flex-col-reverse justify-center items-center sm:flex-row gap-10 sm:gap-16">
      <div className="flex flex-col px-1 xs:px-0 xs:w-[70%] sm:w-[40%] lg:w-[30%] text-center items-center">
        <div className="text-[3rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5.2rem]  -mt-5 font-semibold">LUXELANE</div>
        <div className="   sm:mt-3 text-sm lg:text-base lg:mt-3">
          Experience audio perfection at Luxelane. Explore a curated selection
          of high-quality audio products, from headphones to speakers and smart accesories.
        </div>
      <div className="flex mt-5 sm:mt-9 xl:mt-12 gap-6 items-center">
        <Link to="/products" className="text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-2 transition duration-[0.25] min-w-[6rem] ease-in hover:opacity-[0.81] border border-white">Read More</Link>
        <Link to="/products" className="text-sm sm:text-base px-2 py-1 sm:px-3 sm:py-2 transition duration-[0.25] min-w-[6rem] ease-in hover:opacity-[0.81] border bg-white text-black">Shop Now</Link>
      </div>
      </div>
      <div className="sm:h-full flex items-center">
        <img
          className="h-[45vh] sm:h-[65%]  xl:h-[75%]"
          src="/assets/Image/bg-1.png"
          loading="lazy"
          alt="LUXELANE"
        />
      </div>
    </section>
  );
};

export default Hero;
