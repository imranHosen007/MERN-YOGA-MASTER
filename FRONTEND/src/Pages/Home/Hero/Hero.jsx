import React from "react";
import HeroContainer from "./HeroContainer";
import bgImg from "../../../assets/home/banner-1.jpg";
const Hero = () => {
  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="flex items-center justify-start min-h-screen text-white bg-black pl-11 bg-opacity-60">
        <div>
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl">We Provide</p>
            <h1 className="text-4xl font-bold md:text-7xl">
              Best Yoga Course Online
            </h1>
            <div className="md:w-1/2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                molestias cum natus eos nisi itaque necessitatibus nobis non in.
                Placeat doloribus culpa ullam vitae similique? Aut corporis
                temporibus in dolorum!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <button className="py-3 font-bold uppercase rounded-lg px-7 hover:bg-transparent hover:border bg-secondary">
                Join Today
              </button>
              <button className="py-3 font-bold uppercase transition-colors duration-300 border rounded-lg hover:bg-secondary px-7 hover:border-none ">
                View Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
