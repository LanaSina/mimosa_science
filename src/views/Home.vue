<template>
  <div class="home">
    <!-- <router-link :to="{ name: 'question', params: {id: 'new'} }">New Question and Hypothesis</router-link>

    <router-link :to="{ name: 'login'}">Login</router-link>

    <router-link :to="{ name: 'register'}">Signup</router-link>

    <router-link :to="{ name: 'logout'}">Logout</router-link> -->

    <HomeGrid/>
    <QuestionList />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'
import HomeGrid from '@/components/HomeGrid.vue'

export default {
  name: 'home',
  components: {
    QuestionList,
    HomeGrid
  }
}
</script>

<style  scoped>
div {
  font-size: 11pt;
}
</style>
