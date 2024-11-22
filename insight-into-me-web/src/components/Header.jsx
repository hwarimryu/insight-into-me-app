import "./Header.css";

function Header({ title, onMenuToggle }) {
  return (
    <header className="app-header">
      <h1 className="app-title">{title}</h1>
      <button className="hamburger-button" onClick={onMenuToggle}>
        {/* <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div> */}
      </button>
    </header>
  );
}

export default Header;
