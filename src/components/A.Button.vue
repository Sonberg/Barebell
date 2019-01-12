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
        color: {
            type: String,
            default: 'indigo'
        },
        to: {}
    },
    computed: {
        classes() {
            return `flex items-center bg-${this.color}-dark text-${this.text} p-3 no-underline rounded-none hover:text-${this.text}-dark hover:bg-${this.color} font-semibold text-xs uppercase`
        }
    }
}
</script>
