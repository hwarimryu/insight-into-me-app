import TimelineView from "./TimelineView";
import "./DailyView.css";

function DailyView({ tasks, selectedDate, onDateChange, onTaskSelect }) {
  return (
    <div className="daily-view">
      <TimelineView tasks={tasks} selectedDate={selectedDate} onDateChange={onDateChange} onTaskSelect={onTaskSelect}/>
    </div>
  );
}

export default DailyView;
