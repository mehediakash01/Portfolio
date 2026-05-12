import Banner from "../../Component/Banner/Banner";
import About from "../About";
import MySkills from "../../Component/MySkills/MySkills"
import Education from "../../Component/Education/Education"
import Projects from "../../Component/Projects/Projects"
import Contact from "../Contact/Contact"

const Home = () => {
  return (
    <div className="bg-[#050505] min-h-screen">
      <div id="home">
        <Banner />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="skills">
        <MySkills />
      </div>

      <div id="education">
        <Education />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="contact">
        <Contact />
      </div>

    </div>
  );
};
export default Home;
