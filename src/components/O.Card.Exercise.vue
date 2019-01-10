<template>
<a-card>
    <div :class="['p-6 flex flex-col bg-white text-center border']">
        <p v-html="exercise.group" class="uppercase text-xs text-grey-darkest mb-1" />
        <p v-html="exercise.name" class="text-xl" />
        <v-icon name="user" v-if="exercise.userId"/>
    </div>
</a-card>
</template>

<script>
export default {
    props: {
        exercise: Object
    }
}
</script>
