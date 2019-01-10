<template>
    <component :is="tag" :to="to" v-on="$listeners" :class="classes"><slot/></component>
</template>

<script>
export default {
    props: {
        tag: {
            type: String,
            default: 'button'
        },
        text: {
            type: String,
            default: 'white'
        },
        background: {
            type: String,
            default: 'indigo-dark'
        },
        to: {}
    },
    computed: {
        classes() {
            return `flex items-center bg-${this.background} text-${this.text} p-3 no-underline rounded-none hover:text-white hover:bg-indigo font-semibold text-xs uppercase`
        }
    }
}
</script>
