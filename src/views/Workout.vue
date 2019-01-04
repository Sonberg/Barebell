<template>
<div v-if="workout" class="mb-4 flex flex-col items-start">
    <input type="text" v-model="workout.name" class="text-3xl py-2 my-4 bg-grey-lightest font-semibold outline-none border-b-4 border-indigo-light focus:border-indigo-dark w-full" placeholder="Träningspass">
    <div class="flex w-full flex-col">
        <v-input type="date" v-model="date" label="Date"/>
        <v-textarea v-model="workout.note" label="Note" class="flex-1 h-36 mt-2 "/>
    </div>
    <item-exercise v-for="item in exercises" :workoutId="workoutId" :key="item.id" :item="item" class="w-full" />
    <add-exercise :add="add" class="w-full" />
</div>
</template>

<script>
import {
    db,
    updateWorkout,
    createSet
} from '@/api/firebase'

import {
    find,
    debounce
} from 'lodash'

import { toMoment } from '@/helpers'

export default {
    data: () => ({
        workout: null,
        allExercises: []
    }),
    watch: {
        'workout.name'() {
            this.updateDebounce();
        },
        'workout.date'() {
            this.updateDebounce();
        },
        'workout.note'() {
            this.updateDebounce();
        }
    },
    computed: {
        date: {
            get: function() {      
                  return toMoment(this.workout.date).format('YYYY-MM-DD');
            },
            set: function(val) {
                this.workout.date = moment(val).toDate();
            }
        },
        workoutId() {
            return this.$route.params.workout_id;
        },
        updateDebounce() {
            return debounce(this.update, 600);
        },
        exercises() {
            if (!this.workout || !this.allExercises.length) {
                return []
            }

            let exercises = this.allExercises.reduce((res, x) => {
                res[x.id] = x;
                return res;
            }, {});

            return this.workout.exercises
                .map(x => exercises[x])
                .filter(x => x != null);
        }
    },
    methods: {
        add(exerciseId) {
            updateWorkout(Object.assign(this.workout, {
                exercises: [...this.workout.exercises, exerciseId]
            }));

            createSet({
                exerciseId,
                workoutId: this.workout.id
            });
        },
        update() {
            updateWorkout(this.workout);
        },
        formatDate(date) {
            return moment(date).format('Y-M-D')
        }
    },
    firestore() {
        return {
            workout: db.collection('workouts').doc(this.workoutId),
            allExercises: db.collection('exercises')
        }
    }
}

//
</script>
