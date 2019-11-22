<template>
  <div>
    <div v-for="(q, idx) in questions">
      <div id="q-bg-block">
        <div id="question-title">
          <h1>
            <router-link :to="{ name: 'question', params: {id: q.id} }">
              {{ q.title }} 
            </router-link> 
            <button v-if="show_update[idx]" class="btn btn-mini btn-warning" @click="updateQuestion(q.id)" id="updateButton">
              Update
            </button>
          </h1>
        </div>
      </div>
      <p id="context">{{ q.summary }}</p>
      <HypothesesList v-bind:question='q'/>
      <!-- <div v-if="show_update[idx]">
        <button class="btn btn-outline-warning" @click="updateQuestion(q.id)">
          Update
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import {db} from '../main';
import HypothesesList from '@/components/HypothesesList.vue'

export default {
  name: 'app',
  components: {
    HypothesesList
  },
  data: () => ({
    questions: [],
    show_update: []
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
          this.questions.push(question);
          this.show_update.push(firebase.auth().currentUser.uid == question.userId);
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  },

  methods: {
    updateQuestion: function (question_id) {
      this.$router.push("/updateQuestion/" +question_id);
    }
  }
}

</script>

<style>
#q-bg-block{
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: #3973ac;
}
h1 a:link, h1 a:visited, h1 a:hover, h1 a:active  {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 0.9em;
  color: white;
  padding-bottom: 15px;
  padding-top: 15px;
  padding-left: 30px;
  background-size : cover;
  /* display: inline-block; */
}

/* #updateButton {
  display: inline-block;
} */
</style>
