<template>
  <div id="app">
    <div id="question" v-for="(q, idx) in questions">
      <h1>
        <router-link :to="{ name: 'question', params: {id: idx} }">
          Question: {{ q.title }}
        </router-link>
      </h1>
      <p>{{ q.summary }}</p>
      <HypothesesList v-bind:question='q' />
    </div>
  </div>
</template>

<script>

import db from '@/plugins/firebase';
import HypothesesList from '@/components/HypothesesList.vue'

export default {
  name: 'app',
  components: {
    HypothesesList
  },
  data: () => ({
    questions: []
  }),
  firestore: {
    questions: db.collection('questions'),
  },
}
</script>

<style>
#question {
  border: solid black 1px;
  margin: 20px 10px;
  padding: 20px;
}
</style>
