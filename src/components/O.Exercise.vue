<template>
<div class="mt-4 bg-white border" v-if="item">
    <div class="px-4 flex flex-row  justify-between items-center" @click="toggle">
        <a-title size="xl" v-html="item.name"/>
    </div>
    <div v-if="open" class="border-t-4">
        <m-exercise-set v-for="(set, index) in sets" :item="set" :index="index + 1" :key="set.id" />
        <div class="flex flex-row justify-between p-4 border-t">
            <div></div>
            <div class="flex flex-row">
                <a-button-icon name="edit" tag="router-link" class="mr-2" :to="editLink">
                    Change exercise
                </a-button-icon>
                <a-button-icon tag="router-link" name="chart-line" class="mr-2" :to="statisticsLink">
                    Statistics
                </a-button-icon>
                <a-button-icon name="plus" @click="add">
                    Add set
                </a-button-icon>
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
