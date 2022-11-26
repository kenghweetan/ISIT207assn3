import React from "react";
import { HeroContentLeft } from "./Hero";
import { CardsCarousel } from "./CardsCarousel";
import Info from "./Info";
const Home = () => {
  return (
    <div>
      {/*       <br></br>
      <h1>in Home </h1> */}
      <HeroContentLeft />
      <CardsCarousel />
      <Info />
    </div>
  );
};

export default Home;
