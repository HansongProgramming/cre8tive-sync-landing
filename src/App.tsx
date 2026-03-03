import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Values from "./components/Values";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
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
