<template>
<div class="flex flex-col">
    <v-title>Statistics</v-title>
    <div class="template">
        <statistics-card v-for="exercise in exercises" :key="exercise.id" :exercise="exercise" />
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
        },
        groups() {
            return this.exercises
                .filter(this.filter)
        }
    },
    methods: {
        filter(x) {
            return !x.userId || x.userId == 'userId';
        },
        group(res, x) {
            if (!res[x.group]) {
                res[x.group] = [];
            }

            res[x.group].push(x);

            return res;
        }
    }
}
</script>

<style lang="less" scoped>
.template {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2em;
}
</style>
