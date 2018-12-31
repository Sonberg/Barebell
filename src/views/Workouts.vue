<template>
<div class="flex flex-col">
    <div class="flex flex-row justify-between">
        <v-title class="hidden sm:flex">Workouts</v-title>
        <div class="text-black py-3 px-6 m-4 font-normal shadow-lg text-xs text-white bg-indigo hover:bg-indigo-dark no-underline uppercase rounded-full" @click="add">New workout</div>
    </div>
    <item-workout v-for="workout in workouts" :item="workout" :key="workout.id" />
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
        groupedByWeek() {
            return groupBy(this.workouts, x => moment(x.created.toDate()).week());
        },
        thisWeek() {
            return moment().week();
        }
    },
    methods: {
        titleFor(week) {
            if (week == this.thisWeek) {
                return 'Denna veckan'
            }
            return `Vecka ${week}`;
        },
        async add() {
            let result = await createWorkout();
            this.$router.push(`workouts/${result.id}`)
        }
    },
    firestore() {
        console.log(userId);
        
        return {
            workouts: db.collection('workouts').where('userId', '==', userId).orderBy('created', 'desc')
        }
    }
}
</script>
