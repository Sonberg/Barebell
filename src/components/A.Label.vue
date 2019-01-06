<template>
    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" v-html="value"/>
</template>

<script>
export default {
    props: {
        value: String
    }
}
</script>