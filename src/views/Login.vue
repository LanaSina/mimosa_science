<template>
    <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
			<div v-if="verify" class="alert alert-warning">{{verify}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

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
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>

              <div class="col-md-12 ">
                <div class="login-or">
                    <hr class="hr-or">
                    <span class="span-or">or</span>
                </div>
            </div>
            </form>
            <div class="col-md-12 mb-3">
                <p class="text-center">
                    <!-- <a href="javascript:void();" class="google btn mybtn"><i class="fa fa-google-plus" @submit="onSubmitGoogle">
                    </i> Signup using Google
                    </a> -->
                
                <b-form @submit="onSubmitGoogle">
                    <b-button type="submit" variant="primary fa fa-google-plus">Signup using Google</b-button> 
                </b-form>
                </p>
            </div>
            <div class="form-group">
                <p class="text-center">Don't have account? 
                    <!-- <a href="register" id="signup">Sign up here</a> -->
                    <router-link to="register" class="nav-link" id="signup">Sign up here</router-link>
                    </p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
			error: null,
			verify: null
        };
    },
    methods: {
        submit() {
			// var user = firebase.auth().currentUser;
            firebase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(data => {
					if (data.user.emailVerified) {
						this.$router.replace({name: "home"});
					} else {
						this.verify = "Before you can login, you must active your account with the link sent to your email address. If you did not receive this email, please check your junk/spam folder. Any account not verified after a period of 7 days will be permanently removed from the website. If you entered an incorrect email address, you will need to register again with a valid email address.";
						//  Click here to resend the activation email.";
						data.user.sendEmailVerification().then(d => {
							// Email sent
							console.log("Email sent");
						}).catch(e => {
							// An error happened.
							console.log(e.message);
						});
						firebase.auth().signOut();
					}
                })
                .catch(err => {
                    this.error = err.message;
				});
		},
        onSubmitGoogle(evt) {
            evt.preventDefault()
            var navigate = this.$router;
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase
                .auth()
                .signInWithPopup(provider)
                .then(function(result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
					var user = result.user;
					if (result.additionalUserInfo.isNewUser) {
						user.sendEmailVerification().then(d => {
							// Email sent
							console.log("Email sent");
						}).catch(e => {
							// An error happened.
							console.log(e.message);
						});
						firebase.auth().signOut();
					}
                    navigate.push('/');
                // ...
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var error_code = error.code;
                    var error_message = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;

                    var error_str = "Error ";
                    error_str = error_str.concat(error_code, ': ', error_message);
                    alert(error_str);
                    // ...
                });
        }
    }
};
</script>

<style scoped>
body{
    padding-top:4.2rem;
    padding-bottom:4.2rem;
    background:rgba(0, 0, 0, 0.76);
}
a{
    text-decoration:none !important;
}
        
.myform{
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
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 1.1rem;
    outline: 0;
    max-width: 500px;
}
.tx-tfm{
    text-transform:uppercase;
}
.mybtn{
    border-radius:50px;
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
    color:#666;
    width:100%;
    height:40px;
    text-align:center;
    outline:none;
    border: 1px solid lightgrey;
}
form .error {
    color: #ff0000;
}
</style>