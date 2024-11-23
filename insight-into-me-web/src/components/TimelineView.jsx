import { useEffect, useRef } from "react";
import TimelineTaskItem from "./TimelineTaskItem";
import "./TimelineView.css";

function TimelineView({ tasks, selectedDate }) {
  const timelineRef = useRef(null);
  const nowRef = useRef(null);

  // 선택된 날짜와 현재 시간
  const formattedDate = selectedDate.toLocaleDateString();
  const now = new Date();

  const tasksForDate = tasks
    .filter((task) => new Date(task.date).toLocaleDateString() === formattedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // 시간 표시를 위한 범위 생성
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = `${String(hour).padStart(2, "0")}:00`;
      timeSlots.push(time);
    }
    return timeSlots;
  };
  // 시작 시간을 픽셀 위치로 변환
  const timeToPosition = (time) => {
    const [hour, minute] = time.split(":").map(Number);
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
  }, [tasksForDate]);

    return (
      <div className="timeline-view" ref={timelineRef}>
      {/* 상단 제목 */}
      <div className="timeline-title">{formattedDate}</div>

      <div className="timeline-container">
        <div className="timeline-body" ref={timelineRef}>
          <div className="tasks-left">
            {tasksForDate
              .filter((task) => !task.completed)
              .map((task, index) => {
                const start = timeToPosition(task.startTime);
                const end = timeToPosition(task.endTime);
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
                  task.startTime <= now.toTimeString().split(" ")[0] &&
                  now.toTimeString().split(" ")[0] < task.endTime
                    ? nowRef
                    : null
                }
              >
                <TimelineTaskItem
                  key={index}
                  startTime={task.startTime}
                  title={task.title}
                />
                </div>)
              })}
          </div>

          <div className="timeline-center">
            <div className="timeline-center-line"></div>
            <div className="time-overlay">
              {generateTimeSlots().map((time, index) => (
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
            {tasksForDate
              .filter((task) => task.completed)
              .map((task, index) => {
                const start = timeToPosition(task.startTime);
                const end = timeToPosition(task.endTime);
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
                  task.startTime <= now.toTimeString().split(" ")[0] &&
                  now.toTimeString().split(" ")[0] < task.endTime
                    ? nowRef
                    : null
                }
              >
                <TimelineTaskItem
                  key={index}
                  startTime={task.startTime}
                  title={task.title}
                  isCompleted={true}
                />
                </div>)
          })}
          </div>
        </div>
      </div>
    </div>
    );
}

export default TimelineView;
