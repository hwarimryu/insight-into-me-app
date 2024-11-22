import { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import "./TaskFormModal.css";

Modal.setAppElement("#root");

function TaskFormModal({ isOpen, onClose, addTask }) {
  const [text, setText] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && startDate && endDate) {
      addTask({
        id: Date.now(),
        text,
        startDate,
        endDate,
        tags,
        completed: false,
      });
      setText("");
      setStartDate(new Date());
      setEndDate(new Date());
      setTags([]);
      onClose();
    }
  };

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="modal-title">Add Task</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task description"
          className="modal-input"
        />
        <div className="modal-field">
          <label>Start Date & Time:</label>
          <DateTimePicker value={startDate} onChange={setStartDate} />
        </div>
        <div className="modal-field">
          <label>End Date & Time:</label>
          <DateTimePicker value={endDate} onChange={setEndDate} />
        </div>
        <div className="modal-field">
          <label>Tags:</label>
          <div className="tag-input-container">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInput}
              onKeyPress={handleTagKeyPress}
              placeholder="Press Enter to add a tag"
              className="tag-input"
            />
            <div className="tags-list">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button
                    type="button"
                    className="remove-tag-button"
                    onClick={() => removeTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <button type="submit" className="modal-button">
            Add Task
          </button>
          <button type="button" onClick={onClose} className="modal-button cancel">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskFormModal;