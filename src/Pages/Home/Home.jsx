import Banner from "../../Component/Banner/Banner";
import Navbar from "../../Component/Navbar/Navbar";
import About from "../About";
import MySkills from "../../Component/MySkills/MySkills"
import Education from "../../Component/Education/Education"
import Projects from "../../Component/Projects/Projects"
import Contact from "../Contact/Contact"
import Container from "../../Component/Container/Container";
const Home = () => {
  return (
    <div className="bg-[#0a0a0a]">
      <Navbar />
      
      {/* Each section gets its own Container with ID */}
      <Container id="home" >
        <Banner />
      </Container>

      <Container id="about" className="py-20">
        <About />
      </Container>

      <Container id="skills" className="py-20">
        <MySkills />
      </Container>

      <Container id="education" className="py-20">
        <Education />
      </Container>

      <Container id="projects" className="py-20">
        <Projects />
      </Container>

      <Container id="contact" className="py-20">
        <Contact />
      </Container>

    
    </div>
  );
};
export default Home;