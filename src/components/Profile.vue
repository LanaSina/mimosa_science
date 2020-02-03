<template>
    <div class="container">
        <b-tabs content-class="mt-3">
            <b-tab title="Update Profile" active> 
                <UpdateProfile/>
            </b-tab>

            <b-tab title="Update Email">
                <UpdateEmail/>
            </b-tab>

            <b-tab title="Update Password">
                <UpdatePassword/>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import UpdateEmail from '@/components/UpdateEmail.vue'
import UpdateProfile from '@/components/UpdateProfile.vue'
import UpdatePassword from '@/components/UpdatePassword.vue'

export default {
    name: 'Profile',

    components: {
        UpdateEmail,
        UpdatePassword,
        UpdateProfile
    }
}
</script>
            