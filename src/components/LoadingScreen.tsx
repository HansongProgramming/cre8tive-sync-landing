import { useState } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'charging' | 'launch' | 'fading'>('idle');

  const handleLaunch = () => {
    if (phase !== 'idle') return;
    setPhase('charging');

    // after charge animation (0.9s), blast off
    setTimeout(() => setPhase('launch'), 900);

    // after rocket exits screen (0.6s of launch), fade the overlay
    setTimeout(() => setPhase('fading'), 1500);

    // once fade is done, tell parent — 3D scene + hero timers start NOW
    setTimeout(() => onComplete(), 2000);
  };

  return (
    <div
      className={`ls${phase === 'fading' ? ' ls--fade' : ''}`}
      onClick={phase === 'idle' ? handleLaunch : undefined}
    >
      <div className="ls__content">
        <div className={`ls__rocket-wrap ls__rocket-wrap--${phase}`}>
          {/* flame — visible during charge + launch */}
          <div className="ls__flame" />

          {/* rocket SVG */}
          <svg
            className="ls__rocket"
            viewBox="0 0 48 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* body */}
            <path
              d="M24 4 C14 4 8 20 8 36 L8 56 L24 62 L40 56 L40 36 C40 20 34 4 24 4Z"
              fill="#1a1a1a"
            />
            {/* nose cone */}
            <path
              d="M24 4 C20 4 16 10 14 18 L34 18 C32 10 28 4 24 4Z"
              fill="#333"
            />
            {/* window */}
            <circle cx="24" cy="32" r="5" fill="#e8e8e8" stroke="#555" strokeWidth="1.5" />
            <circle cx="24" cy="32" r="3" fill="#c0d8f0" />
            {/* left fin */}
            <path d="M8 48 L2 60 L8 56 Z" fill="#222" />
            {/* right fin */}
            <path d="M40 48 L46 60 L40 56 Z" fill="#222" />
            {/* nozzle */}
            <rect x="19" y="60" width="10" height="6" rx="2" fill="#444" />
          </svg>
        </div>

        <p className="ls__label">
          {phase === 'idle' ? 'Press to Launch' : phase === 'charging' ? 'Launching…' : ''}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
