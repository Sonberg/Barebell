<template>
<div class="flex flex-col items-center flex-auto" v-if="workouts && workouts.length">

    <line-chart ref="chart" :chart-data="collection" class="w-full" @hover="setActive" v-if="collection && collection.datasets" />

    <div class="flex flex-row bg-white p-4 w-full flex-wrap mt-4">

        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <v-label value="Period" />
            <div class="relative">
                <select v-model="days" class="block appearance-none w-full bg-grey-lightest rounded-none border-2 border-grey-lighter text-grey-darker py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-grey">
                <option value="31">One month</option>
                <option value="186">Half year</option>
                <option value="365">One year</option>
                <option value="730">Two years</option>
            </select>
                <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current h-4 w-4"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path></svg></div>
            </div>
        </div>

        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex flex-row">
            <div>
                <input type="checkbox"  v-model="show.volym">
            </div>
            <div>
                <input type="checkbox"  v-model="show.oneRm"
                ></div>
            <div>
                <input type="checkbox"  v-model="show.highestWeight">
            </div>
        </div>

        </div>

        <div class="flex flex-row p-4 w-full flex-wrap mt-4" v-if="active">

            <div class="w-full  md:w-1/4 sm:w-1/2 px-3 mb-6 md:mb-0" v-show="active.oneRm">
                <v-label value="1RM" />
                <p class="py-3 text-3xl font-semibold" v-html="active.oneRm + ' kg'" />
            </div>
            <div class="w-full md:w-1/4 sm:w-1/2 px-3 mb-6 md:mb-0" v-show="active.created">
                <v-label value="Date" />
                <p class="py-3 text-3xl font-semibold" v-html="formatDate(active.created)" />
            </div>
            <div class="w-full sm:w-1/2 md:w-1/4 px-3 mb-6 md:mb-0" v-show="active.volym">
                <v-label value="Volym" />
                <p class="py-3 text-3xl font-semibold" v-html="active.volym + ' kg'" />
            </div>
            <div class="w-full sm:w-1/2 md:w-1/4 px-3 mb-6 md:mb-0">
                <v-label value="Correlation for period" />
                <correlation-sets class="justify-start text-3xl" :sets="sets" />
            </div>
        </div>

    </div>
</template>

<script>

import {
    db
} from '@/api/firebase'

import {
    oneRM,
    validSet,
    highestOneRM,
    volym
} from '@/helpers/index'

import {
    groupBy,
    max
} from 'lodash'

import moment from 'moment'

export default {
    data: () => ({
        days: 186,
        show: {
            oneRm: true,
            volym: true,
            highestWeight: false
        },
        sets: [],
        collection: null,
        active: null
    }),
    watch: {
        days(val) {
            this.$bind('sets', this.setsRef);
        },
        sets(val) {
            if (!val.length) {
                return;
            }

            this.collection = this.getCollection();
        },
        show: {
            handler: function () {
                this.collection = this.getCollection()
            },
            deep: true
        }
    },
    computed: {
        exerciseId() {
            return this.$route.params.exercise_id;
        },
        workouts() {
            let validSets = this.sets.filter(validSet);

            return Object.values(groupBy(validSets, x => x.workoutId))
                .map(this.transform)
                .filter(x => x != null);
        },
        setsRef() {
            return db.collection('sets').where('exerciseId', '==', this.exerciseId).where('created', '>', moment().add(this.days * -1, 'd').toDate());
        }
    },
    methods: {
        getCollection() {
            let collection = {
                labels: this.workouts.map(x => x.workoutId),
                datasets: []
            };

            if (this.show.oneRm) {
                collection.datasets.push({
                    borderColor: '#38c172',
                    borderWidth: 2,
                    backgroundColor: 'rgba(56, 193, 114, .2)',
                    data: this.workouts.map(x => x.oneRm)
                });
            }

            if (this.show.volym) {
                collection.datasets.push({
                    borderColor: '#6574cd',
                    borderWidth: 2,
                    backgroundColor: 'rgba(101, 116, 205, 0.2)',
                    data: this.workouts.map(x => x.volym)
                });
            }

            if (this.show.highestWeight) {
                collection.datasets.push({
                    borderColor: '#e3342f',
                    borderWidth: 2,
                    backgroundColor: 'rgba(227, 52, 47, 0.2)',
                    data: this.workouts.map(x => x.highestWeight)
                });
            }

            return collection;
        },
        transform(sets) {
            if (!sets || !sets.length) {
                return null;
            }

            return {
                workoutId: sets[0].workoutId,
                created: sets[0].created.toDate(),
                volym: this.getVolymFrom(sets),
                oneRm: highestOneRM(sets),
                highestWeight: max(sets.map(x => x.weight))
            }
        },
        getVolymFrom(sets) {
            return sets.reduce((x, y) => x + volym(y), 0);
        },
        setActive(val) {

            let first = this.collection.datasets[0].data[0];

            if (!val) {
                return this.active = first;
            }

            if (!this.collection) {
                return this.active = first;
            }

            if (!this.collection.datasets[0]) {
                return this.active = first;
            }

            this.active = this.workouts[val._index];

        },
        formatDate(date) {
            return moment(date).format('Y-MM-DD')
        }
    },
    firestore() {
        return {
            sets: this.setsRef
        }
    }
}
</script>
