<template>
  <div id="q-bg-block">
    <div v-for="(q, idx) in questions">
      <div id="q-title-block">
        <div id="question-title">
          <h1>
            <router-link :to="{ name: 'question', params: {id: q.id} }">
              {{ q.title }}
            </router-link>
          </h1>
        </div>
      </div>
      <p id="context">{{ q.summary }}</p>
      <HypothesesList v-bind:question='q'/>
    </div>
  </div>
</template>

<script>

import {db} from '../main';
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
  created(){
    let questionsRef = db.collection('questions');
    questionsRef = questionsRef.where('hidden', '==', false).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        } 
        snapshot.forEach(doc => {
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
#q-bg-block{
  width: 100vw;
  position: relative;
  background-color: #e6f2ff;
  padding-left: 5vw;
  padding-right: 5vw;
}
#q-title-block{
  background-color: #003399;
  margin-left: -5vw;
  padding-left: 5vw;
  margin-right: -5vw;
  padding-right: 5vw;
}
h1 a:link, h1 a:visited, h1 a:hover, h1 a:active  {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 0.9em;
  color: white;
  background-size : cover;
  display: inline-block;
}
</style>
