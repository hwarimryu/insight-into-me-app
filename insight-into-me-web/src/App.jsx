import { useState } from "react";
import Header from "./components/Header";
import CalendarView from "./components/CalendarView";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app">
      {/* 헤더 */}
      <Header title="로고나제목" onMenuToggle={toggleMenu} />
      {/* 메인 콘텐츠 */}
      <main className="app-main">
        <CalendarView />
      </main>
      {/* 햄버거 메뉴 사이드바 */}
    </div>
  );
}

export default App;
