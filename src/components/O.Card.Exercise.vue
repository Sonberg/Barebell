<template>
<a-card @click="$emit('select', exercise.id)">
    <div :class="['px-6 py-12 flex flex-col bg-white text-center border hover:bg-grey-lightest']">
        <p v-html="exercise.group" class="uppercase text-xs text-grey-darkest mb-1" />
        <p v-html="exercise.name" class="text-xl" />
        <v-icon name="user" v-if="exercise.userId"/>
    </div>
</a-card>
</template>

<script>
export default {
    props: {
        exercise: Object,
        active: Boolean
    }
}
</script>
