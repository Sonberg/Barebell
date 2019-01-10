<template>
<div class="flex flex-row border-t py-4 px-8 justify-start flex-wrap" v-if="sets && sets.length">
    <div class="w-1/2 md:w-1/4 my-2 text-center">
        <a-label value="reps" />
        <p v-html="reps" class="text-xl" />
    </div>
    <div class="w-1/2 md:w-1/4 my-2 text-center">
        <a-label value="Weight" />
        <p v-html="maxLift.weight" class="text-xl" />
    </div>

    <div class="w-1/2 md:w-1/4 my-2 text-center">
        <a-label value="1RM" />
        <p v-html="oneRm" class="text-xl" />
    </div>

    <div class="w-1/2 md:w-1/4 my-2 text-center" v-if="workout">
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
