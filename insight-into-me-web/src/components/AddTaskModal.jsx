import { useState, useContext } from "react";
import { TaskDispathchContext } from "../App";
import "./TaskFormModal.css";
import Modal from "./Modal";
import Button from "./Button";
import { TaskType } from "../codes/Type";

function AddTaskModal({ type, onClose }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tags, setTags] = useState("");
  const { onCreate } = useContext(TaskDispathchContext);

  const handleSubmit = () => {
    onCreate(
      type,
      undefined,
      new Date(`${startDate} ${startTime}`).getTime(), 
      new Date(`${endDate} ${endTime}`).getTime(),
      title, false, tags); // 상위 컴포넌트로 Task 전달
      
    onClose(); // 모달 닫기
  };

  return (
    <>
    {type === TaskType.PLAN &&
      <Modal 
      title={<h2>PLAN 추가</h2>}
      content={
        <form>
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
          <div className="form-group datetime">
            <label>시작</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group datetime">
            <label>종료</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
        </form>
        }
        buttons={<><Button onClick={() => onClose()} text={"취소"} type={'CANCEL'}/> <Button onClick={handleSubmit} text={"추가"} type={'PRIMARY'}/></>}
      />
    }

    {type === TaskType.DONE &&
      <Modal 
      title={<h2>DONE 추가</h2>}
      content={
        <form>
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
          <div className="form-group datetime">
            <label>시작</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group datetime">
            <label>종료</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
        </form>
        }
        buttons={<><Button onClick={() => onClose()} text={"취소"} type={'CANCEL'}/> <Button onClick={handleSubmit} text={"추가"} type={'PRIMARY'}/></>}
      />
    }

    {type === TaskType.TODO &&
      <Modal 
      title={<h2>TODO 추가</h2>}
      content={
        <form>
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
          <div className="form-group datetime">
            <label>시작</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group datetime">
            <label>종료</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
        </form>
        }
        buttons={<><Button onClick={() => onClose()} text={"취소"} type={'CANCEL'}/> <Button onClick={handleSubmit} text={"추가"} type={'PRIMARY'}/></>}
      />
    }
    </>
  );
}

export default AddTaskModal;
