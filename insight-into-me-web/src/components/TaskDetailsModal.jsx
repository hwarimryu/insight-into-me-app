import { useEffect, useContext } from "react";
import "./TaskDetailsModal.css";
import { TaskDispathchContext } from "../App";
import CommonModal from "./common/Modal";
import Button from "./ButtonCustom";
import {getDateTimeStringForModal} from "../utils/DateTimeUtil"
import { TaskType } from "../codes/Type";

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

  const handleReview = () => {
    // onComplete(task.id); // 완료 상태 업데이트
    onClose(); // 모달 닫기
};

  return (
    <>
    {task.type === TaskType.PLAN && <CommonModal
      title={<h2> {task.title} </h2>}
      content={
        <div className="task-details">
          <p> 시작: {getDateTimeStringForModal(new Date(task.startDateTime))} </p>
          <p> 종료: {getDateTimeStringForModal(new Date(task.endDateTime))}</p>
          <p>{task.completed ? "완료" : "미완료"}</p>
          <p>Tags: {task.tags?.join(", ")}</p>
        </div>
      }
      buttons={<><Button onClick={() => onClose()} text={"닫기"} type={'CANCEL'}/> <Button onClick={handleComplete} text={"완료"} type={'PRIMARY'}/></>}
    />}

    {task.type === TaskType.DONE && <CommonModal
      title={<h2> {task.title} </h2>}
      content={
        <div className="task-details">
          <p> 시작: {getDateTimeStringForModal(new Date(task.startDateTime))} </p>
          <p> 종료: {getDateTimeStringForModal(new Date(task.endDateTime))}</p>
          <p>{task.completed ? "완료" : "미완료"}</p>
          <p>Tags: {task.tags?.join(", ")}</p>
        </div>
      }
      buttons={<><Button onClick={() => onClose()} text={"닫기"} type={'CANCEL'}/> <Button onClick={handleReview} text={"리뷰"} type={'PRIMARY'}/></>}
    />}
    {/* <div className="modal-overlay">
      <div className="modal-content">
        <h2>Task Details</h2>
        <div className="task-details">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Start Time:</strong> {task.startDateTime}</p>
          <p><strong>End Time:</strong> {task.endDateTime}</p>
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
          <button className="close-button" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </div> */}
    </>
  );
}

export default TaskDetailsModal;
