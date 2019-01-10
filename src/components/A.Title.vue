<template>
    <p :class="className"><slot/></p>
</template>

<script>
export default {
    props: {
        size: {
            default: '3xl',
            type: String
        }
    },
    computed: {
        className() {
            return `text-${this.size} my-4 font-semibold`;
        }
    }
}
</script>
