<template>
<form @submit="login">
    <v-input type="email" v-model="email" class="w-full" label="email" />
    <v-input type="password" v-model="password" class="w-full mt-4" label="lösenord" />
    <div>
        <i  v-html="error && (errors[error.code] || error.code)"/>
        </div>
            <div class="flex flex-row justify-end mt-4">
                <slot></slot>
                <v-button>Login</v-button>
            </div>
        </form>
</template>

<script>
// auth/invalid-email
// auth/user-not-found

import {
    auth
} from "@/api/firebase";

const errors = {
    "auth/email-already-in-use": "Finns redan ett kontot med denna emailadressen",
    "auth/invalid-email": "Ogiltig emailadress",
    "auth/user-not-found": "Det finns inget konto kopplat till denna mejladressen",
    "auth/operation-not-allowed": "Inloggning / registrering via lösordord är avstängd",
    "auth/weak-password": "Lösenordet är för svagt"
};

export default {
    data: () => ({
        email: null,
        password: null,
        error: null,
        errors: errors
    }),
    methods: {
        async login(e) {

            e.preventDefault();

            try {
                // login
                await auth.signInWithEmailAndPassword(this.email, this.password);

                // goto dashboard
                this.$router.push("/");
            } catch (error) {
                this.error = error;
            }
        }
    }
};
</script>

<style>
</style>
