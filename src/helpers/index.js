
import { max } from 'lodash'

export const volym = ({ weight, reps }) => weight * reps;

export const oneRM = ({ weight, reps }) => weight * (36 / (37 - reps));

export const highestOneRM = (sets) => Math.round(max(sets.map(oneRM)) || 0, 2);

export const validSet = ({ weight, reps }) => weight > 0 && reps > 0;

export const toMoment = (date) => moment(date.toDate ? date.toDate(): date)