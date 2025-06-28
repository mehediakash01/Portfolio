import React from "react";
import useTitle from "../../Hooks/useTitle";
import Banner from "../../Component/Banner/Banner";
import Contact from "../Contact/Contact";
import Navbar from "../../Component/Navbar/Navbar";
import About from "../About"
import MySkills from "../../Component/MySkills/MySkills";

const Home = () => {
  useTitle("Home");
  return (
    
     <div>
        <Navbar></Navbar>
      <div id="home">
        <Banner />
      </div>
      <div id="about">
     <About></About>
      </div>
      <div id="skills">
      <MySkills></MySkills>
      </div>
      <div id="projects">
        {/* <Projects /> */}
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
      
   
  );
};

export default Home;
