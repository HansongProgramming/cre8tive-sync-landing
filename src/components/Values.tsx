import "./Values.css";

const Values: React.FC = () => {
    const values = [
        {
            icon: "⚙️",
            title: "Effervesco",
            description: "To spark Passion, Curiosity, and Connection."
        },
        {
            icon: "🎯",
            title: "Long-Term Thinking",
            description: "We design for sustainability and scalability. Our solutions are built to evolve with your business, not become obsolete in a year."
        },
        {
            icon: "👤",
            title: "Human-Centered Design",
            description: "Technology should serve people, not complicate their lives. We create intuitive experiences that feel natural and empowering."
        },
        {
            icon: "🚀",
            title: "Innovation First",
            description: "We stay ahead of the curve, constantly exploring emerging technologies and methodologies to deliver cutting-edge solutions."
        },
        {
            icon: "🤝",
            title: "Collaborative Partnership",
            description: "Your success is our success. We work alongside you as a true partner, transparent and committed to achieving your goals."
        },
        {
            icon: "🔒",
            title: "Security by Design",
            description: "Protection isn't an afterthought. We build security into every layer of our solutions from the ground up."
        }
    ];

    return (
        <section id="values" className="values">
            <div className="values__container">
                <div className="values__header">
                    <h2 className="values__title">Our Core Values</h2>
                    <p className="values__subtitle">
                        The principles that guide every decision we make and every solution we build
                    </p>
                </div>

                <div className="values__grid">
                    {values.map((value, index) => (
                        <div key={index} className="value-card">
                            <div className="value-card__icon">{value.icon}</div>
                            <h3 className="value-card__title">{value.title}</h3>
                            <p className="value-card__description">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;