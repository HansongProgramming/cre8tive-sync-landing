import { useState } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'charging' | 'launch' | 'sucked' | 'shockwave' | 'gone'>('idle');

  const handleLaunch = () => {
    if (phase !== 'idle') return;

    const sfx = new Audio('/sfx.mp3');
    sfx.play().catch(() => {});

    setPhase('charging');

    // charge shakes for 0.7s, then rocket blasts up
    setTimeout(() => setPhase('launch'), 700);

    // rocket gone, now the screen itself gets sucked into the black hole
    setTimeout(() => setPhase('sucked'), 1150);

    // shockwave ring expands as overlay disappears
    setTimeout(() => setPhase('shockwave'), 1500);

    // unmount and reveal 3D scene
    setTimeout(() => onComplete(), 1900);
  };

  return (
    <div
      className={`ls ls--${phase}`}
      onClick={phase === 'idle' ? handleLaunch : undefined}
    >
      {/* shockwave ring — visible only during shockwave phase */}
      <div className="ls__shockwave" />

      <div className={`ls__content ls__content--${phase}`}>
        <div className="ls__launch-scene">
          <div className={`ls__rocket-wrap ls__rocket-wrap--${phase}`}>
            <div className="ls__flame" />
            <img
              src="/rocket.svg"
              className="ls__rocket"
              alt=""
              aria-hidden="true"
            />
          </div>
          <img
            src="/dock.svg"
            className="ls__dock"
            alt=""
            aria-hidden="true"
          />
        </div>

        <button
          className={`ls__btn ls__btn--${phase}`}
          disabled={phase !== 'idle'}
          style={{ visibility: (phase === 'idle' || phase === 'charging') ? 'visible' : 'hidden' }}
        >
          <img src="/launch.svg" className="ls__btn-img" alt="Launch" aria-label="Launch" />
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;
