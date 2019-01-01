<template>
<div>
    <v-input type="text" v-model="displayName" class="w-full" label="Namn" />
    <v-input type="email" v-model="email" class="w-full mt-4" label="Email" />
    <v-input type="password" v-model="password" class="w-full mt-4" label="Lösenord" />

    <div>
        <i v-html="error && (errors[error.code] || error.code)"/>
        </div>
            <div class="flex flex-row justify-end">
                <button class="m-2 bg-grey py-2 px-4 rounded" @click="signup">Skapa konto</button>
            </div>
        </div>
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
        async signup() {
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
