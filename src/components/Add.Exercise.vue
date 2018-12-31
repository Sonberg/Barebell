<template>
<div>
    <div @click="open = !open" :class="['p-4 align-center font-semibold text-white hover:bg-indigo bg-indigo-light my-4', { 'bg-indigo': open }]">
        Lägg till övning
    </div>
    <ul v-if="open" class="list-reset bg-indigo-lightest">
        <li v-for="g in Object.keys(groups)" :key="g" class="py-2 px-4">
            <p v-html="g" class="text-sm text-grey-darkest font-semibold" />
            <ul class="list-reset">
                <li v-for="e in groups[g]" :key="e.id">
                    <button v-html="e.name" @click="add(e.id)"/>
            </li>
        </ul>
    </li>
</ul>
</div>
</template>

<script>
import {
    db,
    userId
} from '@/api/firebase'

export default {
    props: {
        add: Function
    },
    data: () => ({
        publicExercises: [],
        privateExercises: [],
        open: false
    }),
    
    computed: {
        exercises() {
            return [...this.publicExercises, ...this.privateExercises];
        },
        groups() {
            return this.exercises
                .reduce(this.group, {})
        }
    },
    methods: {
        group(res, x) {
            if (!res[x.group]) {
                res[x.group] = [];
            }

            res[x.group].push(x);

            return res;
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
