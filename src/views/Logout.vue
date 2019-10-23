<template>
  <div class="home">
    <router-link to="/">Home</router-link>
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
   
  }),
  mounted: function() {
    firebase.auth().signOut().then(this.onUserLogout).catch(function(error) {
        // An error happened.
        var error_code = error.code;
        var error_message = error.message;
        let error_str = "Error: "
        error_str = error_str.concat(error_code, ': ', error_message);
        alert(error_str);
      });
  },
  methods: {
    onUserLogout: function() {
      alert("Logged out sucessfully");
      this.$router.push("/");
    }
  },
}
</script>
