import { useEffect, useState } from "react";
import "./Values.css";

const Values: React.FC = () => {
  const values = [
    { image: "/public/Effervesco.svg", title: "Effervesco", description: "To spark Passion, Curiosity, and Connection." },
    { image: "/public/Veritas.svg", title: "Veritas", description: "To stay grounded in Truth, Trust, and Purpose." },
    { image: "/public/Consocio.svg", title: "Consocio", description: "To honor collaboration, unity, and shared effort." },
    { image: "/public/Modulor.svg", title: "Modulor", description: "To work with grace, rhythm, and ease." },
    { image: "/public/Fingo.svg", title: "Fingo", description: "To build boldly, shape ideas, and face challenge." },
    { image: "/public/Resono.svg", title: "Resono", description: "To leave a lasting impact, resonating beyond the moment." },
    { image: "/public/Micare.svg", title: "Micare", description: "To find light, hope, and potential in the smallest places." },
    { image: "/public/Proficio.svg", title: "Proficio", description: "To grow with intention, creativity, and care." }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % values.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % values.length);
  const prev = () => setIndex((i) => (i - 1 + values.length) % values.length);

  return (
    <section className="values">
      <div className="values__header">
        <h2 className="values__title">Our Visions & Values</h2>
        <p className="values__subtitle">
          Effervesco fuels momentum. It turns ideas into movement and brings people together.
        </p>
      </div>

      <div className="wheel-wrapper">
        <button className="wheel-arrow left" onClick={prev}>
          <img src="/public/Title_Left.svg" />
        </button>

        {/* CENTER CARD */}
        <div className="center-card">
          <img src={values[index].image} />
          <h3>{values[index].title}</h3>
          <p>{values[index].description}</p>
        </div>

        {/* WHEEL */}
        <div
          className="wheel"
          style={{ transform: `rotate(${index * -45}deg)` }}
        >
          {values.map((value, i) => (
            <div
              key={i}
              className={`wheel-card ${i === index ? "active" : ""}`}
              style={{
                transform: `rotate(${i * 45}deg) translateY(-280px)`
              }}
            >
              <img src={value.image} />
              <span>{value.title}</span>
            </div>
          ))}
        </div>

        <button className="wheel-arrow right" onClick={next}>
          <img src="/public/Title_Right.svg" />
        </button>
      </div>
    </section>
  );
};

export default Values;
