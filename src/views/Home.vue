<template>
<div class="flex flex-col my-32" v-if="!user">
    <div class="font-semibold  p-4 w-full md:w-2/3 lg:w-3/5 mx-auto">
        <v-label value="Barebell" class="text-center"/>
        <p class="text-5xl text-indigo text-center mb-4">
            A exercise-logger done right
        </p>
    </div>

    <div class="w-full md:w-2/3 lg:w-3/5 mx-auto flex flex-col bg-white border border-b-3 mt-8">
        <div class="px-4 py-2 flex flex-row justify-between flex-wrap items-center">
            <v-title v-html="'Create account'" class="ml-2" />

            <div class="flex flex-row justify-center items-center">
                <button @click="tab = 'sign-up'" :disabled="tab == 'sign-up'" :class="classesFor('sign-up')">I'm a new user</button>
                <button @click="tab = 'login'" :disabled="tab == 'login'" :class="classesFor('login')">Login</button>
            </div>

        </div>
        <div class="p-4 border-t-4 ">
            <auth-login v-if="tab == 'login'" />
            <auth-sign-up v-if="tab == 'sign-up'" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'home',
    props: {
        user: Object
    },
    data: () => ({
        tab: 'sign-up'
    }),
    methods: {
        classesFor(tab) {
            let classes = ['px-6', 'py-2', 'text-grey-darkest', 'focus:outline-none', 'hover:bg-indigo hover:text-white'];

            classes.push({
                'bg-indigo-lightest': tab == this.tab
            });

            return classes;
        }
    }
}
</script>
