import { useEffect, useState } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

const LETTERS = "Loading".split("");

// saturated spectral rays — sampled from the bg prism palette
const PARTICLES = [
  { angle: 0,   color: "#ffffff" },
  { angle: 30,  color: "#ff2200" },   // deep red
  { angle: 60,  color: "#ff8800" },   // orange
  { angle: 90,  color: "#00ddff" },   // cyan
  { angle: 120, color: "#7700ff" },   // indigo
  { angle: 150, color: "#ff0066" },   // magenta
  { angle: 180, color: "#ffffff" },
  { angle: 210, color: "#00ff88" },   // green
  { angle: 240, color: "#ffdd00" },   // yellow
  { angle: 270, color: "#ff3300" },   // red-orange
  { angle: 300, color: "#aa00ff" },   // violet
  { angle: 330, color: "#00aaff" },   // sky blue

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

          {/* 4-pointed cross-star burst */}
          <svg
            className="explosion__star"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"    />
                <stop offset="20%"  stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="34%"  stopColor="#ff2200" stopOpacity="0.95" />
                <stop offset="48%"  stopColor="#ff9900" stopOpacity="0.88" />
                <stop offset="62%"  stopColor="#00ddff" stopOpacity="0.78" />
                <stop offset="76%"  stopColor="#7700ff" stopOpacity="0.55" />
                <stop offset="90%"  stopColor="#ff0066" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#ff0066" stopOpacity="0"    />
              </radialGradient>
              <filter id="starGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* curved cross-star: cubic bezier, perfect cusps at each tip */}
            <path
              d="M 50 0 C 50 44 56 50 100 50 C 56 50 50 56 50 100 C 50 56 44 50 0 50 C 44 50 50 44 50 0 Z"
              fill="url(#starGrad)"
              filter="url(#starGlow)"
            />
          </svg>

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
