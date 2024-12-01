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
  { id: 1, startDateTime: new Date(2024,10,29,17,0,0).getTime(),  endDateTime: new Date(2024,10,29,19,0,0).getTime(), title: "Dinner with Client",completed: false  },
  { id: 2, startDateTime: new Date(2024,10,30,12,30,0).getTime(), endDateTime: new Date(2024,10,30,13,0,0).getTime(), title: "점심식사" ,completed: false   },
  { id: 3, startDateTime: new Date(2024,10,30,9,0,0).getTime(),   endDateTime: new Date(2024,10,30,17,0,0).getTime(), title: "Meeting with Team", tag: ["Meeting", "Dinner"] ,completed: false},
  { id: 4, startDateTime: new Date(2024,10,30,20,30,0).getTime(), endDateTime: new Date(2024,10,30,17,0,0).getTime(), title: "운동" ,completed: false},
  { id: 5, startDateTime: new Date(2024,11,1,17,0,0).getTime(),   endDateTime: new Date(2024,11,1,17,40,0).getTime(), title: "Conference Call", tag: ["Conference"] ,completed: false},
  { id: 6, startDateTime: new Date(2024,11,2,17,0,0).getTime(),   endDateTime: new Date(2024,11,2,17,30,0).getTime(), title: "점심식사" ,completed: false},
  { id: 7, startDateTime: new Date(2024,11,2,17,0,0).getTime(),  endDateTime: new Date(2024,11,2,18,0,0).getTime(), title: "Workout Session", tag: ["Workout", "Study", "Call"],completed: false },
];

const mockRecordData = [
  { id: 1, startDateTime: new Date(2024,10,29,12,0,0).getTime(),  endDateTime: new Date(2024,10,29,13,0,0).getTime(), title: "낮잠",completed: true  },
  { id: 2, startDateTime: new Date(2024,10,29,12,30,0).getTime(), endDateTime: new Date(2024,10,29,14,0,0).getTime(), title: "점심식사",completed: true  },
  { id: 3, startDateTime: new Date(2024,11,1,20,0,0).getTime(),   endDateTime: new Date(2024,11,1,21,0,0).getTime(), title: "낮잠" ,completed: true},
];

export const TaskStateContext = createContext();
export const TaskDispathchContext = createContext();

function App() {
  const [plans, dispatch] = useReducer(reducer, mockPlanData);
  const idPlanRef = useRef(8);
  const idRecordRef = useRef(4);
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
  const onCreate = (startDateTime, endDateTime, title, completed, tags) => {
      dispatch({
        type:"CREATE",
        data : {
          id: idPlanRef.current++,
          startDateTime,
          endDateTime,
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
        {isTaskModalOpen && <TaskFormModal onClose={toggleTaskModal}/>}
        {selectedTask && (
            <TaskDetailsModal
              task={selectedTask}
              onClose={() => setSelectedTask}
            />
          )}
      </div>
      </TaskDispathchContext.Provider>
      </TaskStateContext.Provider>
    </ThemeProvider>
  );
}

export default App;
