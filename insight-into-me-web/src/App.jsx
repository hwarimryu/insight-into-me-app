import { useState, useReducer, createContext, useRef } from "react";
import ThemeProvider from "./ThemeProvider";
import "./theme.css"; // 테마 정의한 CSS 파일

import ThemeToggle from "./components/ThemeToggle";
import MainView from "./components/MainView";
import TaskFormModal from "./components/TaskFormModal";
import TaskDetailsModal from "./components/TaskDetailsModal";

import "./App.css";

function reducer(state, action) {
  switch(action.type) {
    case 'CREATE': return [action.data, ... state]
    case 'UPDATE': return state.map((item)=>
      String(item.id) === String(action.data.id)? action.data: item
    )
    case 'DELETE': return state.filter((item) => 
      String(item.id) !== String(action.data.id))
    case 'COMPLETE': return state.map((item)=>{
      console.log("COMPLETE")
      if(String(item.id) === String(action.data.id)) {
        item.completed = true;
      } 
      return item
    }) 
    default: return state
  }
}

const mockPlanData = [
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
];

const mockRecordData = [
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
];

export const TaskStateContext = createContext();
export const TaskDispathchContext = createContext();

function App() {
  const [plans, dispatch] = useReducer(reducer, mockPlanData);
  const idRef = useRef(11);
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
    const onCreate = (id, date, startTime, endTime, title, completed, tags) => {
      dispatch({
        type:"CREATE",
        data : {
          id: idRef.current++,
          date, 
          startTime,
          endTime,
          title,
          completed,
          tags,
        }
      })
    };

    // Task 완료 상태 업데이트 핸들러
    const onComplete = (id) => {
      dispatch({
        type:"COMPLETE",
        data : {
          id,
        }
      })
    };

    // 기존 일기 수정
  const onUpdate = (id, date, startTime, endTime, title, completed, tags) => {
    dispatch({
      type:"UPDATE",
      data : {
        id,
        date, 
        startTime,
        endTime,
        title,
        completed,
        tags,
      }
    })
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type:"DELETE",
      data : {
        id,
      }
    })
  }

  return (
    <ThemeProvider>
      <TaskStateContext.Provider value={plans}>
      <TaskDispathchContext.Provider value={{onCreate, onComplete, onUpdate, onDelete}}>
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
            />
          )}
      </div>
      </TaskDispathchContext.Provider>
      </TaskStateContext.Provider>
    </ThemeProvider>
  );
}

export default App;
