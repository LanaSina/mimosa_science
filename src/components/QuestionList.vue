<template>
  <div id="app">
    <div id="question" v-for="(q, idx) in questions">
      <h1>
        <router-link :to="{ name: 'question', params: {id: idx} }">
          Question: {{ q.title }}
        </router-link>
      </h1>
      <p>{{ q.summary }}</p>
      <HypothesesList v-bind:question='q'/>
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
    questions: [],
  }),
  firestore: {

   },
  methods: {
    
  },
  created(){
    let questionsRef = db.collection('questions');
      questionsRef = questionsRef.where('hidden', '==', false).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          } 
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            let question = doc.data();
            question.id = doc.id;
            this.questions.push(question)

          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
  }
}

</script>

<style>
#question {
  border: solid black 1px;
  margin: 20px 10px;
  padding: 20px;
}
</style>
