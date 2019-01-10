<template>
<div class="flex flex-col">
    <div class="flex flex-row justify-between flex-wrap items-center">
        <a-title>Workouts</a-title>
        <a-button  @click="add">New workout</a-button>
    </div>
    <div v-for="week in weeks" :key="week" class="mb-4">
        <a-label :value="titleFor(week)" />
        <m-workout v-for="workout in groupedByWeek[week]" :item="workout" :key="workout.id" />
    </div>
</div>
</template>

<script>
import {
    db,
    userId,
    createWorkout
} from '@/api/firebase'

import { toMoment } from '@/helpers';

import {
    groupBy,
    orderBy
} from 'lodash'

export default {
    data: () => ({
        workouts: []
    }),
    computed: {
        weeks() {
            return Object.keys(this.groupedByWeek);
        },
        groupedByWeek() {
            return this.workouts.reduce((res, data) => {
                let startOfWeek = this.startOfWeek(data.date);

                if (!res[startOfWeek]) {
                    res[startOfWeek] = [];
                }

                res[startOfWeek].push(data);

                return res;
            }, {});
        },
        thisWeek() {
            return moment().week();
        },
        lastWeek() {
            return moment().add(-1, 'week').endOf('week').week();
        }
    },
    methods: {
        titleFor(date) {
            let week = toMoment(date).week();

            if (week === this.thisWeek) {
                return 'This week'
            }

            if (week === this.lastWeek) {
                return 'Last week'
            }

            return `${this.startOfWeek(date).format('YYYY-MM-DD')} - ${this.endOfWeek(date).format('YYYY-MM-DD')}`;
        },
        async add() {
            let result = await createWorkout();
            this.$router.push(`workouts/${result.id}`)
        },
        startOfWeek(date) {
            return toMoment(date).startOf('week').add(1, 'days');
        },
        endOfWeek(date) {
            return toMoment(date).endOf('week');
        }
    },
    firestore() {
        console.log(userId);

        return {
            workouts: db.collection('workouts').where('userId', '==', userId).orderBy('date', 'desc')
        }
    }
}
</script>
