<template>
<a-card>
    <div :class="classes" @click="click">
        <p v-html="exercise.group" :class="labelClasses" />
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
    },
    computed: {
        classes() {
            return ['p-6 flex flex-col border', this.active ? 'bg-indigo-dark hover:bg-indigo text-white' : 'bg-white hover:bg-grey-lightest'];
        },
        labelClasses() {    
            return ['uppercase text-xs mb-1', this.active ? 'text-grey-lightest': 'text-grey-darkest'];
        }
    },
    methods: {
        click() {
            this.$emit('select', this.exercise.id);
        }
    }
}
</script>