<template>
<div class="bg-white border" v-if="keys && keys.length">
    <div class="px-4">
        <a-title size="xl">Personal records</a-title>
    </div>
    <div class="border-t-4">
        <m-statistics-personal-records-item v-for="key in keys" :key="key" :reps="key" :sets="groupedByReps[key]"/>
    </div>
</div>
</template>

<script>

import {
    groupBy
} from 'lodash'

import { validSet } from '@/helpers'

export default {
    props: {
        sets: Array
    },
    computed: {
        groupedByReps() {
            let sets = this.sets.filter(validSet).filter(x => x.reps <= 10);

            return groupBy(sets, x => x.reps);
        },
        keys() {
            return Object.keys(this.groupedByReps);
        }
    }
}
</script>