<template>
<div class="bg-white border" v-if="keys && keys.length">
    <div class="border-b-4 p-4">
        <v-title :size="2">Personal records</v-title>
    </div>
    <div class="">
        <div v-for="key in keys" :key="key" class="flex flex-row border-t py-4 px-8">
            <div>
                <v-label value="reps"/>
                <p v-html="key" class="text-xl" />
            </div>
            <div class="ml-8">
                <v-label value="Weight"/>
                <p v-html="maxWeight(groupedByReps[key])" class="text-xl" />
            </div>

            <div class="ml-8">
                <v-label value="1RM"/>
                <p v-html="maxWeight(groupedByReps[key])" class="text-xl" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    db,
    userId
} from '@/api/firebase'

import {
    groupBy,
    max
} from 'lodash'

import { validSet } from '@/helpers'

export default {
    props: {
        exerciseId: String
    },
    data: () => ({
        sets: []
    }),
    computed: {
        groupedByReps() {
            return groupBy(this.sets.filter(validSet), x => x.reps);
        },
        keys() {
            return Object.keys(this.groupedByReps);
        }
    },
    methods: {
        maxWeight(sets) {
            if (!sets) {
                return 0;
            }

            return max(sets.map(x => x.weight));
        }
    },
    firestore() {
        return {
            sets: db
                .collection('sets')
                .where('exerciseId', '==', this.exerciseId)
                .where('reps', '<=', 10)
                .where('userId', '==', userId)
        }
    }
}
</script>

<style>

</style>
