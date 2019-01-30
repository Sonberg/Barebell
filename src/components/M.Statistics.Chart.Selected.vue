<template>
    <div class="flex-wrap">
            <div class="py-4 md:p-4 w-1/2 md:w-1/4">
                <a-label value="Weight" />
                <p class="text-3xl font-semibold " v-html="weight" />
            </div>
            <div class="py-4 md:p-4 w-1/2 md:w-1/4">
                <a-label value="Reps"/>
                <p class="text-3xl font-semibold" v-html="reps" />
            </div>
            <div class="py-4 md:p-4 w-1/2 md:w-1/4">
                <a-label value="1RM" />
                <p class="text-3xl font-semibold" v-html="oneRm" />
            </div>
            <div class="py-4 md:p-4 w-1/2 md:w-1/4">
                <a-label value="Volym"  />
                <p class="text-3xl font-semibold" v-html="volym" />
            </div>
    </div>
</template>

<script>

import {
    displayDate,
    displayWeight
} from '@/helpers'

export default {
    props: {
        item: {
            type: Object
        }
    },
    computed: {
        weight() {
            return displayWeight(this.item && this.item.weight);
        },
        reps() {
            return (this.item && this.item.reps || '-');
        },
        oneRm() {
            return displayWeight(this.item && this.item.oneRm);
        },
        volym() {
            return displayWeight(this.item && this.item.volym);
        }
    }
}
</script>
