<template>
<div class="flex flex-col items-center flex-auto" v-if="workouts && workouts.length">
    <line-chart ref="chart" :chart-data="collection" class="w-full" @hover="setLastSelected" v-if="collection && collection.datasets" />
    <m-statistics-chart-selected :item="lastSelected" class="w-full" />
</div>
</template>

<script>
import {
    oneRM,
    validSet,
    volym
} from '@/helpers'

import {
    groupBy,
    max
} from 'lodash'

export default {
    data: () => ({
        show: {
            oneRm: false,
            volym: true,
            highestWeight: true
        },
        collection: null,
        lastSelected: null
    }),
    props: {
        sets: Array
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
        workouts() {
            let validSets = this.sets.filter(validSet);

            return Object.values(groupBy(validSets, x => x.workoutId))
                .map(this.transform)
                .filter(x => x != null);
        },
        active() {
            return this.lastSelected || this.workouts[this.workouts.length - 1];
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
                    borderWidth: 4,
                    borderDash: [10, 5],
                    backgroundColor: 'rgba(56, 193, 114, .2)',
                    data: this.workouts.map(x => x.oneRm)
                });
            }

            if (this.show.volym) {
                collection.datasets.push({
                    borderColor: '#6574cd',
                    borderWidth: 4,
                    backgroundColor: 'rgba(101, 116, 205, 0.2)',
                    data: this.workouts.map(x => x.volym)
                });
            }

            if (this.show.highestWeight) {
                collection.datasets.push({
                    borderColor: '#e3342f',
                    borderWidth: 4,
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

            sets = sets.map(x => ({ ...x,
                oneRm: oneRM(x)
            }));

            return {
                ...max(sets, x => x.oneRm),
                volym: this.getVolymFrom(sets),
            }
        },
        getVolymFrom(sets) {
            return sets.reduce((x, y) => x + volym(y), 0);
        },
        setLastSelected(val) {
            if (!val || !val._index) {
                val = {
                    _index: this.workouts.length - 1
                }
            }

            this.lastSelected = this.workouts[val._index];
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
