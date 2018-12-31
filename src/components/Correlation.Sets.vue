<template>
<div :class="['flex flex-row items-center py-2', {'text-green': correlation > 0, 'text-red': correlation < 0 }]">
    <v-icon name="sort-up" v-if="correlation > 0" />
    <v-icon name="sort-down" v-if="correlation < 0" />
    <p class="font-semibold ml-2" v-html="correlation + ' %'" />
</div>
</template>

<script>
import moment from 'moment';

import {
    oneRM,
    volym,
    validSet
} from '@/helpers'

import {
    min,
    max,
    groupBy
} from 'lodash';

export default {
    props: {
        type: String,
        sets: Array
    },
    computed: {
        setsWithoutNullValues() {
            return this.sets.filter(validSet);
        },
        oldestDataset() {
            return moment(min(this.setsWithoutNullValues.map(x => x.created.toDate())));
        },
        data() {
            let grouped = groupBy(this.setsWithoutNullValues, x => x.workoutId);
            let values = Object.values(grouped).map(this.toDataValue);

            return values
        },
        correlation() {
/*
            let grouped = groupBy(this.setsWithoutNullValues, x => x.workoutId);
            let values = this.setsWithoutNullValues.map(set => ({
                y: oneRM(set),
                x: moment(set.created.toDate()).diff(this.oldestDataset, 'days')
            }));

            console.table(values);

            console.log(grouped);


*/
            let values = this.data;

            console.log(values);
            

            const n = values.length;

            if (n == 0) return 0;

            let meanX = 0;
            let meanY = 0;
            for (var i = 0; i < n; i++) {
                meanX += values[i].x / n
                meanY += values[i].y / n
            }

            let num = 0;
            let den1 = 0;
            let den2 = 0;

            for (var i = 0; i < n; i++) {
                let dx = (values[i].x - meanX);
                let dy = (values[i].y - meanY);
                num += dx * dy
                den1 += dx * dx
                den2 += dy * dy
            }

            const den = Math.sqrt(den1) * Math.sqrt(den2);

            if (den == 0) return 0;

            return parseInt((num / den) * 100);
        }
    },
    methods: {
        toDataValue(sets) {
            let set = sets[0]
            let oneRm = sets.map(oneRM);
            let daysAgo = moment(sets[0].created.toDate()).diff(this.oldestDataset, 'days');

            return {
                y: max(oneRm),
                x: daysAgo
            }

        }
    }
}
</script>
