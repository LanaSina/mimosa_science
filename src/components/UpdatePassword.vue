<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Update your personal information</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
                
                <div class="form-group row">
                    <label for="new_password1" class="col-md-4 col-form-label text-md-right">New Password*</label>

                    <div class="col-md-6">
                        <input
                            id="new_password1"
                            type="password"
                            class="form-control"
                            name="password"
                            required
                            v-model="form.new_password1"
                        />
                    </div>
                </div>

                <div class="form-group row">
                    <label for="new_password2" class="col-md-4 col-form-label text-md-right">Retype Password*</label>

                    <div class="col-md-6">
                        <input
                            id="new_password2"
                            type="password"
                            class="form-control"
                            name="password"
                            required
                            v-model="form.new_password2"
                        />
                    </div>
                </div>

                <div class="form-group row mb-0">
                    <div class="col-md-8 offset-md-4">
                        <button type="submit" class="btn btn-primary">Update password</button>
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
                new_password1: "",
                new_password2: ""
            },
            error: null
        };
    },
    methods: {
        submit() {
            var user = firebase.auth().currentUser;
            if (this.form.new_password1 != this.form.new_password2) {
                this.error = "The passwords are not the same!";
            } else {
                user.updatePassword(this.form.new_password1).then(data => {
                    // Update successful
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
            }
        },
    }
};
</script>
