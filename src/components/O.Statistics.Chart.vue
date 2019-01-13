<template>
<div class="border bg-white" v-if="workoutsWithSets && workoutsWithSets.length">
    <div class="flex flex-col flex-auto flex-wrap">
            <line-chart ref="chart" class="overflow-hidden" :chart-data="collection" @hover="setLastSelected" v-if="collection && collection.datasets" />
            <div class="bg-white border-b  flex-1 items-center p-4 w-full flex flex-row">
                <a-button-toggle class="mr-4" @click="show.volym = !show.volym" :state="show.volym" color="indigo">Volym</a-button-toggle>
                <a-button-toggle @click="show.oneRm = !show.oneRm" color="green" :state="show.oneRm">One rep max</a-button-toggle>
            </div>
        <m-statistics-chart-selected :item="lastSelected" class="w-full p-4 flex flex-row justify-between" />
    </div>
</div>
</template>

<script>
import {
    oneRM,
    validSet,
    volym,
    displayDate
} from '@/helpers'

import {
    groupBy,
    sortBy,
    maxBy,
    find
} from 'lodash'

export default {
    data: () => ({
        show: {
            oneRm: false,
            volym: true
        },
        collection: null,
        lastSelected: null
    }),
    props: {
        sets: Array,
        workouts: Array
    },
    watch: {
        sets() {
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
        workoutsWithSets() {
            let validSets = this.sets.filter(validSet);
            let sets = Object.values(groupBy(validSets, x => x.workoutId))
                .map(this.transform)
                .filter(x => x != null);

            return sortBy(sets, ['date']);
        },
        date() {
            if (this.lastSelected && this.lastSelected.date) {
                return displayDate(this.lastSelected.date);
            }
            return '-';
        },
    },
    methods: {
        getCollection() {
            let collection = {
                labels: this.workoutsWithSets.map(x => x.workoutId),
                datasets: []
            };

            if (this.show.oneRm) {
                collection.datasets.push({
                    borderColor: '#38c172',
                    borderWidth: 4,
                    borderDash: [10, 5],
                    backgroundColor: 'rgba(56, 193, 114, .2)',
                    data: this.workoutsWithSets.map(x => x.oneRm)
                });
            }

            if (this.show.volym) {
                collection.datasets.push({
                    borderColor: '#6574cd',
                    borderWidth: 4,
                    backgroundColor: 'rgba(101, 116, 205, 0.2)',
                    data: this.workoutsWithSets.map(x => x.volym)
                });
            }

            return collection;
        },
        transform(sets) {
            if (!sets || !sets.length) {
                return null;
            }

            sets = sets.map(x => ({ ...x,
                oneRm: oneRM(x)
            }));
        
            let maxSet = maxBy(sets, x => x.oneRm);
            let workout = find(this.workouts, w => w.id == maxSet.workoutId);

            return {
                ...maxSet,
                volym: this.getVolymFrom(sets),
                date: workout ? workout.date.toDate() : null
            };
        },
        getVolymFrom(sets) {
            return sets.reduce((x, y) => x + volym(y), 0);
        },
        setLastSelected(index) {
            this.lastSelected = this.workoutsWithSets[index];
        }
    },
    mounted() {
        this.collection = this.getCollection();
    }
}
</script>

<style scoped>
* {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    /* mobile webkit */
}
</style>
