<template>
<div>
    <a-title>Choose exercise</a-title>
    <a-card-wrapper>
        <o-card-exercise v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" />
    </a-card-wrapper>
</div>
</template>

<script>
import {
    db,
    userId
} from '@/api/firebase'

import {
    sortBy
} from 'lodash'

export default {
    data: () => ({
        publicExercises: [],
        privateExercises: []
    }),
    computed: {
        id() {
            return this.$route.params.set_id;
        },
        exercises() {
            return sortBy([...this.privateExercises, ...this.publicExercises], ['group', 'name']);
        }
    },
    firestore() {
        return {
            publicExercises: db.collection('exercises').where('public', '==', true).orderBy('group').orderBy('name'),
            privateExercises: db.collection('exercises').where('userId', '==', userId).orderBy('group').orderBy('name')
        }
    }
}
</script>
