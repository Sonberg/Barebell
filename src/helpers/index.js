
import { max } from 'lodash'

// Statistics
export const volym = ({ weight, reps }) => weight * reps;

export const oneRM = ({ weight, reps }) => weight * (36 / (37 - reps));

export const highestOneRM = (sets) => Math.round(max(sets.map(oneRM)) || 0, 2);

export const validSet = ({ weight, reps }) => weight > 0 && reps > 0;

// Weight
export const displayWeight = (weight) => {
    if(!weight) {
        return '-';
    }
    
    if (weight >= 1000) {
        return `${(weight / 1000).toFixed(2).replace(/\.0+$/,'')} ton`;
    }
    
    return `${weight.toFixed(2).replace(/\.0+$/,'')} kg`;
}


// Dates
export const toMoment = (date) => moment(date.toDate ? date.toDate() : new Date(date))

export const inputDate = (date) => toMoment(date).format('YYYY-MM-DD');

export const displayDate = (date) => {
    let val = toMoment(date);
    let daysAgo = moment().diff(val, 'days');

    switch (daysAgo) {
        case 0:
            return val.format(`[Today], D MMM`);
        case 1:
            return val.format(`[Yesterday], D MMM`);
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