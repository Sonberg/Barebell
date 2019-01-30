<template>
<div v-if="log">

    <o-header title="Choose exercise">
        <div class="flex">
            <a-button-toggle v-for="logType in logTypes" v-html="logType.name" :state="log &&  log.logType == logType.id" :key="logType.id" @click="setLogType(logType.id)" />
        </div>
    </o-header>

    <a-card-wrapper>
        <a-card>
            <v-icon name="plus" class="text-3xl" />
        </a-card>
        <o-card-exercise v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" :active="isSelected(exercise.id)" @select="select" />
    </a-card-wrapper>
    <div class="w-full border-t my-2 py-2 flex justify-end">
        <a-button class="mr-2" @click="deleteLog">Delete</a-button>
        <a-button @click="updateLog">Save</a-button>
    </div>
</div>
</template>

<script>
import {
    db,
    userId,
    updateLog,
    deleteLog
} from '@/api/firebase'

import {
    sortBy,
    indexOf,
    without
} from 'lodash'
import { async } from 'q';

export default {
    data: () => ({
        log: null,
        publicExercises: [],
        privateExercises: [],
        logExercises: [],
        logTypes: [],
    }),
    computed: {
        id() {
            return this.$route.params.log_id;
        },
        exercises() {
            return sortBy([...this.privateExercises, ...this.publicExercises], ['group', 'name']);
        }
    },
    methods: {
        isSelected(exerciseId) {
            return indexOf(this.log.exerciseIds, exerciseId) > -1
        },
        select(exerciseId) {

            if (this.isSelected(exerciseId)) {
                return this.log.exerciseIds = without(this.log.exerciseIds, exerciseId);
            }

            this.log.exerciseIds.push(exerciseId);
        },
        setLogType(id) {
            this.log.logType = id;
        },
        async updateLog() {
            await updateLog(this.log);
            this.$router.push(`/workouts/${this.log.workoutId}`)
        },
        async deleteLog() {
            await deleteLog(this.log.id);
            this.$router.push(`/workouts/${this.log.workoutId}`)
        }
    },
    firestore() {
        return {
            publicExercises: db.collection('exercises').where('public', '==', true).orderBy('group').orderBy('name'),
            privateExercises: db.collection('exercises').where('userId', '==', userId).orderBy('group').orderBy('name'),
            log: db.collection('logs').doc(this.id),
            logTypes: db.collection('log-types')
        }
    }
}
</script>
