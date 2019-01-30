<template>
<div class="flex flex-col">
    <o-header title="Statistics"/>
    <a-card-wrapper class="flex flex-wrap -mx-2">
        <o-card-statistics v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" />
    </a-card-wrapper>
</div>
</template>

<script>
import {
    db
} from '@/api/firebase'


export default {
    props: {
        user: Object
    },
    firestore() {
        if (!this.user) {
            return;
        }

        return {
            publicExercises: db.collection('exercises').where('public', '==', true).orderBy('group').orderBy('name'),
            privateExercises: db.collection('exercises').where('userId', '==', this.user.id).orderBy('group').orderBy('name')
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
