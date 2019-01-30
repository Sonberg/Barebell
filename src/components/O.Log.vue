<template>
    <div v-if="log">
        <h1 v-html="log.id"/>
        <p v-for="exercise in log.exerciseIds" :key="exercise" v-html="exercise" v-if="log.exerciseIds.length > 0"/>
        <p v-else>
            Inga övningar
        </p>
        <a-button @click="createSets">Create set</a-button>
        <a-button @click="editLog">Edit log</a-button>
    </div>
</template>

<script>

import {
    db,
    userId,
    createSet
} from '@/api/firebase';

export default {
    props: {
        log: {
            default: null,
            type: Object
        }
    },
    data: () => ({
        sets: []
    }),
    methods: {
        createSets() {
            this.log.exerciseIds.map(x => createSet({ 
                workoutId: this.log.workoutId,
                logId: this.log.id,
                exerciseId: x
             }));
        },
        editLog() {
            this.$router.push(`/logs/${this.log.id}`);
        }
    },
    firestore() {
        return {
            sets: db.collection('sets').where('logId', '==', this.log.id).where('userId', '==', userId)
        }
    }
}
</script>

<style>

</style>
