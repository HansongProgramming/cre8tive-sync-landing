const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero_title_container">
        <img src="/Title_Left.svg" alt="" />
        <h1 className="hero__title">
          Be Creative
          StaRt The SynC
        </h1>
                <img src="/Title_Right.svg" alt="" />
        </div>
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
        <div className="hero_awards">
          <img src="/Awards.svg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
