import { useState } from "react";
import ThemeProvider from "./ThemeProvider";
import "./theme.css"; // 테마 정의한 CSS 파일

import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import MainView from "./components/MainView";
import TaskFormModal from "./components/TaskFormModal";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

  return (
    <ThemeProvider>
    <div className="app">
      {/* <ThemeToggle /> */}
      {/* 헤더 */}
      {/* <Header title="로고나제목" onMenuToggle={toggleMenu} /> */}
      {/* 메인 콘텐츠 */}
      <main className="app-main">
      <MainView />
      </main>
      {/* Task 추가 버튼 */}
      <button className="task-add-button" onClick={toggleTaskModal}>
        +
      </button>
      {/* Task 추가 모달 */}
      {isTaskModalOpen && <TaskFormModal onClose={toggleTaskModal} />}
    </div>
    </ThemeProvider>
  );
}

export default App;
