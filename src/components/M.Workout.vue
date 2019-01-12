<template>
<div class="p-4 mb-2 flex flex-row justify-between bg-white border items-start">
    <div>
        <router-link :to="'/workouts/' + item.id" tag="p" v-html="name" class="text-xl m-0 font-semibold" />
        <p class="mt-2 text-sm" v-if="exerciseNames && exerciseNames.length">{{displayArray(exerciseNames)}}</p>
    </div>
    <p v-html="displayDate(item.date)" class="m-0 text-xs uppercase text-grey-dark" />
</div>
</template>

<script>
import {
    db
} from '@/api/firebase'

import {
    toMoment,
    displayDate,
    displayArray
} from '@/helpers'

import {
    uniq
} from 'lodash'

export default {
    props: {
        item: Object
    },
    data: () => ({
        exercises: [],
        displayDate,
        displayArray
    }),
    computed: {
        name() {
            return this.item.name || displayArray(this.groups) || 'Workout'
        },
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
