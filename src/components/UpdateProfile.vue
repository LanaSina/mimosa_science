<template>
    <div class="container" v-if="user">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Update your personal information</div>
                    <div class="card-body">
                        <div v-if="error" class="alert alert-danger">{{error}}</div>
                        <form action="#" @submit.prevent="submit">
                            <div class="form-group row">
                                <label for="name" class="col-md-4 col-form-label text-md-right">Name*</label>
                                <div class="col-md-6" v-if="user">
                                    <input
                                        id="name"
                                        type="name"
                                        class="form-control"
                                        name="name"
                                        value
                                        required
                                        autofocus
                                        placeholder=""
                                        v-model="form.name"
                                    >
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">Update</button>
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
                name: ""
            },
            error: null
        };
    },

    created() {
        this.form.name = firebase.auth().currentUser.displayName;
    },
    
    methods: {
        submit() {
            var user = firebase.auth().currentUser;
            user.updateProfile({displayName: this.form.name}).then(data => {
                // Update successful
                this.$router.push({name: 'home'});
            }).catch(err => {
                // this.error = err.message;
            });
        },
    }
};
</script>
