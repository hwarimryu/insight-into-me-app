import TimelineView from "./TimelineView";
import "./DailyView.css";

function DailyView({selectedDate, onDateChange, onTaskSelect, toggleViewType }) {
  return (
    <div className="daily-view">
      <TimelineView selectedDate={selectedDate} onDateChange={onDateChange} onTaskSelect={onTaskSelect} toggleViewType = {toggleViewType}/>
    </div>
  );
}

export default DailyView;
