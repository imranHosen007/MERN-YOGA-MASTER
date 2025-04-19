import React from "react";
import HeroContainer from "./Hero/HeroContainer";
import Gallery from "./Gallery/Gallery";
import { PopularClasses } from "./PopularClasses/PopularClasses";
import PopularTeacher from "./PopularTeacher/PopularTeacher";

const Home = () => {
  return (
    <div>
      <HeroContainer />
      <div className="mx-auto max-w-screen-xl">
        <Gallery />
        <PopularClasses />
        <PopularTeacher />
      </div>
    </div>
  );
};

export default Home;
