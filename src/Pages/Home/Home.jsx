import React from "react";
import useTitle from "../../Hooks/useTitle";
import Banner from "../../Component/Banner/Banner";
import Contact from "../Contact/Contact";
import Navbar from "../../Component/Navbar/Navbar";
import About from "../About"
import MySkills from "../../Component/MySkills/MySkills";
import Container from "../../Component/Container/Container";

const Home = () => {
  useTitle("Home");
  return (
    
     <div>
        <Navbar></Navbar>
      <Container>
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
      </Container>
    </div>
      
   
  );
};

export default Home;
