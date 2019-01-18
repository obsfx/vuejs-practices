<template>
    <div class="LoginOrSignUp">
        <h1>Login or Sign Up to Access</h1>
        <div class="LoginOrSignUp-form">
            <div class="LoginOrSignUp-form-selection">
                <div class="LoginOrSignUp-form-selection-item" 
                    :class="{active: (activeForm == 'LOGIN_FORM')}"
                    @click="setActiveForm('LOGIN_FORM')">
                    <i class="fas fa-sign-in-alt"></i> Login
                </div>

                <div class="LoginOrSignUp-form-selection-item"
                    :class="{active: (activeForm == 'SIGNUP_FORM')}"
                    @click="setActiveForm('SIGNUP_FORM')">
                    <i class="fas fa-user-plus"></i> Sign Up
                </div>
            </div>

            <div class="LoginOrSignUp-form-activeform">
                <LoginForm v-if="activeForm == 'LOGIN_FORM'" v-on:LoggedIn="setLoggedIn"></LoginForm>
                <SignUpForm v-if="activeForm == 'SIGNUP_FORM'"></SignUpForm>
            </div>
        </div>
    </div>
</template>

<script>
    import LoginForm from './LoginForm';
    import SignUpForm from './SignUpForm';

    export default {
        name: 'LoginOrSignUp',
        components: { LoginForm, SignUpForm },
        data() {
            return {
                activeForm: "LOGIN_FORM"
            }
        },
        methods: {
            setActiveForm(value) {
                this.activeForm = value;
            },

            setLoggedIn(data) {
                this.$emit("SetUserLogin", data); 
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/components/LoginOrSignUp.scss';
</style>
