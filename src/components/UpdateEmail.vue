<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Update your personal information</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <!-- <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name*</label>
                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div> -->
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email*</label>

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

              <!-- <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password*</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div> -->

              <!-- <div class="form-group row">
                <label
                  for="confirm_password"
                  class="col-md-4 col-form-label text-md-right"
                >Confirm password*</label>

                <div class="col-md-6">
                  <input
                    id="confirm_password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.confirm_password"
                  />
                </div>
              </div> -->

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
        user.updateEmail(this.form.email).then(function() {
          // Update successful.
          this.$router.push("/logout");
          // this.$router.push("/login");
        }).catch(function(error) {
          // An error happened.
        });
		},
  }
};
</script>

<style scoped>
body {
  padding-top: 4.2rem;
  padding-bottom: 4.2rem;
  background: rgba(0, 0, 0, 0.76);
}
a {
  text-decoration: none !important;
}

.myform {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  padding: 1rem;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1.1rem;
  outline: 0;
  max-width: 500px;
}
.tx-tfm {
  text-transform: uppercase;
}
.mybtn {
  border-radius: 50px;
}

.login-or {
  position: relative;
  color: #aaa;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.span-or {
  display: block;
  position: absolute;
  left: 50%;
  top: -2px;
  margin-left: -25px;
  background-color: #fff;
  width: 50px;
  text-align: center;
}
.hr-or {
  height: 1px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.google {
  color: #666;
  width: 100%;
  height: 40px;
  text-align: center;
  outline: none;
  border: 1px solid lightgrey;
}
form .error {
  color: #ff0000;
}
</style>
