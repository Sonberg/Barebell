<template>
<div class="flex flex-col" v-if="keys && keys.length">
    <a-title size="2xl" class="mb-2 mt-8">Personal records</a-title>
    <m-statistics-personal-records-item v-for="key in keys" :key="key" :reps="key" :sets="groupedByReps[key]" />
</div>
</template>

<script>
import {
    groupBy
} from 'lodash'

import {
    validSet
} from '@/helpers'

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
