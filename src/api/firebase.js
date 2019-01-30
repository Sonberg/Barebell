import firebase from 'firebase'
import moment from 'moment'
import { uniq } from 'lodash'

firebase.initializeApp({
    apiKey: "AIzaSyD-zJ5FmIWSHtweHcRvZGb3NFEIZiK6EQI",
    authDomain: "barebell-c8a61.firebaseapp.com",
    databaseURL: "https://barebell-c8a61.firebaseio.com",
    projectId: "barebell-c8a61",
    storageBucket: "barebell-c8a61.appspot.com",
    messagingSenderId: "343022263121"
});

export const db = firebase.firestore();
export const auth = firebase.auth();
export const settings = { timestampsInSnapshots: true };
export let userId = null;

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
auth.onAuthStateChanged(x =>  userId = auth.currentUser && auth.currentUser.uid);

db.settings(settings);
//db.enablePersistence();

// Set
export const createSet = ({ exerciseId, workoutId, reps, weight, setType }) => db.collection('sets').add({
    exerciseId,
    workoutId,
    setType,
    userId,
    reps,
    weight,
    created: moment().toDate(),
    updated: null,
});

export const updateSet = ({ id, weight, reps, setType }) => db.collection('sets').doc(id).update({ 
    reps,
    weight,
    setType,
    updated: moment().format() 
    });

export const deleteSet = (id) => db.collection('sets').doc(id).delete();


// Log
export const createLog = ({ exerciseIds, workoutId, logType }) => db.collection('logs').add({
    exerciseIds: exerciseIds || [],
    workoutId,
    userId,
    logType,
    created: moment().toDate(),
    updated: null
});
export const updateLog = ({ id, exerciseIds, workoutId, logType }) => db.collection('logs').doc(id).update({
    userId,
    logType,
    workoutId,
    exerciseIds,
    updated: moment().toDate() 
});
export const deleteLog = (id) => db.collection('logs').doc(id).delete();

// Workout
export const createWorkout = ({ name, exercises, note } = {}) => db.collection('workouts').add({ 
    userId, 
    name: name || '', 
    note: note || '',
    exercises: uniq(exercises || []), 
    date: moment().toDate(),
    created: moment().toDate() 
});

export const updateWorkout = ({ id, name, date, note, exercises }) => db.collection('workouts').doc(id).update({ 
    userId, 
    name: name || '', 
    exercises: uniq(exercises || []), 
    note: note || '',
    date: date || moment().toDate()
});

export const deleteWorkout = (id) => db.collection('workouts').doc(id).delete();
