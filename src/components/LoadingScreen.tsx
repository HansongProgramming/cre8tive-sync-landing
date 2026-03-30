import { useEffect, useState } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

const LETTERS = "Loading".split("");

const PARTICLES = [
  { angle: 0,   color: "#fff" },
  { angle: 30,  color: "#fff" },
  { angle: 60,  color: "#fff" },
  { angle: 90,  color: "#fff" },
  { angle: 120, color: "#fff" },
  { angle: 150, color: "#fff" },
  { angle: 180, color: "#fff" },
  { angle: 210, color: "#fff" },
  { angle: 240, color: "#fff" },
  { angle: 270, color: "#fff" },
  { angle: 300, color: "#fff" },
  { angle: 330, color: "#fff" },

];

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {

  const [fading, setFading] = useState(false);
  const [showCircle, setShowCircle] = useState(false);

  useEffect(() => {
    const circleTimer = setTimeout(() => setShowCircle(true), 3000);
    const fadeTimer   = setTimeout(() => setFading(true),     3200);
    const doneTimer   = setTimeout(() => onComplete(),        3650);
    return () => {
      clearTimeout(circleTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);


  return (
    <div className={`loading-screen${fading ? " loading-screen--fade" : ""}`}>

      {/* simple growing circle outline */}
      {showCircle && <div className="loading-screen__circle-outline" />}

      <div className="loading-screen__inner">
        {/* logo */}
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
