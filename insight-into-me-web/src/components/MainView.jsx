import { useState } from "react";
import CalendarView from "./CalendarView";
import DailyTaskList from "./DailyTaskList";
import "./MainView.css";

function MainView() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 예제 Task 데이터
  const tasks = [
    { date: "2024-11-25", startTime: "17:00", title: "Dinner with Client" },
    { date: "2024-11-25", startTime: "12:00", title: "낮잠" },
    { date: "2024-11-25", startTime: "12:30", title: "점심식사" },
    { date: "2024-11-25", startTime: "12:30", title: "점심식사" },
    { date: "2024-11-25", startTime: "09:00", title: "Meeting with Team", tag: ["Meeting", "Dinner"] },
    { date: "2024-11-25", startTime: "20:30", title: "운동" },
    { date: "2024-11-26", startTime: "10:00", title: "Conference Call", tag: ["Conference"] },
    { date: "2024-11-26", startTime: "12:00", title: "낮잠" },
    { date: "2024-11-26", startTime: "12:30", title: "점심식사" },
    { date: "2024-11-30", startTime: "07:00", title: "Workout Session", tag: ["Workout", "Study", "Call"] },
  ];

  return (
    <div className="main-view">
      <CalendarView tasks={tasks} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <DailyTaskList tasks={tasks} selectedDate={selectedDate} />
    </div>
  );
}

export default MainView;
