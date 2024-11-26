import { useState } from "react";
import "./TaskFormModal.css";

function TaskFormModal({ onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 새 Task 데이터 생성
    const newTask = {
      id: Date.now(),
      title,
      startTime: new Date(start).toLocaleTimeString(),
      endTime:  new Date(end).toLocaleTimeString(),
      tags: tags.split(",").map((tag) => tag.trim()), // 쉼표로 구분된 태그 배열
      date: new Date(start).toLocaleDateString(), // Task의 날짜
    };

    console.log(newTask)
    onAddTask(newTask); // 상위 컴포넌트로 Task 전달
    onClose(); // 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Task 추가</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              placeholder="Task 제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>시작</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>종료</label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>#태그</label>
            <input
              type="text"
              placeholder="태그 입력 (쉼표로 구분)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
            >
              취소
            </button>
            <button type="submit" className="add-button">
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskFormModal;
