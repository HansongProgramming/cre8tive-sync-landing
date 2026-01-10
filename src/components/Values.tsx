import { useEffect, useState } from "react";
import "./Values.css";

const VALUES = [
  { image: "/Modulor.svg", title: "Modulor", description: "To work with grace, rhythm, and ease." },
  { image: "/Fingo.svg", title: "Fingo", description: "To spark Passion, Curiosity, and Connection." },
  { image: "/Effervesco.svg", title: "Effervesco", description: "To spark Passion, Curiosity, and Connection." },
  { image: "/Veritas.svg", title: "Veritas", description: "To stay grounded in Truth, Trust, and Purpose." },
  { image: "/Resono.svg", title: "Resono", description: "To leave a lasting impact, resonating beyond the moment." }
];

const EXTENDED = [...VALUES, ...VALUES, ...VALUES];
const CENTER = VALUES.length;

const Values = () => {
  const [index, setIndex] = useState(CENTER);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => i + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index >= CENTER * 2) {
      setTimeout(() => setIndex(CENTER), 900);
    }
    if (index <= CENTER / 2) {
      setTimeout(() => setIndex(CENTER), 900);
    }
  }, [index]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  return (
    <section id="values" className="values">
      <header className="values__header">
        <h2>Our Visions & Values</h2>
        <p>
          Effervesco fuels momentum. It turns ideas into movement and brings
          people together through shared energy and curiosity.
        </p>
      </header>

      <div className="arc-wrapper">
        <button className="arrow left" onClick={prev}>
          <img src="/Title_Left.svg" />
        </button>

        <div className="arc">
          {EXTENDED.map((v, i) => {
            const offset = i - index;
            if (Math.abs(offset) > 3) return null;

            return (
              <div
                key={i}
                className="arc-card"
                style={{ "--offset": offset } as React.CSSProperties}
              >
                <img src={v.image} />
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </div>
            );
          })}
        </div>

        <button className="arrow right" onClick={next}>
          <img src="/Title_Right.svg" />
        </button>
      </div>
    </section>
  );
};

export default Values;
