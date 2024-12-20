import { TaskType } from "../codes/Type";

const getDoneTask = ( {plan, startDateTime, endDateTime }) => {
    return {
        type: TaskType.DONE,
        planId: plan.id,
        startDateTime: startDateTime === undefined ? plan.startDateTime : startDateTime,
        endDateTime: endDateTime === undefined ? plan.endDateTime : endDateTime,
        completed: true,
        title: plan.title,
        tags: plan.tags,
    }
}

export {getDoneTask};