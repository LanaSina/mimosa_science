<template>
  <div class="home">
    <router-link to="/">Home</router-link>

    <div>

      <h2> Sign in using Google </h2>

      <b-form @submit="onSubmitGoogle">
        <b-button type="submit" variant="primary">Authenticate</b-button> 
      </b-form>

      <h2> Sign in using your email address </h2>

      <b-form @submit="onSubmitEmail" v-if="show">

        <b-form-group id="email_group" label="Email*:" label-for="email" label-cols-sm="1">

          <b-form-input id="email" type="email" v-model='email'></b-form-input>
          <!-- This will only be shown if the preceding input has an invalid state -->
          <b-form-invalid-feedback id="input-live-feedback">
            Enter at least 3 letters
          </b-form-invalid-feedback>

        </b-form-group>

        <b-form-group id="password_group" label="Password*:" label-for="password" label-cols-sm="1">
          <b-form-input id="password" type="password" v-model='password'></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
              Error when confirming password.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="confirm_password_group" label="Confirm password*:" label-for="confirm_password" label-cols-sm="1">
          <b-form-input id="confirm_password" type="password" v-model='password_confirm'></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    
  </div>

</template>

<script>
import Form from '@/components/Form.vue'
const firebase = require('firebase/app');
require('firebase/auth');

export default {
  name: 'home',
  components: {
    
  },
  data: () => ({
    show: true,
    email: '',
    password: '',
    password_confirm: '',
    email_state: true,
    password_state: true,
  }),
  computed: {
    // emailState() {
    //   return this.email.length > 2 ? true : false
    // }
  },
  methods: {
    onSubmitEmail(evt) {
      evt.preventDefault()
      if(this.password!=this.password_confirm){
        password_confirm = false;
      } else {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
          // Handle Errors here.
          var error_code = error.code;
          var error_message = error.message;

          let error_str = error_code.concat(': ', error_message);
          alert(error_str);

          console.log('Error: ', error.message);
        });

        alert("User created!");
        this.$router.push('/');
      }
    },
    onSubmitGoogle(evt) {
      evt.preventDefault()

      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        this.$router.push('/');
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var error_code = error.code;
        var error_message = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        let error_str = error_code.concat(': ', error_message);
        alert(error_str);
        // ...
      });
    }

  },
}
</script>
