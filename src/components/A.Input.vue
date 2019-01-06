<script>
export default {
    props: {
        label: String,
        tag: String,
        type: String,
        autofocus: Boolean,
        value: {}
    },
    computed: {
        inputClasses() {
            return 'py-2 px-4 bg-grey-light focus:bg-white border-2 border-grey-light outline-none';
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
                h(
                    this.tag || 'input', {
                        class: this.inputClasses,
                        ref: 'input',
                        domProps: Object.assign(this.$props, {
                            value: this.value
                        }),
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
