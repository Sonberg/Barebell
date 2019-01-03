<template>
<div class="flex flex-col">
    <div class="flex flex-row justify-between">
        <v-title class="hidden sm:flex">Workouts</v-title>
        <div class="text-black py-3 px-6 m-4 font-normal shadow-lg text-xs text-white bg-indigo hover:bg-indigo-dark no-underline uppercase rounded-full" @click="add">New workout</div>
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

import moment from 'moment'

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
            if (moment(date).week() == this.thisWeek) {
                return 'Denna veckan'
            }
            return `${this.startOfWeek(date).format('YYYY-MM-DD')} - ${this.endOfWeek(date).format('YYYY-MM-DD')}`;
        },
        async add() {
            let result = await createWorkout();
            this.$router.push(`workouts/${result.id}`)
        },
        startOfWeek(date) {
            return moment(date).startOf('week').add(1, 'days');
        },
        endOfWeek(date) {
            return moment(date).endOf('week');
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
