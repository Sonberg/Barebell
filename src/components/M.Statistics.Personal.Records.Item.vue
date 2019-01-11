<template>
<div class="flex flex-row border-t py-4 px-4 justify-start flex-wrap" v-if="sets && sets.length">
    <div class="mx-4 sm:mx-6">
        <p v-html="reps" class="text-4xl font-semibold" />
    </div>
    <div class="mx-4 sm:mx-6">
        <a-label value="Weight" />
        <p v-html="maxLift.weight + ' kg'" class="text-xl" />
    </div>
    <div class="mx-4 sm:mx-6 hidden sm:block">
        <a-label value="1RM" />
        <p v-html="oneRm + ' kg'" class="text-xl" />
    </div>
    <div class="sm:ml-6" v-if="workout">
        <a-label value="Date" />
        <p v-html="date" class="text-xl" />
    </div>
</div>
</template>

<script>
import {
    groupBy,
    max
} from 'lodash'

import {
    oneRM,
    displayDate
} from '@/helpers'

import {
    db
} from '@/api/firebase'

export default {
    props: {
        sets: Array,
        reps: String
    },
    data: () => ({
        workout: null
    }),
    computed: {
        maxLift() {
            return max(this.sets, x => x.weight);
        },
        oneRm() {
            return oneRM(this.maxLift).toFixed(2);
        },
        date() {
            return displayDate(this.workout.date);
        }
    },
    firestore() {
        return {
            workout: db.collection('workouts').doc(this.maxLift.workoutId)
        }
    }
}
</script>
