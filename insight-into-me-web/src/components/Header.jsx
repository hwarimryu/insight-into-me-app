import "./Header.css";

function Header({ title, onMenuToggle }) {
  return (
    <header className="app-header">
      <h1 className="app-title">{title}</h1>
      <button className="hamburger-button" onClick={onMenuToggle}>
      </button>
    </header>
  );
}

export default Header;
