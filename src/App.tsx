import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Values from "./components/Values";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Values />
        <Projects />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;