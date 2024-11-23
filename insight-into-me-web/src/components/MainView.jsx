import { useState } from "react";
import "./MainView.css";
import MonthlyView from "./MonthlyView";
import DailyView from "./DailyView";

function MainView() {
  const [mainViewType, setMainViewType] = useState("monthly"); // "monthly" 또는 "timeline"
  const [selectedDate, setSelectedDate] = useState(new Date());


  const toggleViewType = () => {
    setMainViewType((prevType) => (prevType === "monthly" ? "timeline" : "monthly"));
  };

  const onSelectedDateChanged = (date) => {
    setSelectedDate(date)
  }

  // 예제 Task 데이터
  const tasks = [
    { date: "2024-11-25", startTime: "17:00", endTime: "19:00", title: "Dinner with Client",completed: false  },
    { date: "2024-11-25", startTime: "12:00", endTime: "13:00",title: "낮잠",completed: true  },
    { date: "2024-11-25", startTime: "12:30", endTime: "13:00",title: "점심식사",completed: true  },
    { date: "2024-11-25", startTime: "12:30", endTime: "12:50",title: "점심식사" ,completed: false   },
    { date: "2024-11-25", startTime: "09:00", endTime: "11:30",title: "Meeting with Team", tag: ["Meeting", "Dinner"] ,completed: false},
    { date: "2024-11-25", startTime: "20:30", endTime: "21:10",title: "운동" ,completed: false},
    { date: "2024-11-26", startTime: "10:00", endTime: "13:00",title: "Conference Call", tag: ["Conference"] ,completed: false},
    { date: "2024-11-26", startTime: "12:00", endTime: "13:00",title: "낮잠" ,completed: true},
    { date: "2024-11-26", startTime: "12:30", endTime: "13:00",title: "점심식사" ,completed: false},
    { date: "2024-11-30", startTime: "07:00", endTime: "10:00",title: "Workout Session", tag: ["Workout", "Study", "Call"],completed: false },
  ];

  return (
    <div className={`main-view ${mainViewType}`}>
      {/* 상단의 ViewType 전환 버튼 */}
      <div className="main-view-type-toggle">
        <button onClick={toggleViewType}>
          {mainViewType === "monthly" ? "Timeline View" : "Monthly View"}
        </button>
      </div>

      {/* 뷰 전환 */}
      {mainViewType === "monthly" && (
      <MonthlyView
          tasks={tasks}
          selectedDate={selectedDate}
          onSelectedDateChanged={onSelectedDateChanged}
          layoutState={mainViewType} />
      )}
      {mainViewType === "timeline" && <DailyView tasks={tasks} selectedDate={selectedDate} />}
    </div>
  );
}

export default MainView;
