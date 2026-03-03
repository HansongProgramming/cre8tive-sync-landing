import { useEffect, useState } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

const LETTERS = "Loading".split("");

// rainbow-white rays: angle in degrees + tinted-white colour
const PARTICLES = [
  { angle: 0,   color: "#ffffff" },
  { angle: 30,  color: "#ffd6f7" },
  { angle: 60,  color: "#fff5b0" },
  { angle: 90,  color: "#b8f0ff" },
  { angle: 120, color: "#d4b8ff" },
  { angle: 150, color: "#ffb8d4" },
  { angle: 180, color: "#ffffff" },
  { angle: 210, color: "#b8ffd8" },
  { angle: 240, color: "#ffe5b8" },
  { angle: 270, color: "#ffb8b8" },
  { angle: 300, color: "#c8b8ff" },
  { angle: 330, color: "#b8eeff" },

  // inner ring — shorter, brighter, offset angles
  { angle: 15,  color: "#fff" },
  { angle: 75,  color: "#fff" },
  { angle: 135, color: "#fff" },
  { angle: 195, color: "#fff" },
  { angle: 255, color: "#fff" },
  { angle: 315, color: "#fff" },
];

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [fading,   setFading]   = useState(false);
  const [exploding, setExploding] = useState(false);

  useEffect(() => {
    const explodeTimer = setTimeout(() => setExploding(true), 3000);
    const fadeTimer    = setTimeout(() => setFading(true),    3350);
    const doneTimer    = setTimeout(() => onComplete(),        4300);
    return () => {
      clearTimeout(explodeTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen${fading ? " loading-screen--fade" : ""}`}>

      {/* radial burst glow */}
      <div className="loading-screen__glow" />

      {/* scanline overlay */}
      <div className="loading-screen__scanlines" />

      {/* ---- EXPLOSION ---- */}
      {exploding && (
        <div className="explosion">
          {/* screen-filling rainbow flash */}
          <div className="explosion__flash" />

          {/* supernova core */}
          <div className="explosion__core" />

          {/* expanding rings */}
          <div className="explosion__ring explosion__ring--1" />
          <div className="explosion__ring explosion__ring--2" />
          <div className="explosion__ring explosion__ring--3" />

          {/* particle rays */}
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className={`explosion__particle${i >= 12 ? " explosion__particle--short" : ""}`}
              style={{ "--angle": `${p.angle}deg`, "--color": p.color } as React.CSSProperties}
            />
          ))}
        </div>
      )}

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
