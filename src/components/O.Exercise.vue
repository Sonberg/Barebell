<template>
<div class="mt-4 bg-white border" v-if="item">
    <div class="px-4 flex flex-row  justify-between items-center" @click="toggle">
        <a-title size="xl" v-html="item.name"/>
        <div class="flex flex-row" v-if="false">
            <div class="hidden sm:flex flex-col">
                <a-label value="Number of sets"/>
                <p v-html="sets.length || 0" />
            </div>
            <p label="Total volym" class="mr-4" tag="p" :value="volym" disabled />
            <p label="Highest 1RM" tag="p" :value="oneMax" disabled />
        </div>
    </div>
    <div v-if="open" class="border-t-4">
        <m-exercise-set v-for="(set, index) in sets" :item="set" :index="index + 1" :key="set.id" />

        <div class="flex flex-row justify-between p-4 border-t">
            <div></div>
            <div class="flex flex-row">
                <a-icon-button name="edit" tag="router-link" class="mr-2" :to="editLink">
                    Edit
                </a-icon-button>
                <a-icon-button tag="router-link" name="chart-line" class="mr-2" :to="statisticsLink">
                    Statistics
                </a-icon-button>
                <a-icon-button name="plus" @click="add">
                    Add set
                </a-icon-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    db,
    userId,
    createSet
} from '@/api/firebase'

import {
    max
} from 'lodash'

import {
    oneRM,
    volym
} from '@/helpers'

import moment from 'moment';

export default {
    props: {
        item: Object,
        workoutId: String
    },
    data: () => ({
        sets: [],
        open: true
    }),
    computed: {
        volym() {
            return this.sets
                .map(volym)
                .filter(x => !isNaN(x))
                .reduce((res, x) => res + x, 0);
        },
        oneMax() {
            let values = this.sets
                .map(oneRM)
                .filter(x => !isNaN(x))

            return (max(values) || 0).toFixed(2);
        },
        editLink() {
            return `/workouts/${this.workoutId}/sets/${this.item.id}`
        },
        statisticsLink() {
            return `/statistics/${this.item.id}`
        }
    },
    methods: {
        async add() {
            let result = await createSet({
                exerciseId: this.item.id,
                workoutId: this.$route.params.workout_id
            });
        },
        toggle() {
            this.open = !this.open;
        }
    },
    firestore() {
        return {
            sets: db
                .collection('sets')
                .where('exerciseId', '==', this.item.id)
                .where('workoutId', '==', this.workoutId)
                .where('userId', '==', userId)
                .orderBy('created')
        }
    },
}
</script>
