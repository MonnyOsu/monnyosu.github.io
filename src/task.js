import { formatDistanceToNow, parseISO } from 'date-fns';


export default function taskFactory(name, dueDate) {
    return {
        id: Date.now().toString(),
        name: name,
        dueDate: dueDate,
        complete: false,
    }
}

function getDueDateLengthDays(task) {
    return `Due in ${formatDistanceToNow(parseISO(task.dueDate))}`;
}

export {

    getDueDateLengthDays
}

