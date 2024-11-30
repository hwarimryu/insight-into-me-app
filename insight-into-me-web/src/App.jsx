import { useState, useReducer, createContext } from "react";
import ThemeProvider from "./ThemeProvider";
import "./theme.css"; // 테마 정의한 CSS 파일

import ThemeToggle from "./components/ThemeToggle";
import MainView from "./components/MainView";
import TaskFormModal from "./components/TaskFormModal";
import TaskDetailsModal from "./components/TaskDetailsModal";

import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // TaskDetailsModal 상태

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };

    // Task 추가 핸들러
    const handleAddTask = (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    // Task 완료 상태 업데이트 핸들러
    const handleCompleteTask = (taskId) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
    };

  return (
    <ThemeProvider>
    <div className="app">
      {/* <ThemeToggle /> */}
      {/* 헤더 */}
      {/* <Header title="로고나제목" onMenuToggle={toggleMenu} /> */}
      {/* 메인 콘텐츠 */}
      <main className="app-main">
      <MainView onTaskSelect={setSelectedTask}/>
      </main>
      {/* Task 추가 버튼 */}
      <button className="task-add-button" onClick={toggleTaskModal}>
        +
      </button>
      {/* Task 추가 모달 */}
      {isTaskModalOpen && <TaskFormModal onClose={toggleTaskModal} onAddTask={handleAddTask}/>}
      {selectedTask && (
          <TaskDetailsModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onComplete={handleCompleteTask}
          />
        )}
    </div>
    </ThemeProvider>
  );
}

export default App;
