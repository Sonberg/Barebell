<template>
<div :class="classes">
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        default: {
            type: String,
            default: 'full'
        },
        sm: {
            type: String,
            default: '1/2'
        },
        md: {
            type: String,
            default: '1/3'
        },
        lg: {
            type: String,
            default: '1/4'
        },
        padding: {
            type: Number,
            default: 2
        }
    },
    computed: {
        classes() {
            return `w-${this.default} sm:w-${this.sm} md:w-${this.md} lg:w-${this.lg} p-${this.padding}`
        }
    }
}
</script>
