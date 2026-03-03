import { useEffect, useState } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

const LETTERS = "Loading".split("");

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3000);
    const doneTimer = setTimeout(() => onComplete(), 3700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen${fading ? " loading-screen--fade" : ""}`}>

      {/* radial burst glow behind content */}
      <div className="loading-screen__glow" />

      {/* scanline overlay */}
      <div className="loading-screen__scanlines" />

      <div className="loading-screen__inner">

        {/* logo burst */}
        <div className="loading-screen__logo-wrap">
          <div className="loading-screen__logo-ring" />
          <img src="/Cre8tiveSyncLogo.svg" alt="Cre8tive Sync" className="loading-screen__logo" />
        </div>

        {/* letter-by-letter "Loading" */}
        <p className="loading-screen__label" aria-label="Loading">
          {LETTERS.map((ch, i) => (
            <span key={i} className="loading-screen__letter" style={{ "--i": i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </p>

        {/* progress bar */}
        <div className="loading-screen__bar-track">
          <div className="loading-screen__bar">
            <span className="loading-screen__spark" />
          </div>
        </div>

        <p className="loading-screen__tagline">Powered by Innovation</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
