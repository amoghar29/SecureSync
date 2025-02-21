import React from "react";
import Hero from "../components/Landing/Hero";
import HowItWorks from "../components/Landing/HowItWorks";
import Features from "../components/Landing/Features";
import Faq from "../components/Landing/Faq";

const Landing: React.FC = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Features />
      <Faq />
    </div>
  );
};

export default Landing;
