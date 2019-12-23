<template>
		<b-navbar toggleable="lg" class="navbar navbar-light bg-light">
		<!-- <nav class="navbar navbar-custom"> -->
			<b-navbar-brand to="/">Mimosa</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<template v-if="user.loggedIn">
					<b-navbar-nav>
						<b-nav-item to="/question/new"> New Question & Hypothesis </b-nav-item>
						<b-nav-item to="/userItemList">My items</b-nav-item>
						<!-- <b-nav-item to="/">Hypotheses</b-nav-item> -->
					</b-navbar-nav>

					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto">
						<b-nav-form>
						<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
						<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
						</b-nav-form>

						<!-- <b-nav-item-dropdown text="Lang" right>
						<b-dropdown-item href="#">EN</b-dropdown-item>
						<b-dropdown-item href="#">ES</b-dropdown-item>
						<b-dropdown-item href="#">RU</b-dropdown-item>
						<b-dropdown-item href="#">FA</b-dropdown-item>
						</b-nav-item-dropdown> -->

						<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
							<em class="fa fa-user">Profile</em>
						</template>
						<b-dropdown-item to="/updateProfile">Update Profile</b-dropdown-item>
						<b-dropdown-item to="/updateEmail">Update Email</b-dropdown-item>
						<b-dropdown-item to="/updatePassword">Update Password</b-dropdown-item>
						<b-dropdown-item to="/logout">Sign Out</b-dropdown-item>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</template>
				<template v-else>
					<b-navbar-nav class="ml-auto">
						<b-nav-item to="/login">Login</b-nav-item>
						<b-nav-item to="/register">Register</b-nav-item>
					</b-navbar-nav>
				</template>
			</b-collapse>
		<!--  </nav>  -->
		</b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
	computed: {
		// map the state of this user
		...mapGetters({
			user: "user"
		})
	},
	methods: {
		signOut() {
			firebase
			.auth()
			.signOut()
			.then(() => {
				this.$router.replace({
				name: "home"
				});
			});
		}
	}
};
</script>

<style>
.navbar-custom .navbar-brand, .navbar-custom .navbar-text, 
.navbar-custom .navbar-nav, .navbar-custom .navbar-toggle { 
  color: #3973ac;
  background-color: white;
  padding-left: 30px;
  margin-left: -60px;
}
</style>