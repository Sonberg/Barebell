<template>
<div class="flex justify-between flex-col md:flex-row flex-wrap items-start md:items-center pt-2 pb-4">
    <div>
        <p class="uppercase text-sm text-grey-darkest mb-1" v-if="subTitle" v-html="subTitle" />
        <a-title v-html="title" v-if="title"/>
    </div>
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        }
    }
}
</script>
