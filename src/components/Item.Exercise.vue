<template>
<div class="mt-4 bg-white border" v-if="item">
    <div class="py-2 px-4 flex flex-row  justify-between items-center">
        <div class="flex flex-1" @click="toggle">
            <p class="text-lg my-4 font-semibold" v-html="item.name" />
        </div>
        <div class="flex flex-row">
            <button @click="add" class="flex flex-row items-center bg-indigo-dark text-white p-2"><v-icon name="plus"/></button>
        </div>
    </div>
    <div v-if="open" class="border-t-4">
        <div class="flex flex-row p-4">
            <div class="hidden sm:flex">
                <v-input label="Antal set" class="mr-4" tag="p" :value="sets.length || 0" disabled />
            </div>
            <v-input label="Totalt volym" class="mr-4" tag="p" :value="volym" disabled />
            <v-input label="Högsta 1RM" tag="p" class="mr-4" :value="oneMax" disabled />
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
    }
}
</script>