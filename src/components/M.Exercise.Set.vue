<template>
<div class="flex flex-row justify-between p-4 border-t" v-if="item">
    <div class="flex flex-1 flex-row">
        <div class="hidden md:flex">
            <a-input label="Nummer" v-model="index" tag="p" v-if="index" class="mr-4 bg-white" />
        </div>
        <a-input label="weight" type=number v-model="item.weight" class=" flex-1 md:flex-none md:w-24 mr-4" />
        <a-input label="reps"  type=number v-model="item.reps" class="flex-1 md:flex-none md:w-24 mr-4" />

    </div>
    <button @click="remove" class="text-indigo-dark mt-4"><v-icon name="minus"/></button>
</div>
</template>

<script>
import {
    db,
    updateSet,
    deleteSet
} from '@/api/firebase';

import debounce from 'lodash.debounce'

export default {
    props: {
        item: Object,
        index: Number
    },
    watch: {
        'item.weight'(weight) {
            this.updateDebounce();
        },
        'item.reps'(reps) {
            this.updateDebounce();
        }
    },
    computed: {
        updateDebounce() {
            return debounce(this.update, 300);
        },
        volym() {
            return this.getNum(this.item.weight * this.item.reps);
        },
        oneRm() {
            return this.getNum(this.item.weight * (36 / (37 - this.item.reps))).toFixed(2);
        }
    },
    methods: {
        update() {
            updateSet({
                id: this.item.id,
                weight: parseInt(this.item.weight),
                reps: parseInt(this.item.reps)
            });
        },
        remove() {
            deleteSet(this.item.id);
        },
        getNum(val) {
            if (isNaN(val)) {
                return 0;
            }
            return val;
        }
    }
}
</script>
