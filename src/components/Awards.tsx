import "./Awards.css";

const Awards: React.FC = () => {
    const awards = [
        {
            year: "2025",
            title: "Innovation Excellence Award",
            organization: "Tech Innovation Council",
            description: "Recognized for groundbreaking work in AI-driven automation solutions"
        },
        {
            year: "2025",
            title: "Best Digital Experience",
            organization: "UX Design Awards",
            description: "Awarded for creating exceptional user experiences across multiple platforms"
        },
        {
            year: "2024",
            title: "Engineering Excellence",
            organization: "Software Engineering Institute",
            description: "Honored for architectural innovation and code quality standards"
        },
        {
            year: "2024",
            title: "Community Impact Award",
            organization: "Tech for Good Foundation",
            description: "Celebrated for developing technology solutions that benefit underserved communities"
        },
        {
            year: "2024",
            title: "Startup of the Year",
            organization: "Digital Business Awards",
            description: "Recognized as a leading emerging technology company"
        },
        {
            year: "2023",
            title: "Champion Award",
            organization: "Industry Leaders Forum",
            description: "Acknowledged for exceptional client satisfaction and project delivery"
        }
    ];

    return (
        <section className="awards">
            <div className="awards__container">
                <div className="awards__header">
                    <h2 className="awards__title">Recognition & Awards</h2>
                    <p className="awards__subtitle">
                        Celebrating excellence and the trust our clients and industry peers place in us
                    </p>
                </div>

                <div className="awards__grid">
                    {awards.map((award, index) => (
                        <div key={index} className="award-card">
                            <div className="award-card__year">{award.year}</div>
                            <div className="award-card__content">
                                <h3 className="award-card__title">{award.title}</h3>
                                <p className="award-card__organization">{award.organization}</p>
                                <p className="award-card__description">{award.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Awards;