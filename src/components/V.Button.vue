<template>
    <component :is="tag || 'button'" :to="to" v-on="$listeners" v-bind="$props" class="flex items-center bg-indigo-dark text-white p-3 no-underline hover:bg-indigo font-semibold text-xs uppercase"><slot/></component>
</template>

<script>
export default {
    props: {
        tag: String,
        to: {}
    },
    created() {
        console.log(this);
        
    }
}
</script>
