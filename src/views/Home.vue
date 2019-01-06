<template>
<div class="flex flex-row flex-wrap items-center my-32" v-if="!user">
    <div class="font-semibold text-5xl text-indigo-darkest p-4 w-full md:w-1/2 lg:w-3/5 my-12">
        <div class="w-24 h-2 bg-indigo"></div>
        A exercise-logger done right
    </div>

    <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col my-12 border p-8 bg-white">
        <auth-login v-if="tab == 'login'">
            <a-button @click="tab = 'sign-up'" background="white" text="indigo">I'm a new user</a-button>
        </auth-login>
        <auth-sign-up v-if="tab == 'sign-up'">
            <a-button @click="tab = 'login'" background="white" text="indigo">Login</a-button>
        </auth-sign-up>
    </div>
</div>
</template>

<script>
export default {
    props: {
        user: Object
    },
    data: () => ({
        tab: 'sign-up'
    })
}
</script>
