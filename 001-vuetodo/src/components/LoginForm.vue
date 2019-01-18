<template>
    <div class="LoginForm FormComponents">
        <div class="FormComponents-alerts">
            <div class="FormComponents-alerts-warning" v-if="warning">
                Please check your username or password
            </div>
        </div>

        <div class="FormComponents-inputblock">
            <label for="login-username"> <i class="fas fa-user-astronaut"></i> Username : </label>
            <input type="text" id="login-username" v-model="username">
        </div>

        <div class="FormComponents-inputblock">
            <label for="login-password"> <i class="fas fa-key"></i> Password : </label>
            <input type="password" id="login-password" v-model="password">
        </div>

        <div class="FormComponents-inputblock">
            <button type="button" @click="executeLogin">
                <i class="fas fa-lock-open"></i>
                Login
            </button>
        </div>
    </div>
</template>

<script>
    import service from '../service';

    export default {
        name: 'LoginForm',
        data() {
            return {
                username: "",
                password: "",
                warning: false
            }
        },
        methods: {
            executeLogin() {
                this.warning = false;
                if (this.username && this.password) {
                    service.authUser(this.username, this.password).then((result) => {
                        if (!result) this.warning = true;    
                        else this.$emit("LoggedIn", {username: this.username, password: this.password, userkey: result});
                    });
                } else {
                    this.warning = true;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../scss/components/FormComponents.scss';
</style>
