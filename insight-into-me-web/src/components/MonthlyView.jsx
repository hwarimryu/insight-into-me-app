import { useState } from "react";
import { useSwipeable } from "react-swipeable";

import CalendarView from "./CalendarView";
import DailyTaskList from "./DailyTaskList";
import "./MonthlyView.css";

function MonthlyView({selectedDate, onSelectedDateChanged, toggleViewType }) {
  const [layoutState, setLayoutState] = useState("full"); // "full", "split", "task-only"
    // 상태 업데이트 함수
  const updateLayoutState = (direction) => {
    if (direction === "up") {
      if (layoutState === "full") setLayoutState("split");
      else if (layoutState === "split") setLayoutState("task-only");
    } else if (direction === "down") {
      if (layoutState === "task-only") setLayoutState("split");
      else if (layoutState === "split") setLayoutState("full");
    }
  };

  // Swipeable 설정
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => updateLayoutState("up"), // 위로 스와이프 → "split" 상태
    onSwipedDown: () => updateLayoutState("down"), // 아래로 스와이프 → "full" 상태
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // 마우스 드래그로도 동작
  });

  return (
    <div {...swipeHandlers} className={`monthly-view ${layoutState}`}>
        <CalendarView
          selectedDate={selectedDate}
          onSelectedDateChanged={onSelectedDateChanged}
          layoutState={layoutState}
          toggleViewType={toggleViewType}
        />
      {layoutState !== "full" && (<DailyTaskList selectedDate={selectedDate} />)}
    </div>
  );
}

export default MonthlyView;