<template>
<a-button v-bind="$props" v-on="$listeners">
    <v-icon :name="name" class="sm:mr-2"  v-if="name && name.length"/>
    <span class="hidden sm:flex">
        <slot></slot>
    </span>
</a-button>
</template>

<script>

import AButton from '@/components/A.Button.vue'

export default {
    extends: AButton,
    props: {
        name: String
    }
}
</script>
