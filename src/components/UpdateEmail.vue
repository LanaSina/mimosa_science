<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Update your email address</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">New Email*</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value=
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Update Email</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
    computed: {
		// map `this.user` to `this.$store.getters.user`
		...mapGetters({
			user: "user"
		})
	},

	data() {
		return {
			form: {
				email: ""
			},
			error: null
		};
	},
	methods: {
		submit() {
			var user = firebase.auth().currentUser;
			user.updateEmail(this.form.email).then(data => {
				// Update successful
				if (!user.emailVerified) {
					user.sendEmailVerification().then(function() {
					// Email sent.
					}).catch(function(error) {
					// An error happened.
					});
				}	

				firebase.auth().signOut().then(d => {
					// Sign-out successful.
					this.$router.replace({name: "login"});
					console.log('User Logged Out!');
				}).catch(e => {
				// An error happened.
					console.log(e);
					this.error = e.message;
				});
				
			}).catch(err => {
				this.error = err.message;
			});
		},
	}
};
</script>