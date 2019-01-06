<template>
    <p :class="className"><slot/></p>
</template>

<script>
export default {
    props: {
        size: {
            default: 3,
            type: Number
        }
    },
    computed: {
        className() {
            return `text-${this.size}xl my-4 font-semibold`;
        }
    }
}
</script>
