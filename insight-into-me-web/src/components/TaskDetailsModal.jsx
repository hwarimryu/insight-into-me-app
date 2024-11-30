import { useEffect, useContext } from "react";
import "./TaskDetailsModal.css";
import { TaskDispathchContext } from "../App";

function TaskDetailsModal({ task, onClose }) {
  const {onComplete} = useContext(TaskDispathchContext)
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);
  
  const handleComplete = () => {
      onComplete(task.id); // 완료 상태 업데이트
      onClose(); // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Task Details</h2>
        <div className="task-details">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Start Time:</strong> {task.startTime}</p>
          <p><strong>End Time:</strong> {task.endTime}</p>
          <p><strong>Tags:</strong> {task.tags?.join(", ")}</p>
          <p><strong>Completed:</strong> {task.completed ? "Yes" : "No"}</p>
        </div>
        <div className="modal-buttons">
          <button 
          className="complete-button" 
          onClick={handleComplete} 
          disabled={task.completed} >
            {task.completed ? "Completed" : "Mark as Complete"}
          </button>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;
