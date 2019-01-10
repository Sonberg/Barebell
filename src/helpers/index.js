
import { max } from 'lodash'

// Statistics
export const volym = ({ weight, reps }) => weight * reps;

export const oneRM = ({ weight, reps }) => weight * (36 / (37 - reps));

export const highestOneRM = (sets) => Math.round(max(sets.map(oneRM)) || 0, 2);

export const validSet = ({ weight, reps }) => weight > 0 && reps > 0;

// Dates
export const toMoment = (date) => moment(date.toDate ? date.toDate() : new Date(date))

export const inputDate = (date) => toMoment(date).format('YYYY-MM-DD');

export const displayDate = (date) => {
    let val = toMoment(date);
    let daysAgo = moment().diff(val, 'days');

    if (daysAgo < 3) {
        return val.format(`[${!daysAgo ? 'Today': 'Yesterday'}], D MMM`);
    }
    
    return val.format('YYYY-MM-DD');
}

// Array
export const displayArray = (arr) => {
            
    if (arr.length == 1) {
        return arr[0];
    }

    let val = arr.splice(0, arr.length - 1).join(', ');

    if (!arr.length) {
        return val;
    }    

    return `${val} & ${arr[0]}`;
}