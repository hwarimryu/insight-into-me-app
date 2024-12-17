import { useEffect, useRef, useState, useContext } from "react";
import { TaskStateContext, DoneStateContext } from "../App";
import TimelineTaskItem from "./TimelineTaskItem";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./TimelineView.css";
import Button from "./Button";
import Header from "./Header";
import { getTasksAtDate, generateTimeSlots } from "../utils/DateTimeUtil";

function TimelineView({ selectedDate, onDateChange, onTaskSelect, toggleViewType }) {
  const plans = useContext(TaskStateContext);
  const dones = useContext(DoneStateContext);
  const timelineRef = useRef(null);
  const nowRef = useRef(null);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // 선택된 날짜와 현재 시간
  const formattedDate = selectedDate.toLocaleDateString();
  const now = new Date();

  const palnsForDate = getTasksAtDate(formattedDate, plans);
  const donesForDate = getTasksAtDate(formattedDate, dones);

  // 시간 표시를 위한 범위 생성
  const timeSlots = generateTimeSlots();

  // 시작 시간을 픽셀 위치로 변환
  const timeToPosition = (time) => {
    const [hour, minute] = new Date(time).toTimeString().split(":").map(Number);
    const hourHeight = 80; // 1시간에 80px
    const minuteHeight = hourHeight / 60; // 1분에 해당하는 높이
    return 40 + hour * hourHeight + minute * minuteHeight;
  };
  
  // 현재 시간을 픽셀 위치로 변환
  const nowPosition = timeToPosition(
    `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
  );

  // 현재 시간을 타임라인의 중심에 위치시킴
  useEffect(() => {
    if (nowRef.current) {
      nowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [palnsForDate]);

  console.log(donesForDate);
    return (
      <div className="timeline-view" ref={timelineRef}>
      {/* 상단 제목 */}
      <Header title={
        <div className="timeline-title">
        <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
        {formattedDate}
        </button>
          {isDatePickerOpen && (
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                onDateChange(date);
                setIsDatePickerOpen(false);
              }}
              inline
            />
          )}
        </div>
      }
      rightChild={<Button text={"monthly view"} type={"PRIMARY"} onClick={toggleViewType}/>}/>
    

      <div className="timeline-container">
        <div className="timeline-body" ref={timelineRef}>
          <div className="tasks-left">
            {palnsForDate
              .map((task, index) => {
                const start = timeToPosition(task.startDateTime);
                const end = timeToPosition(task.endDateTime);
                const height = end - start;
                return (
                <div
                  key={index}
                  className="task-block"
                  style={{
                    top: `${start}px`,
                    height: `${height}px`,
                  }}                
                  ref={
                  new Date(task.startDateTime).toTimeString() <= now.toTimeString().split(" ")[0] &&
                  now.toTimeString().split(" ")[0] <new Date(task.endDateTime).toTimeString()
                    ? nowRef
                    : null
                  }
                  onClick={() => onTaskSelect(task)} >
                <TimelineTaskItem
                  key={index}
                  startTime={task.startDateTime}
                  title={task.title}
                />
                </div>)
              })}
          </div>

          <div className="timeline-center">
            <div className="timeline-center-line"></div>
            <div className="time-overlay">
              {timeSlots.map((time, index) => (
                <div key={index} className="time-slot">
                  {time}
                </div>
              ))}
              {/* 현재 시간 마커 */}
              <div
                className="current-time-marker"
                style={{ top: `${nowPosition}px` }}
                ref={nowRef}
              />
            </div>
          </div>

          <div className="tasks-right">
            {
            
            donesForDate
              .map((task, index) => {
                const start = timeToPosition(task.startDateTime);
                const end = timeToPosition(task.endDateTime);
                const height = end - start;
                
                return (
                <div
                  key={index}
                  className="task-block"
                  style={{
                    top: `${start}px`,
                    height: `${height}px`,
                  }}                
                  ref={
                    new Date(task.startDateTime).toTimeString() <= now.toTimeString().split(" ")[0] &&
                    now.toTimeString().split(" ")[0] <new Date(task.endDateTime).toTimeString()
                    ? nowRef
                    : null
                }
                onClick={() => onTaskSelect(task)} >
                <TimelineTaskItem
                  key={index}
                  startTime={task.startDateTime}
                  title={task.title}
                  isCompleted={true}
                />
                </div>)
          })}

           {/* TaskDetailsModal */}
          {/* {selectedTask && (
          <TaskDetailsModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onComplete={onCompleteTask}
          />
          )} */}
          </div>
        </div>
      </div>
    </div>
    );
}

export default TimelineView;