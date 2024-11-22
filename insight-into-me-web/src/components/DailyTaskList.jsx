import "./DailyTaskList.css";

function DailyTaskList({ tasks, selectedDate }) {
  const formattedDate = selectedDate.toLocaleDateString()

  // 선택된 날짜의 Task 필터링
  const tasksForDate = tasks
  .filter((task) => new Date(task.date).toLocaleDateString() === formattedDate)
  .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="daily-task-list">
      <h3>{formattedDate}의 Task</h3>
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