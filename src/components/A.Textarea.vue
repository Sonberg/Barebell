<script>
export default {
    props: {
        label: String,
        autofocus: Boolean,
        value: {}
    },
    computed: {
        inputClasses() {
            return 'py-2 px-4 bg-grey-light focus:bg-white border-2 border-grey-light outline-none rounded-none';
        }
    },
    mounted() {
        if (this.autofocus) {
            this.$refs['input'].focus();
        }
    },
    render(h) {
        return h(
            "div", {
                class: "flex flex-col"
            },
            [
                h("a-label", {
                    props: {
                        value: this.label
                    }
                }),
                h('textarea', {
                        class: this.inputClasses,
                        ref: 'input',
                        domProps: this.$props,
                        on: {
                            input: e => this.$emit('input', e.target.value)
                        }
                    },
                    this.value
                )
            ]
        );
    }
};
</script>

<style scoped>
textarea {
    -moz-appearance: none;
    appearance: none;
    -webkit-appearance: none;
    box-shadow: none !important;
}
</style>