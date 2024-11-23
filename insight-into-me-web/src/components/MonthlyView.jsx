import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import CalendarView from "./CalendarView";
import DailyTaskList from "./DailyTaskList";
import "./MonthlyView.css";

function MonthlyView({ tasks, selectedDate, onSelectedDateChanged }) {
  const [layoutState, setLayoutState] = useState("full"); // "full" 또는 "split"


  // Swipeable 설정
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setLayoutState("split"), // 위로 스와이프 → "split" 상태
    onSwipedDown: () => setLayoutState("full"), // 아래로 스와이프 → "full" 상태
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // 마우스 드래그로도 동작
  });

  return (
    <div {...swipeHandlers} className={`monthly-view ${layoutState}`}>
        <CalendarView
          tasks={tasks}
          selectedDate={selectedDate}
          onSelectedDateChanged={onSelectedDateChanged}
          layoutState={layoutState}
        />
        <DailyTaskList tasks={tasks} selectedDate={selectedDate} />
    </div>
  );
}

export default MonthlyView;