import "./Projects.css";

const Projects: React.FC = () => {
    const projects = [
        {
            title: "AI-Powered Analytics Platform",
            category: "Artificial Intelligence",
            description: "Custom machine learning solution for real-time data analysis and predictive insights.",
            tags: ["Python", "TensorFlow", "React"],
            image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            title: "Immersive AR Experience",
            category: "Augmented Reality",
            description: "Interactive AR application for retail visualization and customer engagement.",
            tags: ["Unity", "ARKit", "C#"],
            image: "https://images.pexels.com/photos/123335/pexels-photo-123335.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            title: "Enterprise Cloud Platform",
            category: "Cloud Infrastructure",
            description: "Scalable microservices architecture with automated deployment pipelines.",
            tags: ["AWS", "Docker", "Kubernetes"],
            image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            title: "FinTech Mobile App",
            category: "Mobile Development",
            description: "Secure banking application with biometric authentication and real-time transactions.",
            tags: ["React Native", "Node.js", "PostgreSQL"],
            image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            title: "Healthcare Management System",
            category: "Healthcare Tech",
            description: "HIPAA-compliant platform for patient records and appointment scheduling.",
            tags: ["Vue.js", "Python", "MongoDB"],
            image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800"
        },
        {
            title: "E-Commerce Revolution",
            category: "Web Development",
            description: "Next-generation shopping experience with AI recommendations and seamless checkout.",
            tags: ["Next.js", "Stripe", "Redis"],
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
    ];

    return (
        <section id="projects" className="projects">
            <div className="projects__container">
                <div className="projects__header">
                    <h2 className="projects__title">Featured Projects</h2>
                    <p className="projects__subtitle">
                        Explore our portfolio of cutting-edge solutions built with precision and innovation
                    </p>
                </div>

                <div className="projects__grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-card__image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-card__overlay">
                                    <span className="project-card__category">{project.category}</span>
                                </div>
                            </div>
                            <div className="project-card__content">
                                <h3 className="project-card__title">{project.title}</h3>
                                <p className="project-card__description">{project.description}</p>
                                <div className="project-card__tags">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="project-card__tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;