<template>
    <div>
        Eidt
    </div>
</template>


<script>

import { db } from '@/api/firebase'

export default {
    data: () => ({
        set: null
    }),
    computed: {
        id() {
            return this.$route.params.set_id;
        }
    },
    firestore() {
        return {
            set: db.collection('sets').doc(this.id)
        }
    }
}
</script>