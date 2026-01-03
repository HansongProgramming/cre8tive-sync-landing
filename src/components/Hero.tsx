const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__inner">
        <h1 className="hero__title">
          Be Creative 
          Start the Sync
        </h1>

        <p className="hero__subtitle">
          We engineer custom software, autonomous AI, immersive AR, and advanced
          digital platforms with precision, intent, and long-term performance in mind.
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary">
            Explore Projects
          </button>
          <button className="hero__btn hero__btn--secondary">
            Our Vision
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
