import "./Values.css";

const Values: React.FC = () => {
    const values = [
        {
            image: "/public/Effervesco.svg",
            title: "Effervesco",
            description: "To spark Passion, Curiosity, and Connection."
        },
        {
            image: "/public/Veritas.svg",
            title: "Veritas",
            description: "To stay grounded in Truth, Trust, and Purpose."
        },
        {
            image: "/public/Consocio.svg",
            title: "Consocio",
            description: "To honor collaboration, unity, and shared effort."
        },
        {
            image: "/public/Modulor.svg",
            title: "Modulor",
            description: "To work with grace rhythm and ease."
        },
        {
            image: "/public/Fingo.svg",
            title: "Fingo",
            description: "To build boldly, shape ideas, and face challenge."
        },
        {
            image: "/public/Resono.svg",
            title: "Resono",
            description: "To leave a lasting impact, resonating beyond the moment."
        },
                {
            image: "/public/Micare.svg",
            title: "Micare",
            description: "To find light, hope, and potential in the smallest places."
        },
                {
            image: "/public/Proficio.svg",
            title: "Proficio",
            description: "To grow with intention, creativity, and care."
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
                            <img src={value.image} alt="" />
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