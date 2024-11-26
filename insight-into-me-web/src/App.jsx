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
  const [tasks, setTasks] = useState([
    { id: 1, date: "2024-11-25", startTime: "17:00", endTime: "19:00", title: "Dinner with Client",completed: false  },
    { id: 2, date: "2024-11-25", startTime: "12:00", endTime: "13:00",title: "낮잠",completed: true  },
    { id: 3, date: "2024-11-25", startTime: "12:30", endTime: "13:00",title: "점심식사",completed: true  },
    { id: 4, date: "2024-11-25", startTime: "12:30", endTime: "12:50",title: "점심식사" ,completed: false   },
    { id: 5, date: "2024-11-25", startTime: "09:00", endTime: "11:30",title: "Meeting with Team", tag: ["Meeting", "Dinner"] ,completed: false},
    { id: 6, date: "2024-11-25", startTime: "20:30", endTime: "21:10",title: "운동" ,completed: false},
    { id: 7, date: "2024-11-26", startTime: "10:00", endTime: "13:00",title: "Conference Call", tag: ["Conference"] ,completed: false},
    { id: 8, date: "2024-11-26", startTime: "12:00", endTime: "13:00",title: "낮잠" ,completed: true},
    { id: 9, date: "2024-11-26", startTime: "12:30", endTime: "13:00",title: "점심식사" ,completed: false},
    { id: 10, date: "2024-11-30", startTime: "07:00", endTime: "10:00",title: "Workout Session", tag: ["Workout", "Study", "Call"],completed: false },
  ]); // Task 상태

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
      <MainView tasks={tasks} onCompleteTask={handleCompleteTask}/>
      </main>
      {/* Task 추가 버튼 */}
      <button className="task-add-button" onClick={toggleTaskModal}>
        +
      </button>
      {/* Task 추가 모달 */}
      {isTaskModalOpen && <TaskFormModal onClose={toggleTaskModal} onAddTask={handleAddTask}/>}
    </div>
    </ThemeProvider>
  );
}

export default App;
