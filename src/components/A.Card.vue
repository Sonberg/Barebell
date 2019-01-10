<template>
<div :class="classes">
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        sm: {
            type: String,
            default: '1/2'
        },
        md: {
            type: String,
            default: '1/3'
        },
        padding: {
            type: Number,
            default: 2
        }
    },
    computed: {
        classes() {
            return `w-full sm:w-${this.sm} md:w-${this.md} p-${this.padding}`
        }
    }
}
</script>
