import { formatDistanceToNow, parseISO, isPast } from 'date-fns';


export default function taskFactory(name, dueDate) {
    return {
        id: Date.now().toString(),
        name: name,
        dueDate: dueDate,
        complete: false,
    }
}

function getDueDateLengthDays(task) {
    if (isPast(parseISO(task.dueDate))) {
        return `Due ${formatDistanceToNow(parseISO(task.dueDate))} ago`
    } else {
        return `Due in ${formatDistanceToNow(parseISO(task.dueDate))}`
    }
}


export {
    getDueDateLengthDays
}
