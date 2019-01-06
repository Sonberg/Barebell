<template>
<div class="mt-4 bg-white border" v-if="item">
    <div class="py-2 px-4 flex flex-row  justify-between items-center">
        <div class="flex flex-1" @click="toggle">
            <p class="text-lg my-4 font-semibold" v-html="item.name" />
        </div>
        <div class="flex flex-row">
            <button @click="add" class="flex flex-row items-center bg-indigo-dark hover:bg-indigo text-white p-2"><v-icon name="plus"/></button>
        </div>
    </div>
    <div v-if="open" class="border-t-4">
        <div class="flex flex-row p-4 flex-wrap items-center justify-between">
            <div class="flex">
                <div class="hidden sm:flex">
                    <a-input label="Number of sets" class="mr-4" tag="p" :value="sets.length || 0" disabled />
                </div>
                <a-input label="Total volym" class="mr-4" tag="p" :value="volym" disabled />
                <a-input label="Highest 1RM" tag="p" class="mr-4" :value="oneMax" disabled />
            </div>
            <div class="flex my-2">
                <a-button tag="router-link" class="mr-2" :to="editLink">
                    <v-icon name="edit" class="sm:mr-2" />
                    <span class="hidden sm:flex">Edit</span>
                </a-button>

                <a-button tag="router-link" :to="statisticsLink">
                    <v-icon name="chart-line" class="sm:mr-2" />
                    <span class="hidden sm:flex">Statistics</span>
                </a-button>
            </div>
        </div>
        <item-set v-for="(set, index) in sets" :item="set" :index="index + 1" :key="set.id" />
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

            console.log(result);

        },
        getOneMax(weight, reps) {
            return weight * (36 / (37 - reps));
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
