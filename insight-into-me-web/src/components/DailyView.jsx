import TimelineView from "./TimelineView";
import "./DailyView.css";

function DailyView({ tasks, selectedDate, onDateChange }) {
  return (
    <div className="daily-view">
      <TimelineView tasks={tasks} selectedDate={selectedDate} onDateChange={onDateChange}/>
    </div>
  );
}

export default DailyView;
