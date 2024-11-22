import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import CalendarView from "./CalendarView";
import DailyTaskList from "./DailyTaskList";
import "./MainView.css";

function MainView() {
  const [layoutState, setLayoutState] = useState("full"); // "full" 또는 "split"
  const [selectedDate, setSelectedDate] = useState(new Date());
 // 스와이프 동작 핸들러
 const swipeHandlers = useSwipeable({
    onSwipedUp: () => setLayoutState("split"), // 위로 스와이프 → "split" 상태
    onSwipedDown: () => setLayoutState("full"), // 아래로 스와이프 → "full" 상태
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // 마우스 드래그 동작도 지원
  });

  const onSelectedDateChanged = (date) => {
    setSelectedDate(date)
  }

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
    <div {...swipeHandlers} className={`main-view ${layoutState}`}>
      {/* CalendarView */}
        <CalendarView layoutState = {layoutState} tasks={tasks} onSelectedDateChanged={onSelectedDateChanged} />
      {/* DailyTaskList */}
        <DailyTaskList layoutState = {layoutState} tasks={tasks} selectedDate={selectedDate} />
    </div>
  );
}

export default MainView;
