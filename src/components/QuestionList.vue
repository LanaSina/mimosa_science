<template>
  <div id="app">
    <div id="question" v-for="(q, idx) in questions">
      <h1>
        <router-link :to="{ name: 'question', params: {id: idx} }">
          Question: {{ q.title }}
        </router-link>
      </h1>
      <template v-for="h in q.hypotheses">
        <h2>
          <router-link :to="{ name: 'hypothesis', params: {id: idx} }">
            Hypothesis: {{ h.title }}
          </router-link>
        </h2>
        <ul>
          <template v-for="e in h.experiments">
            <li> {{e.title}} </li>
            result:
            <p> {{e.result}} </p>
          </template>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>

import db from '@/plugins/firebase';


export default {
  name: 'app',
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
