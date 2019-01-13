<template>
    <div>
        <a-label v-html="label"/>
        <component :is="tag" :class="classes" v-bind="$props" v-on="$listeners"  :value="value" @input="onInput" v-html="value" />
    </div>
</template>


<script>
export default {
    props: {
        label: String,
        tag: {
            type: String,
            default: 'input'
        },
        type: String,
        autofocus: Boolean,
        max: String,
        min: String,
        value: {}
    },
    computed: {
        classes() {
            return 'py-2 px-4 bg-grey-light focus:bg-white border-2 border-grey-light outline-none rounded-none w-full';
        }
    },
    methods: {
        onInput(val) {
            this.$emit('input', val);
        }
    },
    mounted() {
        if (this.autofocus) {
            this.$refs['input'].focus();
        }
    }
};
</script>

<style scoped>
input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>
