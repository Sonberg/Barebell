<template>
<div class="flex flex-row flex-wrap items-center my-32" v-if="!user">
    <div class="font-semibold text-5xl text-indigo-darkest p-4 w-full md:w-1/2 lg:w-3/5 my-12">
        <div class="w-24 h-2 bg-indigo"></div>
        A exercise-logger done right
    </div>

    <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col my-12 border p-8 bg-white">
        <m-auth-login v-if="tab == 'login'">
            <a-button @click="tab = 'sign-up'" color="white" text="indigo">I'm a new user</a-button>
        </m-auth-login>
        <m-auth-sign-up v-if="tab == 'sign-up'">
            <a-button @click="tab = 'login'" color="white" text="indigo">Login</a-button>
        </m-auth-sign-up>
    </div>
</div>
</template>

<script>

export default {
    data: () => ({
        tab: 'sign-up'
    }),
    props: {
        user: Object
    }
}
</script>
