import { useContext } from "react";
import { TaskStateContext } from "../App";

import "./DailyTaskList.css";

// 선택된 날짜의 Task 필터링
const getSelectedDatePlans = (tasks, selectedDate) => {
  return tasks.
    filter((task) => new Date(task.startDateTime).toLocaleDateString() === selectedDate.toLocaleDateString())
    .sort((a,b)=> String(a.startDateTime).localeCompare(String(b.startDateTime)))
}


function DailyTaskList({ selectedDate }) {
  const plans = useContext(TaskStateContext)
  const tasksForDate = getSelectedDatePlans(plans, selectedDate)

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
            {tasksForDate.map((task, index) => {
              const time = new  Date(task.startDateTime)
              return (
              <li key={index}>
                <div>{time.getHours() < 10 ? '0'+time.getHours() : time.getHours()}:{time.getMinutes() < 10 ? '0'+time.getMinutes(): time.getMinutes()} {task.title}</div>
              </li>
            )})}
          </ul>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default DailyTaskList;