<template>
<div v-if="workout" class="mb-4 flex flex-col items-start">
    <input type="text" v-model="workout.name" class="text-3xl rounded-none px-0 py-2 my-4 bg-grey-lightest font-semibold outline-none border-b-4 border-indigo-dark focus:border-indigo w-full" :placeholder="placeholder">
    <div class="flex w-full flex-col">
        <a-input type="date" v-model="date" label="Date" :max="today" />
        <a-textarea v-model="workout.note" label="Note" class="flex-1 h-36 mt-2 " />
    </div>
    <o-exercise v-for="item in exercises" :workoutId="workoutId" :key="item.id" :item="item" class="w-full" />
    <o-log v-for="log in logs" :log="log" :key="log.id" class="w-full" />
    <a-button-icon name="plus" class="self-end mt-4" @click="createLog">
        Add exercise
    </a-button-icon>

</div>
</template>

<script>
import {
    db,
    userId,
    updateWorkout,
    createSet,
    createLog
} from '@/api/firebase'

import {
    find,
    debounce
} from 'lodash'

import {
    inputDate,
    displayArray
} from '@/helpers'

export default {
    data: () => ({
        workout: null,
        logs: [],
        allExercises: [],
        logTypes: []
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
            get: function () {
                return inputDate(this.workout.date);
            },
            set: function (val) {
                this.workout.date = moment(val).toDate();
            }
        },
        today() {
            return inputDate(moment());
        },
        workoutId() {
            return this.$route.params.workout_id;
        },
        updateDebounce() {
            return debounce(this.update, 600);
        },
        placeholder() {
            return displayArray(this.exercises.map(x => x.group)) || 'Workout';
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
        async createLog() {
            let logType = find(this.logTypes, x => x.default);
            let result = await createLog({ workoutId: this.workoutId, logType: logType && logType.id });
            this.$router.push(`/logs/${result.id}`);
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
            logs: db.collection('logs').where('workoutId', '==', this.workoutId).where('userId', '==', userId),
            allExercises: db.collection('exercises'),
            logTypes: db.collection('log-types')
        }
    }
}

//
</script>
