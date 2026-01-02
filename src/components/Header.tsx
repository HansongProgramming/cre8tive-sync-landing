const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">Creative Sync</div>

        <ul>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#values">Values</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <button>Start Project</button>
      </nav>
    </header>
  );
};

export default Header;
