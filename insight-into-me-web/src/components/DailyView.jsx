import TimelineView from "./TimelineView";
import "./DailyView.css";

function DailyView({ tasks, selectedDate, onDateChange, onCompleteTask }) {
  return (
    <div className="daily-view">
      <TimelineView tasks={tasks} selectedDate={selectedDate} onDateChange={onDateChange} onCompleteTask={onCompleteTask}/>
    </div>
  );
}

export default DailyView;
