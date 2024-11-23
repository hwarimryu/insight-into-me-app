import "./TaskFormModal.css";

function TaskFormModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Task 추가</h2>
        <form>
          <div className="form-group">
            <label>Task 제목</label>
            <input type="text" placeholder="Task 제목 입력" />
          </div>
          <div className="form-group">
            <label>시작 일시</label>
            <input type="datetime-local" />
          </div>
          <div className="form-group">
            <label>종료 일시</label>
            <input type="datetime-local" />
          </div>
          <div className="form-group">
            <label>태그</label>
            <input type="text" placeholder="태그 입력 (쉼표로 구분)" />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
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
