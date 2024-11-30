import TimelineView from "./TimelineView";
import "./DailyView.css";

function DailyView({ tasks, selectedDate, onDateChange, onTaskSelect, toggleViewType }) {
  return (
    <div className="daily-view">
      <TimelineView tasks={tasks} selectedDate={selectedDate} onDateChange={onDateChange} onTaskSelect={onTaskSelect} toggleViewType = {toggleViewType}/>
    </div>
  );
}

export default DailyView;
