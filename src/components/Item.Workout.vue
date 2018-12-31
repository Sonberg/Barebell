<template>
<div class="px-8 py-6 mb-2 flex flex-row justify-between bg-white border">
    <div>
        <p v-html="formatDate(item.date)" class="m-0 text-xs uppercase text-grey-dark" />
        <router-link :to="'/workouts/' + item.id" tag="p" v-html="item.name || displayArray(groups) || 'Workout'" class="text-xl mt-2 font-semibold" />
        <p class="mt-2 text-sm">{{displayArray(exerciseNames)}}</p>
    </div>
</div>
</template>

<script>
import moment from 'moment';

import {
    db
} from '@/api/firebase'

import {
    uniq
} from 'lodash'

export default {
    props: {
        item: Object
    },
    data: () => ({
        exercises: []
    }),
    methods: {
        formatDate(date) {
            return moment(date).format('Y-MM-DD')
        },
        displayArray(arr) {
            
            if (arr.length == 1) {
                return arr[0];
            }

            let val = arr.splice(0, arr.length - 1).join(', ');

            if (!arr.length) {
                return val;
            }         
            return `${val} & ${arr[0]}`;
        }
    },
    computed: {
        workoutExercises() {
            return this.exercises.filter(x => this.item.exercises.indexOf(x.id) != -1);
        },
        groups() {
            return uniq(this.workoutExercises.map(x => x.group))
        },
        exerciseNames() {
            return uniq(this.workoutExercises.map(x => x.name))
        }
    },
    firestore() {
        return {
            exercises: db.collection('exercises')
        }
    }
}
</script>
