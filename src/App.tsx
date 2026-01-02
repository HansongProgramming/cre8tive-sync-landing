import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Values from "./components/Values";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Values />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;