<template>
<div class="flex flex-col my-8">
    <p class="text-4xl text-indigo font-semibold">
        Test
    </p>
    <ul class="mt-4 text-xl text-grey-darker mb-2">
        <li>Pearsson formula for correlation</li>
        <li>Tracking personal records</li>
    </ul>
    <div class="w-1/2 mx-auto flex flex-col bg-white border border-b-3 mt-8">
        <div class="px-4 py-2 flex flex-row justify-between">
            <v-title v-html="'Create account'" />

            <div class="flex flex-row justify-center items-center">
                <button @click="tab = 'sign-up'" :disabled="tab == 'sign-up'" :class="classesFor('sign-up')">Bli medlem</button>
                <button @click="tab = 'login'" :disabled="tab == 'login'" :class="classesFor('login')">Logga in</button>
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
    data: () => ({
        tab: 'sign-up'
    }),
    methods: {
        classesFor(tab) {
            let classes = ['mx-2', 'px-6', 'py-2', 'text-grey-darkest', '', 'hover:bg-indigo hover:text-white'];

            classes.push({
                'bg-indigo-lightest': tab == this.tab
            });

            return classes;
        }
    }
}
</script>
