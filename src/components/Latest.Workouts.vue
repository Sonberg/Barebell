<template>
<div>
    <h1 v-html="title" />
    <item-workout v-for="item in workouts" :key="item.id" :item="item" />
</div>
</template>

<script>
import {
    db
} from '@/api/firebase'

export default {
    props: {
        number: Number
    },
    data: () => ({
        workouts: []
    }),
    firestore() {
        return {
            workouts: db.collection('workouts').orderBy('created', 'desc').limit(this.number)
        }
    },
    computed: {
        title() {
            if (this.number < 2) {
                return `Senaste passet`
            }
            return `Senaste ${this.number} passen`;
        }
    }
}
</script>
