import { useState } from "react";
import "./MainView.css";
import MonthlyView from "./MonthlyView";
import DailyView from "./DailyView";


function MainView({onTaskSelect}) {
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
  );
}

export default MainView;
