import { useEffect, useState } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

const LETTERS = "Loading".split("");

// spectral rays in natural rainbow order around the clock
const PARTICLES = [
  { angle: 0,   color: "#ff0000" },   // red
  { angle: 30,  color: "#ff6600" },   // orange
  { angle: 60,  color: "#ffdd00" },   // yellow
  { angle: 90,  color: "#88ff00" },   // yellow-green
  { angle: 120, color: "#00ff44" },   // green
  { angle: 150, color: "#00ff88" },   // spring green
  { angle: 180, color: "#00ddff" },   // cyan
  { angle: 210, color: "#00aaff" },   // sky blue
  { angle: 240, color: "#0055ff" },   // blue
  { angle: 270, color: "#7700ff" },   // violet
  { angle: 300, color: "#aa00ff" },   // purple
  { angle: 330, color: "#ff0066" },   // magenta

  // inner ring — shorter white accent rays
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

          {/* hidden SVG — provides the star clip path */}
          <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
            <defs>
              <clipPath id="expl-star-clip" clipPathUnits="objectBoundingBox">
                <path d="M 0.5 0 C 0.5 0.44 0.56 0.5 1 0.5 C 0.56 0.5 0.5 0.56 0.5 1 C 0.5 0.56 0.44 0.5 0 0.5 C 0.44 0.5 0.5 0.44 0.5 0 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* 4-pointed cross-star — conic rainbow sweeps around the arms */}
          <div className="explosion__star" aria-hidden="true" />

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
