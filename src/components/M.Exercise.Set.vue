<template>
<div class="flex flex-row justify-between p-4 border-t" v-if="item">
    <div class="flex flex-1 flex-row">
        <div class="hidden md:flex">
            <a-input label="Nummer" v-model="index" tag="p" v-if="index" class="mr-4 bg-white" />
        </div>
        <a-input label="weight" type="number" v-model="item.weight" class=" flex-1 md:flex-none md:w-24 mr-4" />
        <a-input label="reps"  type="number" v-model="item.reps" class="flex-1 md:flex-none md:w-24 mr-4" />

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
        'item.weight'(e) {
            this.item.weight = parseInt(e.target.value);
            this.updateDebounce();
        },
        'item.reps'(e) {
            this.item.reps = parseInt(e.target.value);
            this.updateDebounce();
        }
    },
    computed: {
        updateDebounce() {
            return debounce(this.update, 300);
        }
    },
    methods: {
        update() {
            updateSet(this.item);
        },
        remove() {
            deleteSet(this.item.id);
        }
    }
}
</script>
