import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Projects.css";

const Projects: React.FC = () => {
    const headerRef = useScrollReveal<HTMLDivElement>();

    return (
        <section id="projects" className="projects">
            <div className="projects__container">
                <div ref={headerRef} className="projects__header scroll-reveal">
                    <h2 className="projects__title">Featured Projects</h2>
                    <p className="projects__subtitle">
                        Explore our portfolio of cutting-edge solutions built with precision and innovation
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Projects;
