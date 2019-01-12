<template>
    <a-button-icon tag="router-link" v-if="returnUrl" :to="returnUrl" class="block sm:hidden" name="chevron-left"/>
</template>

<script>
export default {
    computed: {
        returnUrl() {
            return this.$route.query.returnUrl;
        }
    }
}
</script>