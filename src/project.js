import { isToday, isThisWeek, parseISO } from 'date-fns';

export default function projectFactory(name, id) {
    return {
        id: id || Date.now().toString(),
        name: name,
        tasks: [],
    }
}

