<template>
<router-link tag="div" class="p-6 flex flex-col bg-white text-center border" :to="url" v-if="sets && sets.length">
    <div>
        <p v-html="exercise.group" class="uppercase text-xs text-grey-darkest mb-1" />
        <p v-html="exercise.name" class="text-xl" />
    </div>
    <div class="mt-4">
        <correlation-sets class="justify-center" :sets="sets" />
        <trend :data="data" :gradient="['#6574cd']" stroke-width="3" />
    </div>
</router-link>
</template>

<script>
import moment from 'moment';

import {
    db,
    userId
} from '@/api/firebase'

import {
    min,
    max,
    groupBy
} from 'lodash'

import { oneRM, volym, validSet } from '@/helpers'

export default {
    props: {
        exercise: Object
    },
    data: () => ({
        sets: []
    }),
    computed: {
        url() {
            return 'statistics/' + this.exercise.id;
        },
        setsWithoutNullValues() {
            return this.sets.filter(validSet);
        },
        data() {
            let data = Object.values(groupBy(this.setsWithoutNullValues, x => x.workoutId)).map(this.getOneRepMaxFrom);

            while (data.length < 3) {
                data = [0, ...data];
            }

            return data;
        },
    },
    methods: {
        getOneRepMaxFrom(sets) {
            let values = sets
                .map(oneRM)
                .filter(x => !isNaN(x))
                .map(parseInt)

            return max(values);
        },
    },
    firestore() {
        return {
            sets: db
                .collection('sets')
                .where('exerciseId', '==', this.exercise.id)
                .where('userId', '==', userId)
                .limit(20)
        }
    }
}
</script>