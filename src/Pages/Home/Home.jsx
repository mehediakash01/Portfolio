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
    <div className="bg-[#050505]">
      <Navbar />
      
      <section id="home">
        <Banner />
      </section>

      <Container id="about" className="py-0 !bg-[#050505]">
        <About />
      </Container>

      <Container id="skills" className="py-20">
        <MySkills />
      </Container>

      <Container id="education" className="py-20">
        <Education />
      </Container>

      <Container id="projects" className="py-0 !bg-[#050505]">
        <Projects />
      </Container>

      <Container id="contact" className="py-20">
        <Contact />
      </Container>

    
    </div>
  );
};
export default Home;
