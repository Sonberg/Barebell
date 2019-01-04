<template>
<div class="flex flex-row border-t py-4 px-8 justify-start flex-wrap" v-if="sets && sets.length">
    <div class="mr-16 my-2">
        <v-label value="reps" />
        <p v-html="reps" class="text-xl" />
    </div>
    <div class="mr-16 my-2">
        <v-label value="Weight" />
        <p v-html="maxLift.weight" class="text-xl" />
    </div>

    <div class="mr-16 my-2">
        <v-label value="1RM" />
        <p v-html="oneRm" class="text-xl" />
    </div>

    <div class=" my-2">
        <v-label value="Date" />
        <p v-html="oneRm" class="text-xl" />
    </div>
</div>
</template>

<script>
import {
    groupBy,
    max
} from 'lodash'

import {
    oneRM
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
        }
    },
    firestore() {
        return {
            workout: db.collection('workouts').doc(this.maxLift.workoutId)
        }
    }
}
</script>
