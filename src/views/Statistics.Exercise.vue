<template>
<div class="flex flex-col mb-16" v-if="exercise">
    
    <o-header :title="exercise.name" :sub-title="exercise.group">
        <div class="flex">
            <correlation-sets class="text-2xl" :sets="sets" />
            <div class="relative ml-2 hidden sm:block">
                <a-select v-model="days">
                    <option :value="31">One month</option>
                    <option :value="186">Half year</option>
                    <option :value="365">One year</option>
                    <option :value="365 * 2">Two years</option>
                    <option :value="365 * 5">Five years</option>
                </a-select>
                <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 mb-1 text-grey-darker"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current h-4 w-4"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></div>
            </div>
        </div>
    </o-header>

    <o-statistics-chart class="flex-auto" :sets="sets" :workouts="workouts" />
    <div class="flex-auto">
        <o-statistics-personal-records class="w-full md:w-2/3" :sets="sets" />
        <div class="w-1/3">
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
    data: () => ({
        exercise: null,
        workouts: [],
        sets: [],
        days: 186
    }),
    watch: {
        days(val) {
            this.$bind('sets', this.setsRef);
            this.$bind('workouts', this.workoutsRef);
        }
    },
    computed: {
        setsRef() {
            return db
                .collection('sets')
                .where('exerciseId', '==', this.exerciseId)
                .where('userId', '==', userId)
                .where('created', '>', moment().add(parseInt(this.days) * -1, 'd').toDate());
        },
        workoutsRef() {
            return db
                .collection('workouts')
                .where('userId', '==', userId)
                .where('date', '>', moment().add(parseInt(this.days) * -1, 'd').toDate());
        },
        exerciseId() {
            return this.$route.params.exercise_id;
        }
    },
    firestore() {
        return {
            exercise: db.collection('exercises').doc(this.exerciseId),
            workouts: this.workoutsRef,
            sets: this.setsRef
        }
    }
}
</script>

<style>

</style>
