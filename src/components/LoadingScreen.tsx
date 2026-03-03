import { useEffect, useState } from "react";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3000);
    const doneTimer = setTimeout(() => onComplete(), 3600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen${fading ? " loading-screen--fade" : ""}`}>
      <div className="loading-screen__inner">
        <img src="/Cre8tiveSyncLogo.svg" alt="Cre8tive Sync" className="loading-screen__logo" />
        <p className="loading-screen__label">Loading</p>
        <div className="loading-screen__bar-track">
          <div className="loading-screen__bar" />
        </div>
        <p className="loading-screen__tagline">Powered by Innovation</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
