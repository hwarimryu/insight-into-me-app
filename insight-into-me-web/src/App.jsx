import { useState, useReducer, createContext, useRef } from "react";
import ThemeProvider from "./ThemeProvider";
import "./theme.css"; // 테마 정의한 CSS 파일

// import ThemeToggle from "./components/ThemeToggle";
import MainView from "./components/MainView";
// import TaskFormModal from "./components/TaskFormModal";
import TaskDetailsModal from "./components/TaskDetailsModal";
// import Button from "./components/Button";

import "./App.css";
import { TaskType } from "./codes/Type";
import AddTaskModal from "./components/AddTaskModal";

function planReducer(state, action) {
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

function doneReducer(state, action) {
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

function todoReducer(state, action) {
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
  { id: 1, type: TaskType.PLAN, startDateTime: new Date(2024,11,29,17,0,0).getTime(),  endDateTime: new Date(2024,11,29,19,0,0).getTime(), title: "Dinner with Client",completed: false  },
  { id: 2, type: TaskType.PLAN, startDateTime: new Date(2024,11,30,12,30,0).getTime(), endDateTime: new Date(2024,11,30,13,0,0).getTime(), title: "점심식사" ,completed: false   },
  { id: 3, type: TaskType.PLAN, startDateTime: new Date(2024,11,30,9,0,0).getTime(),   endDateTime: new Date(2024,11,30,17,0,0).getTime(), title: "Meeting with Team", tag: ["Meeting", "Dinner"] ,completed: false},
  { id: 4, type: TaskType.PLAN, startDateTime: new Date(2024,11,30,20,30,0).getTime(), endDateTime: new Date(2024,11,30,17,0,0).getTime(), title: "운동" ,completed: false},
  { id: 5, type: TaskType.PLAN, startDateTime: new Date(2024,11,1,17,0,0).getTime(),   endDateTime: new Date(2024,11,1,17,40,0).getTime(), title: "Conference Call", tag: ["Conference"] ,completed: false},
  { id: 6, type: TaskType.PLAN, startDateTime: new Date(2024,11,2,17,0,0).getTime(),   endDateTime: new Date(2024,11,2,17,30,0).getTime(), title: "점심식사" ,completed: false},
  { id: 7, type: TaskType.PLAN, startDateTime: new Date(2024,11,2,17,0,0).getTime(),  endDateTime: new Date(2024,11,2,18,0,0).getTime(), title: "Workout Session", tag: ["Workout", "Study", "Call"],completed: false },
  { id: 8, type: TaskType.PLAN, startDateTime: new Date(2024,11,29,17,0,0).getTime(),  endDateTime: new Date(2024,11,29,19,0,0).getTime(), title: "Dinner with Client",completed: false  },
  { id: 9, type: TaskType.PLAN, startDateTime: new Date(2024,12,29,17,0,0).getTime(),  endDateTime: new Date(2024,12,29,19,0,0).getTime(), title: "Dinner with Client",completed: false  },
  { id: 10, type: TaskType.PLAN, startDateTime: new Date(2025,1,29,17,0,0).getTime(),  endDateTime: new Date(2025,1,29,19,0,0).getTime(), title: "Dinner with Client",completed: false  },

  { id: 11, type: TaskType.PLAN, startDateTime: new Date(2024,11,18,11,45,0).getTime(), endDateTime: new Date(2024,11,18,13,0,0).getTime(), title: "점심 약속", tags:["멘탈"], completed: false},
  { id: 12, type: TaskType.PLAN, startDateTime: new Date(2024,11,18,13,0,0).getTime(), endDateTime: new Date(2024,11,18,15,0,0).getTime(), title: "개인 프로젝트", tags: ["취미"], completed: false},
  { id: 13, type: TaskType.PLAN, startDateTime: new Date(2024,11,18,15,0,0).getTime(), endDateTime: new Date(2024,11,18,16,30,0).getTime(), title: "독서 - 인스파이어드", tags: ["독서", "취미"], completed: false},
  { id: 14, type: TaskType.PLAN, startDateTime: new Date(2024,11,18,16,30,0).getTime(), endDateTime: new Date(2024,11,18,18,0,0).getTime(), title: "일기", tags: ["멘탈", "취미"], completed: false},
  { id: 15, type: TaskType.PLAN, startDateTime: new Date(2024,11,18,18,0,0).getTime(), endDateTime: new Date(2024,11,18,19,30,0).getTime(), title: "알고리즘 문제 2개", tags: ["취준"], completed: false},
  { id: 16, type: TaskType.PLAN, startDateTime: new Date(2024,11,18,19,30,0).getTime(), endDateTime: new Date(2024,11,18,21,40,0).getTime(), title: "포트폴리오 - 자기소개서, 집가는 길~", tags: ["취준"] ,completed: false},
  { id: 17, type: TaskType.PLAN, startDateTime: new Date(2024,11,18,22,0,0).getTime(), endDateTime: new Date(2024,11,18,23,40,0).getTime(), title: "독서, 일기, 걷기", tags: ["멘탈", "운동", "취미"] ,completed: false},
];

const mockDoneData = [
  { id: 1, planId: 11, type: TaskType.DONE, startDateTime: new Date(2024,11,18,11,50,0).getTime(), endDateTime: new Date(2024,11,18,13,10,0).getTime(), title: "점심 약속", tags:["멘탈"], completed: true},
  { id: 2, planId: 12, type: TaskType.DONE, startDateTime: new Date(2024,11,18,13,20,0).getTime(), endDateTime: new Date(2024,11,18,15,0,0).getTime(), title: "개인 프로젝트", tags: ["취미"], completed: true},

  { id: 8, type: TaskType.DONE, startDateTime: new Date(2024,11,29,12,0,0).getTime(), endDateTime: new Date(2024,11,29,13,0,0).getTime(), title: "낮잠",completed: true  },
  { id: 9, type: TaskType.DONE, startDateTime: new Date(2024,11,29,12,30,0).getTime(), endDateTime: new Date(2024,11,29,14,0,0).getTime(), title: "점심식사",completed: true  },
  { id: 10, type: TaskType.DONE, startDateTime: new Date(2024,12,1,20,0,0).getTime(), endDateTime: new Date(2024,12,1,21,0,0).getTime(), title: "낮잠" ,completed: true},
];

const mockTodoData = [
  { id: 1, type: TaskType.TODO, startDateTime: undefined, endDateTime: undefined, title: "낮잠" },
  { id: 2, type: TaskType.TODO, startDateTime: undefined, endDateTime: undefined, title: "점심식사" },
  { id: 3, type: TaskType.TODO, startDateTime: undefined, endDateTime: undefined, title: "낮잠"},
];

export const TaskStateContext = createContext();

export const PlanStateContext = createContext();
export const DoneStateContext = createContext();
export const TodoStateContext = createContext();
export const TaskDispathchContext = createContext();

function App() {
  const [plans, planDispatch] = useReducer(planReducer, mockPlanData);
  const [dones, doneDispatch] = useReducer(doneReducer, mockDoneData);
  const [todos, todoDispatch] = useReducer(todoReducer, mockTodoData);

  const idPlanRef = useRef(18);
  const idDoneRef = useRef(4);
  const idTodoRef = useRef(4);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [addTaskType, setAddTaskType] = useState(TaskType.PLAN);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isTaskDetailModalOpen, setIsTaskDetailModalOpen] = useState(false);
  const [isToggleAddTaskButtonActive, setIsToggleAddTaskButtonActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // TaskDetailsModal 상태

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };


  const toggleAddTaskButtons = (active) => {
    setIsToggleAddTaskButtonActive(active === undefined ? !isToggleAddTaskButtonActive : active);
  };

  const toggleAddTaskModal = (type) => {
    if(type !== undefined)
      setAddTaskType(type)
  
    setIsAddTaskModalOpen(!isAddTaskModalOpen);
    toggleAddTaskButtons(false);
  };

  const toggleTaskDetailModal = () => {
    setIsTaskDetailModalOpen(!isTaskDetailModalOpen);
  };

    // Task 추가 핸들러
  const onCreate = (type, planId, startDateTime, endDateTime, title, completed, tags) => {
    if(type === TaskType.PLAN) {
      planDispatch({
          type:"CREATE",
          data : {
            type: TaskType.PLAN,
            id: idPlanRef.current++,
            startDateTime,
            endDateTime,
            title,
            completed,
            tags: [... tags],
          }
        })
    }

    if(type === TaskType.DONE) {
      doneDispatch({
          type:"CREATE",
          data : {
            type: TaskType.DONE,
            id: idDoneRef.current++,
            planId,
            startDateTime,
            endDateTime,
            title,
            completed : true,
            tags: [... tags],
          }
        })
    }

    if(type === TaskType.TODO) {
      doneDispatch({
          type:"CREATE",
          data : {
            type: TaskType.TODO,
            id: idTodoRef.current++,
            startDateTime,
            endDateTime,
            title,
            completed : true,
            tags: [... tags],
          }
        })
    }
  };

    // Task 완료 상태 업데이트 핸들러
  const onComplete = (id) => {
    planDispatch({
        type:"COMPLETE",
        data : {
          id,
        }
      })

    doneDispatch({
      type:"CREATE",
      data : plans.filter(p => p.id === id)
    })
      
  };

    // 기존 일기 수정
  const onUpdate = (id, date, startTime, endTime, title, completed, tags) => {
    planDispatch({
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
    planDispatch({
      type:"DELETE",
      data : {
        id,
      }
    })
  }

  return (
    <ThemeProvider>
      <TaskStateContext.Provider value={plans}>
      <DoneStateContext.Provider value={dones}>
      <TaskDispathchContext.Provider value={{onCreate, onComplete, onUpdate, onDelete}}>
      <div className="app">
        {/* <ThemeToggle /> */}
        {/* 헤더 */}
        {/* <Header title="로고나제목" onMenuToggle={toggleMenu} /> */}
        {/* 메인 콘텐츠 */}
        <main className="app-main">
        <MainView onTaskSelect={(task) => { 
            setSelectedTask(task);
            toggleTaskDetailModal();
          }}/>
        </main>
        {/* Task 추가 버튼 */}
        <button className="task-add-button" onClick={() => toggleAddTaskButtons()}>
          +
        </button>
        {isToggleAddTaskButtonActive&&<>
          <button className="task-add-button plan" onClick={() => toggleAddTaskModal(TaskType.PLAN)}>
            plan
          </button>

          <button className="task-add-button done" onClick={() => toggleAddTaskModal(TaskType.DONE)}>
            done
          </button>

          <button className="task-add-button todo" onClick={() => toggleAddTaskModal(TaskType.TODO)}>
            todo
          </button>

          <button className="task-add-button diary" onClick={() => toggleAddTaskModal(TaskType.PLAN)}>
            diary
          </button>
        </>
        } 
      
        {/* <Button></Button> */}

        {/* Task 추가 모달 */}
        {isAddTaskModalOpen && <AddTaskModal onClose={toggleAddTaskModal} type = {addTaskType}/>}
        {isTaskDetailModalOpen && selectedTask && 
            <TaskDetailsModal
              task={selectedTask}
              onClose={toggleTaskDetailModal}
            />
          }
      </div>
      </TaskDispathchContext.Provider>
      </DoneStateContext.Provider>
      </TaskStateContext.Provider>
    </ThemeProvider>
  );
}

export default App;
