
const getTasksAtDate = (formattedDate, tasks) => {
    return tasks.filter((task) => new Date(task.date).toLocaleDateString() === formattedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));}

    
export {getTasksAtDate};