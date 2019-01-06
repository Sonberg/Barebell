<template>
<div>
    <a-button @click="open = !open" class="mt-4">
        Add exercise
    </a-button>
    <div v-if="open" class="bg-indigo-lightest flex flex-row flex-wrap">
        <div v-for="g in Object.keys(groups)" :key="g" class="p-4 w-1/3">
            <p v-html="g" class="text-sm text-grey-darkest font-semibold" />
                <div v-for="e in groups[g]" :key="e.id" class="my-2">
                    <button v-html="e.name" @click="add(e.id)"/>
            </div>
        </div>
    </div>
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
