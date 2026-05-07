import { useEffect, useState } from 'react';

interface Props {
  loaded: boolean;
}

const Hero: React.FC<Props> = ({ loaded }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setRevealed(true), 3000);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <section className="hero">
      <div className={`hero__inner${revealed ? ' hero__inner--revealed' : ''}`}>
        <div className="hero_title_container">
          <img src="/Title_Left.svg" aria-hidden="true" alt="" />
          <h1 className="hero__title">
            Be Creative
            StaRt The SynC
          </h1>
          <img src="/Title_Right.svg" aria-hidden="true" alt="" />
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
          <img src="/Awards.svg" alt="Awards and recognition" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
