<template>
    <select :value="value" @input="e => $emit('input', e.target.value)" class="block appearance-none w-full bg-grey-lihgest rounded-none border-2 border-grey-light text-grey-darker py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-grey">
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
