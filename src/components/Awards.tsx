import "./Awards.css";

const Awards: React.FC = () => {
    const awards = [
        {
            year: "2025",
            title: "3rd Place - Philippine Startup Challenge X",
            organization: "DICT - CAR",
            description: "Recognized for groundbreaking work in AI-driven automation solutions"
        },
        {
            year: "2025",
            title: "Community Impact Award - AIdeas",
            organization: "DICT - CAR",
            description: "Awarded for creating exceptional user experiences across multiple platforms"
        },
        {
            year: "2025",
            title: "Champion - Techno Demo Day 9",
            organization: "UC - INTTO",
            description: "Honored for architectural innovation and code quality standards"
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