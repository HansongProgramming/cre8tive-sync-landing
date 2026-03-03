import { useState } from "react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src="/Cre8tiveSyncLogo.svg" alt="Cre8tive Sync Logo" />
          Creative Sync
        </div>

        <ul className="nav-links">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#values">Values</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <button className="header-cta">Start Project</button>

        <button
          className={`hamburger${menuOpen ? " hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-nav">
          <ul>
            <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="#values" onClick={closeMenu}>Values</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
          <a href="#contact" className="mobile-cta" onClick={closeMenu}>Start Project</a>
        </div>
      )}
    </header>
  );
};

export default Header;
