<template>
<div>
    <div class="w-full border-b my-4">
        <a-title class="py-3 font-semibold" v-html="date" />
    </div>
    <a-card-wrapper class="w-full mb-4">
        <a-card class="flex flex-col" md="1/4">
            <a-label value="Weight" />
            <p class="py-3 text-3xl font-semibold" v-html="weight" />
        </a-card>
        <a-card class="flex flex-col" md="1/4">
            <a-label value="Reps" />
            <p class="py-3 text-3xl font-semibold" v-html="reps" />
        </a-card>
        <a-card class="flex flex-col" md="1/4">
            <a-label value="1RM" />
            <p class="py-3 text-3xl font-semibold" v-html="oneRm" />
        </a-card>
        <a-card class="flex flex-col" md="1/4">
            <a-label value="Volym" />
            <p class="py-3 text-3xl font-semibold" v-html="volym" />
        </a-card>
    </a-card-wrapper>
</div>
</template>

<script>
import {
    displayDate
} from '@/helpers'

export default {
    props: {
        item: {
            type: Object
        }
    },
    computed: {
        date() {
            if (this.item && this.item.created) { 
                return displayDate(this.item && this.item.created);
            }
            return '';
        },
        weight() {
            return (this.item && this.item.weight || 0) + ' kg';
        },
        reps() {
            return (this.item && this.item.reps || 0);
        },
        oneRm() {
            return (this.item && this.item.oneRm || 0).toFixed(2) + ' kg';
        },
        volym() {
            return (this.item && this.item.volym || 0) + ' kg';
        }
    }
}
</script>
