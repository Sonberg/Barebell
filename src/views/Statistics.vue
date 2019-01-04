<template>
<div class="flex flex-col">
    <v-title>Statistics</v-title>
    <div class="flex flex-wrap -mx-2">
        <statistics-card v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" class="w-full sm:w-1/2 md:w-1/3 p-2" />
    </div>
</div>
</template>

<script>
import {
    db,
    userId
} from '@/api/firebase'

export default {
    firestore() {
        return {
            publicExercises: db.collection('exercises').where('public', '==', true).orderBy('group').orderBy('name'),
            privateExercises: db.collection('exercises').where('userId', '==', userId).orderBy('group').orderBy('name')
        }
    },
    data: () => ({
        publicExercises: [],
        privateExercises: []
    }),
    computed: {
        exercises() {
            return [...this.privateExercises, ...this.publicExercises];
        }
    }
}
</script>
