import React from "react";

import Navbar from "../../Component/Navbar/Navbar";
import Banner from "../../Component/Banner/Banner";
import About from "../About";
import MySkills from "../../Component/MySkills/MySkills";
import Contact from "../Contact/Contact";
import Container from "../../Component/Container/Container";
import Projects from "../../Component/Projects/Projects";
import Education from "../../Component/Education/Education";


const Home = () => {
  

  return (
    <div>
      {/* Navbar should stay outside scroll container to remain fixed */}
      <Navbar />

      {/* Scrollable Sections */}
      <Container>
        <section id="home" >
          <Banner />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <MySkills />
        </section>
        <section id="education">
         <Education></Education>
        </section>


        <section id="projects">
         <Projects></Projects>
        </section>

        <section id="contact">
          <Contact />
        </section>
      </Container>
    </div>
  );
};

export default Home;
