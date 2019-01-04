<template>
<div class="bg-white border" v-if="keys && keys.length">
    <div class="border-b-4 p-4">
        <v-title :size="2">Personal records</v-title>
    </div>
    <div>
        <statistics-personal-records-item v-for="key in keys" :key="key" :reps="key" :sets="groupedByReps[key]"/>
    </div>
</div>
</template>

<script>
import {
    db,
    userId
} from '@/api/firebase'

import {
    groupBy
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