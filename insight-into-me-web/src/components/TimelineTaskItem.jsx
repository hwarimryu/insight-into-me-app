import "./TimelineTaskItem.css";

function TimelineTaskItem({ title, isCompleted, onClick }) {
  return (
    <div className={`task-item ${isCompleted? 'completed': null}`} onClick={() => onClick()}>
      <span className="task-title">{title}</span>
    </div>
  );
}

export default TimelineTaskItem;