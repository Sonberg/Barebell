<template>
<a-button v-bind="$props" v-on="$listeners" :color="state ? color : 'white'" :text="state ? 'white' :  color">
    <slot></slot>
</a-button>
</template>

<script>
import AButton from '@/components/A.Button.vue'

export default {
    extends: AButton,
    props: {
        state: Boolean
    }
}
</script>
