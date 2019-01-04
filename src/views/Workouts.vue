<template>
<div class="flex flex-col">
    <div class="flex flex-row justify-between my-4 flex-wrap items-center">
            <v-title>Workouts</v-title>
        <v-button  @click="add">New workout</v-button>
    </div>
    <div v-for="week in weeks" :key="week" class="mb-4">
        <v-label :value="titleFor(week)" />
        <item-workout v-for="workout in groupedByWeek[week]" :item="workout" :key="workout.id" />
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
        }
    },
    methods: {
        titleFor(date) {
            if (toMoment(date).week() == this.thisWeek) {
                return 'Denna veckan'
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
