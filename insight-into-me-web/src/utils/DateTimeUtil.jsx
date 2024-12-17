
const getTasksAtDate = (formattedDate, tasks) => {
  console.log(formattedDate)
  

    return tasks.filter((task) => {
      console.log(task.title + " "+new Date(task.startDateTime).toLocaleDateString())
      return new Date(task.startDateTime).toLocaleDateString() === formattedDate

    })
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

const getDateTimeStringForModal = (dateTime) => {
  const date = dateTime.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    })

  const time = getTimeString(dateTime)
  return date + " " + time;
}

const getTimeString = (dateTime) => {
  const time = new Date(dateTime);
  return `${time.getHours() < 10 ? '0'+time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0'+time.getMinutes(): time.getMinutes()}`;
}
    
export {getTasksAtDate, formattedDate, generateTimeSlots, getDateTimeStringForModal};