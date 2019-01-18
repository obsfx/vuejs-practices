<template>
  <div id="app">
    <div class="container">
		<div class="info">
			<div>
				<a href="https://vuejs.org/" target="_blank"><img src="./assets/vuejs.png"></a>
				<a href="https://firebase.google.com/" target="_blank"><img src="./assets/firebase.png"></a>
			</div>
			<h4>VueJS practices #1</h4>
			<div>a basic todo app which created with vuejs and firebase</div>
			<div><a href="https://github.com/obsfx/vuejs-practices"><i class="fab fa-github"></i> Github Repo</a></div>
		</div>

		<LoginOrSignUp 	v-if="!userLogin" 
						v-on:SetUserLogin=setUserLogin>
		</LoginOrSignUp>

		<Main 	v-if="userLogin" 
				v-on:LogOut="logOut"
				:userData=userData>
		</Main>
    </div>
  </div>
</template>

<script>
	import Main from "./components/Main";
	import LoginOrSignUp from './components/LoginOrSignUp';

	export default {
		name: "App",
		components: { Main, LoginOrSignUp },
		created() {
			let isJson = true;
			let data;

			try {
				data = JSON.parse(document.cookie);
			} catch(e) {
				isJson = false;
			}

			if (isJson) this.setUserLogin(JSON.parse(document.cookie));
		},
		data() {
			return {
				userLogin: false,
				userData: null
			}
		},
		methods: {
			setUserLogin(data) {
				document.cookie = `{"userkey": "${data.userkey}", "username": "${data.username}", "password": "${data.password}"}`;
				this.userLogin = true;
				this.userData = data;
			},

			logOut() {
				this.userLogin = false;
				this.userData = null;
				document.cookie = "";
			}
		}
	};
</script>

<style lang="scss">
	@import "scss/main.scss";
</style>