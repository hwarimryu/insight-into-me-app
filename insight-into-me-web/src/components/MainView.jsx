import { useState, useReducer, createContext, useRef } from "react";
import "./MainView.css";
import MonthlyView from "./MonthlyView";
import DailyView from "./DailyView";


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

function reducer(state, action) {
  switch(action.type) {
    case 'CREATE': return [action.data, ... state]
    case 'UPDATE': return state.map((item)=>
      String(item.id) === String(action.data.id)? action.data: item
    )
    case 'DELETE': return state.filter((item) => 
      String(item.id) !== String(action.data.id))
    case 'COMPLETE': return state.map((item)=>
      String(item.id) === String(action.data.id)? item: item
    ) 
    default: return state
  }
}

export const TaskStateContext = createContext();
export const TaskDispathchContext = createContext();


function MainView({onTaskSelect}) {
  const [mainViewType, setMainViewType] = useState("monthly"); // "monthly" 또는 "timeline"
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [plans, dispatch] = useReducer(reducer, mockPlanData);
  const idRef = useRef(11);

  const toggleViewType = () => {
    setMainViewType((prevType) => (prevType === "monthly" ? "timeline" : "monthly"));
  };

  const onSelectedDateChanged = (date) => {
    setSelectedDate(date)
  }


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
        type:"COMPLTET",
        data : {
          id
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
  <>
  <TaskStateContext.Provider value={plans}>
  <TaskDispathchContext.Provider value={{onCreate, onComplete, onUpdate, onDelete}}>
    <div className={`main-view ${mainViewType}`}>
  
      {/* 뷰 전환 */}
      {mainViewType === "monthly" && (
      <MonthlyView
          selectedDate={selectedDate}
          onSelectedDateChanged={onSelectedDateChanged}
          layoutState={mainViewType}
          toggleViewType = {toggleViewType} />
      )}
      {mainViewType === "timeline" &&
       <DailyView 
      selectedDate={selectedDate} 
      onDateChange={onSelectedDateChanged} 
      onTaskSelect={onTaskSelect}
      toggleViewType = {toggleViewType} />}
    </div>
    </TaskDispathchContext.Provider>
    </TaskStateContext.Provider>
    </>
  );
}

export default MainView;
