<template>
<div>
        <div class="container mx-auto my-2 flex flex-row justify-between">
            <div class="flex flex-row items-center">
                <router-link to="/" class="font-bold p-4 text-xl text-black no-underline">Barebell</router-link>
                <router-link to="/workouts" class="main p-4 font-semibold no-underline  flex flex-row items-center" v-if="isAuthenticated">
                    <v-icon name="dumbbell" class="mr-2" />
                    <span class="hidden sm:flex">Workouts</span>
                </router-link>
                <router-link to="/statistics" class="main text-black p-4 font-semibold no-underline flex flex-row items-center" v-if="isAuthenticated">
                    <v-icon name="chart-line" class="mr-2" />
                    <span class="hidden sm:flex">Statistics</span>
                </router-link>
                <router-link to="/statistics" class="main text-black p-4 font-semibold no-underline flex flex-row items-center" v-if="isAuthenticated">
                    <v-icon name="clipboard-list" class="mr-2" />
                    <span class="hidden sm:flex">Programs</span>
                </router-link>
            </div>
            <div class="flex items-center justify-center">
                <v-icon name="user" class="text-black no-underline mr-4" @click="logout" v-if="user && user.displayName" />
            </div>
        </div>
    <div class="container mx-auto px-4">
        <router-view :user="user" />
    </div>
</div>
</template>

<script>
import {
    userId,
    auth,
    db
} from '@/api/firebase'

export default {
    data: () => ({
        user: null,
        userId
    }),
    computed: {
        isAuthenticated() {
            return this.user != null;
        }
    },
    methods: {
        onAuthStateChanged() {
            if (!userId) {
                return
            }

            this.userId = userId;
            this.$bind('user', db.collection('users').doc(this.userId));
        },
        async logout() {
            try {
                await auth.signOut();
            } catch (e) {
                console.error(e);
            }
        }
    },
    created() {
        auth.onAuthStateChanged(this.onAuthStateChanged);
    },
    firestore() {
        console.log(this.userId);

        if (!this.userId) {
            return
        }

        return {
            user: db.collection('users').doc(this.userId)
        }
    }
}
</script>

<style lang="less" scoped>
@tailwind preflight;

a.main {
    @apply .text-black;

    &.router-link-active {
        @apply .text-indigo-dark;
    }

}

@tailwind utilities;
</style>
