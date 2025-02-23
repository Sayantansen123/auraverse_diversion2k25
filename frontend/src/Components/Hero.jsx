import customSection from "./customSection";
import curve from "../assets/assets/hero/curve.png";
import herobackground from "../assets/assets/hero/herobackground.jpg";
import robot from "../assets/assets/hero/robot.jpg";
import Button from "./Button";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useEffect, useRef, useState } from "react";
import {motion} from "framer-motion"



const Hero = () => {
  const parallaxRef = useRef(null);
  const images = [
    "hero1.jpeg",
    "leaderbord.jpeg"
    
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  return (
    <customSection
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            <motion.span
             initial={{ opacity: 0 }}   // Start fully transparent
             animate={{ opacity: 1 }}   // Fade in to fully visible
             transition={{ duration: 2 }}
            >
            Welcome to Auraverse – Turn Good Deeds into Rewards!
            </motion.span>
         
            <span className="inline-block relative">
              
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <motion.p 
          initial={{ opacity: 0 }}   // Start fully transparent
          animate={{ opacity: 1 }}   // Fade in to fully visible
          transition={{ duration: 2 }}
          className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
          Auraverse is a social impact platform where your positive actions earn you Aura Points and exclusive NFT rewards.

          </motion.p>
          <Button href="/Task" white>
            Get started
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt="Slideshow"
                  
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  
                />
                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt="icon" />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={herobackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
          <BackgroundCircles />
        </div>
      </div>
      <BottomLine />
    </customSection>
  );
};

export default Hero;
