import "./TaskList.css";

function TaskList({ tasks, selectedDate }) {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2 className="selected-date">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <p className="no-tasks-message">No tasks for this date.</p>
      </div>
    );
  }

  // 시작 시간 기준으로 정렬
  const sortedTasks = tasks.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  return (
    <div className="task-list">
      <h2 className="selected-date">
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>
      <ul>
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <div className="task-details">
              <strong>{task.text}</strong>
              <p>
                Start: {new Date(task.startDate).toLocaleString()} <br />
                End: {new Date(task.endDate).toLocaleString()}
              </p>
              <p>
                <strong>Tags:</strong> {task.tags.join(", ")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;