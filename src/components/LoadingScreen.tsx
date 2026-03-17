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
  const [fading,   setFading]   = useState(false);
  const [exploding, setExploding] = useState(false);

  useEffect(() => {
    const explodeTimer = setTimeout(() => setExploding(true), 3000);
    const fadeTimer    = setTimeout(() => setFading(true),    3200);
    const doneTimer    = setTimeout(() => onComplete(),        3650);
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
              className="explosion__particle"
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
