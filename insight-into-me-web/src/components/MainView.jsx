import { useState } from "react";
import "./MainView.css";
import MonthlyView from "./MonthlyView";
import DailyView from "./DailyView";

function MainView({tasks, onCompleteTask}) {
  const [mainViewType, setMainViewType] = useState("monthly"); // "monthly" 또는 "timeline"
  const [selectedDate, setSelectedDate] = useState(new Date());


  const toggleViewType = () => {
    setMainViewType((prevType) => (prevType === "monthly" ? "timeline" : "monthly"));
  };

  const onSelectedDateChanged = (date) => {
    setSelectedDate(date)
  }

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
      {mainViewType === "timeline" && <DailyView tasks={tasks} selectedDate={selectedDate} onDateChange={onSelectedDateChanged} onCompleteTask={onCompleteTask}/>}
    </div>
  );
}

export default MainView;
