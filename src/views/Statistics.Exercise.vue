<template>
<div class="flex flex-col">
    <div class="flex flex-row justify-between items-center">
        <div>
            <p v-html="exercise && exercise.group" class="uppercase text-sm text-grey-darkest mb-1" />
            <p class="text-3xl font-semibold mb-4" v-html="exercise && exercise.name" />
        </div>
    </div>
    <chart-exercise class="flex-auto" />
</div>
</template>

<script>
import {
    db
} from '@/api/firebase'

export default {
    data: () => ({
        exercise: null,
        sets: []
    }),
    computed: {
        exerciseId() {
            return this.$route.params.exercise_id;
        }
    },
    firestore() {
        return {
            exercise: db.collection('exercises').doc(this.exerciseId),
            sets: db.collection('sets').where('exerciseId', '==', this.exerciseId)
        }
    }
}
</script>

<style>

</style>
