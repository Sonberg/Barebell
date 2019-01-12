<template>
    <select :value="value" @input="e => $emit('input', e.target.value)" class="block appearance-none w-full bg-white rounded-none border text-grey-darker py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-grey-dark">
        <slot></slot>
    </select>
</template>

<script>
export default {
    props: {
        value: {}
    }
}
</script>
