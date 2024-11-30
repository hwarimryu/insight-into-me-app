import { useContext } from "react";
import { TaskStateContext } from "../App";

import "./DailyTaskList.css";

function DailyTaskList({ selectedDate }) {
  const plans = useContext(TaskStateContext)
  const formattedDate = selectedDate.toLocaleDateString()

  // 선택된 날짜의 Task 필터링
  const tasksForDate = plans
  .filter((task) => new Date(task.date).toLocaleDateString() === formattedDate)
  .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className = "daily-task-list">
      <h4>{selectedDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  })}</h4>
      <div className="task-list-scroll">
        {tasksForDate.length > 0 ? (
          <ul>
            {tasksForDate.map((task, index) => (
              <li key={index}>
                <strong>{task.startTime}</strong> - {task.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>오늘은 할 일이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default DailyTaskList;