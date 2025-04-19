import React from "react";
import img1 from "../../../assets/gallary/image1.png";
import img2 from "../../../assets/gallary/image2.png";
const Gallery = () => {
  return (
    <div className="md:w-[80%] mx-auto my-28">
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Our Gallery
        </h1>
      </div>
      <div className="items-center justify-center grid-cols-2 gap-4 border md:grid">
        <div className="mb-4 md:mb-0">
          <img src={img1} alt="" className="w-full mx-auto md:h-[720px]" />
        </div>
        <div className="grid items-start grid-cols-2 gap-4">
          <div>
            <img src={img2} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={img2} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={img2} alt="" className="md:h-[350px] rounded-sm" />
          </div>
          <div>
            <img src={img2} alt="" className="md:h-[350px] rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
