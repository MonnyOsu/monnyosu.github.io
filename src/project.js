import { isToday, isThisWeek } from 'date-fns';

export default function projectFactory(name) {
    return {
        id: Date.now().toString(),
        name: name,
        tasks: [],
    }
}


function getTasks() {
    return this.tasks;
}

function getTasksToday(project) {
    return project.tasks.filter((task) => {
        if (isToday(task.dueDate)) {
            return task;
        }
    })
}

function getTasksThisWeek() {
    return this.tasks.filter((task) => {
        if (isThisWeek((task.dueDate), { weekStartsOn: 1 }) === true) {
            return task;
        }
    })
}


export {
    getTasks,
    getTasksToday,
    getTasksThisWeek
}