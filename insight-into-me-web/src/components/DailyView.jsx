import TimelineView from "./TimelineView";
import "./DailyView.css";

function DailyView({ tasks, selectedDate }) {
  return (
    <div className="daily-view">
      <TimelineView tasks={tasks} selectedDate={selectedDate} />
    </div>
  );
}

export default DailyView;
