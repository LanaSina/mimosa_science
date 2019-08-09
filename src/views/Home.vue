<template>
  <div class="home">
    <router-link :to="{ name: 'question', params: {id: 'new'} }">New Question and Hypothesis</router-link>
    <QuestionList />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'home',
  components: {
    QuestionList
  }
}
</script>
