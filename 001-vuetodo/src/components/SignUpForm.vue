<template>
    <div class="SignUpForm FormComponents">
        <div v-if="signUpClosed == null">
            <strong>Please wait.</strong>
            We are getting user registration data from server.
        </div>

        <div v-if="signUpClosed == 0">
            <div class="FormComponents-alerts">
                <div class="FormComponents-alerts-warning" v-if="errors.length > 0">
                    <ul v-for="error in errors" :key="error.id">
                        <li>{{ error }}</li>
                    </ul>
                </div>
            </div>

            <div class="FormComponents-inputblock">
                <label for="login-username"> <i class="fas fa-user-astronaut"></i> Pick a username : </label>
                <input type="text" id="login-username" v-model="username">
            </div>

            <div class="FormComponents-inputblock">
                <label for="login-password"> <i class="fas fa-key"></i> Enter a password : </label>
                <input type="password" id="login-password" v-model="password">
            </div>

            <div class="FormComponents-inputblock">
                <button type="button" @click="executeSignUp">
                    <i class="fas fa-lock-open"></i>
                    Sign Up
                </button>
            </div>
        </div>

        <div v-if="signUpClosed == 1">
            New user registration is currently closed. If you want to access to the app you can use 
            <strong>admin</strong> as username and <strong>123456</strong> as password.
        </div>
    </div>
</template>

<script>
    import service from '../service';

    export default {
        name: 'SignUpForm',
        data() {
            return {
                signUpClosed: null,
                username: null,
                password: null,
                errors: []
            }
        },
        created() {
            service.getSignUpStatus()
            .then((res) => {
                this.signUpClosed = (res == "CLOSED") ? 1 : 0;
            });
        },

        methods: {
            executeSignUp() {
                this.errors = [];
                if (this.username && this.password) {
                    service.thisUsernameAlreadyExist(this.username)
                    .then((result) => {
                        if (!result) this.saveNewUser();
                        else this.errors.push("This username was already taken!");
                    });
                } else {
                    this.errors.push("Please pick a username and password");
                }
            },

            saveNewUser() {
                service.setNewUser(this.username, this.password)
                .then(() => this.errors.push("Your account created successfully!"));
            }
        }
    }
</script>

