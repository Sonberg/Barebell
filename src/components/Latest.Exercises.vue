<template>
<div>
    <h1 v-html="title" />
    <div class="">
       
    </div>
</div>
</template>

<script>

import { db } from '@/api/firebase'

export default {
    props: {
        number: Number
    },
    data: () => ({
        sets: []
    }),
    firestore() {
        return {
            sets: db.collection('sets').where('userId', '==', 'userId').orderBy('created','desc')
        }
    },
    computed: {
        title() {
            return `Favorit övningar (${this.number})`;
        }
    }
}
</script>
