
const getTasksAtDate = (formattedDate, tasks) => {
    return tasks.filter((task) => new Date(task.startDateTime).toLocaleDateString() === formattedDate)
    .sort((a, b) => new Date(a.startDateTime) < new Date(b.startDateTime));
}

const formattedDate = (date) => {
    return date;
}

  // 시간 표시를 위한 범위 생성
const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 0; hour <= 24; hour++) {
      const time = `${String(hour).padStart(2, "0")}:00`;
      timeSlots.push(time);
    }
    return timeSlots;
};
    
export {getTasksAtDate, formattedDate, generateTimeSlots};