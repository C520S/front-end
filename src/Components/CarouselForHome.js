import React from "react";
import "antd/dist/reset.css";
import { Carousel, Image } from "antd";
import pandaBike1 from "../Images/pandaBike1.jpeg";
import pandaBike2 from "../Images/pandaBike2.jpeg";
import pandaBike3 from "../Images/pandaBike3.jpeg";
import pandaBike4 from "../Images/pandaBike4.jpeg";

const CarouselForHome = () => {
  return (
    <>
      <Carousel autoplay dotPosition="top" autoplaySpeed={2000} id="panda-carousel">
        <div>
          <Image
            src={pandaBike1}
            width={350}
            style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)" }}
          />
        </div>
        <div>
          <Image
            src={pandaBike2}
            width={350}
            style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)" }}
          />
        </div>
        <div>
          <Image
            src={pandaBike3}
            width={350}
            style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)" }}
          />
        </div>
        <div>
          <Image
            src={pandaBike4}
            width={350}
            style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)" }}
          />
        </div>
      </Carousel>
    </>
  );
};
export default CarouselForHome;
