<template>
<div class="flex flex-col w-full md:w-3/5 border p-4 mx-auto">
    <div class="fle flex-col">
        <h3>Logga in med</h3>
        <div class="flex flex-row">
            <button>Facebook</button>
            <button>Google</button>
        </div>
    </div>
    <div class="border-t w-full my-2"></div>
    <v-input type="email" v-model="email" class="w-full mt-4" label="email" />
    <v-input type="password" v-model="password" class="w-full mt-4" label="lösenord" />
    <div>
        <i  v-html="error && (errors[error.code] || error.code)"/>
        </div>
            <div class="flex flex-row justify-end">
                <router-link tag="button" class="m-2" to="sign-up">Skapa ett konto</router-link>
                <button class="m-2 bg-grey py-2 px-4 rounded" @click="login">Logga in</button>
            </div>
        </div>
</template>

<script>
// auth/invalid-email
// auth/user-not-found

import {
    auth
} from '@/api/firebase'

const errors = {
    'auth/email-already-in-use': 'Finns redan ett kontot med denna emailadressen',
    'auth/invalid-email': 'Ogiltig emailadress',
    'auth/user-not-found': 'Det finns inget konto kopplat till denna mejladressen',
    'auth/operation-not-allowed': 'Inloggning / registrering via lösordord är avstängd',
    'auth/weak-password': 'Lösenordet är för svagt'
}

export default {
    data: () => ({
        email: null,
        password: null,
        error: null,
        errors: errors
    }),
    methods: {
        async login() {
            try {

                // login
                await auth.signInWithEmailAndPassword(this.email, this.password);
                
                // goto dashboard
                this.$router.push('/');

            } catch (error) {
                this.error = error;
            }

        }
    }
}
</script>

<style>

</style>
