<template>
<form  @submit="signup">
    <a-input type="text" v-model="displayName" class="w-full" label="Namn" />
    <a-input type="email" v-model="email" class="w-full mt-4" label="Email" />
    <a-input type="password" v-model="password" class="w-full mt-4" label="Lösenord" />

    <div>
        <i v-html="error && (errors[error.code] || error.code)"/>
        </div>
            <div class="flex flex-row justify-end mt-4">
                <slot></slot>
                <a-button>Sign up</a-button>
            </div>
        </form>
</template>

<script>
// auth/invalid-email
// auth/user-not-found

import {
    auth,
    db
} from '@/api/firebase'

const errors = {
    'auth/email-already-in-use': 'Finns redan ett kontot med denna emailadressen',
    'auth/invalid-email': 'Ogiltig emailadress',
    'auth/operation-not-allowed': 'Inloggning / registrering via lösordord är avstängd',
    'auth/weak-password': 'Lösenordet är för svagt'
}

export default {
    data: () => ({
        displayName: null,
        email: null,
        password: null,
        error: null,
        errors: errors
    }),
    methods: {
        async signup(e) {

            e.preventDefault();

            try {
                // create account
                await auth.createUserWithEmailAndPassword(this.email, this.password);

                // save userdata
                db.collection('users').doc(auth.currentUser.uid).set({
                    displayName: this.displayName
                });

                // goto dashboard
                this.$router.push('/')

            } catch (error) {
                this.error = error;
            }

        }
    }
}
</script>
