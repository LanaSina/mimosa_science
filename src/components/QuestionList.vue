<template>
  <div id="q-bg-block">
    <div v-for="(q, idx) in questions">
      <div id="q-title-block">
        <div id="question-title">
          <h1>
            <router-link :to="{ name: 'question', params: {id: q.id} }">
              {{ q.title }} 
            </router-link> 
            <button v-if="showMyItems" class="btn btn-warning" @click="updateQuestion(q.id)" id="updateButton">
              <i class="fa fa-edit"></i>
            </button>
          </h1>
        </div>
      </div>
      <p id="context">{{ q.summary }}</p>
      <HypothesesList v-bind:question='q'/>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import { mapGetters } from "vuex"
import {db} from '../main';
import HypothesesList from '@/components/HypothesesList.vue'

export default {
  name: 'app',
  props: {
    showMyItems: {
      type: Boolean
    }
  },

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
    var questionsRef = db.collection('questions');
    
    //console.log(user.uid);
    if (this.showMyItems) {
      let user = firebase.auth().currentUser;
      questionsRef = questionsRef.where('hidden', '==', false)
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          } 
          snapshot.forEach(doc => {
            let question = doc.data();
            question.id = doc.id;
            this.questions.push(question);
            if (user) {
              this.show_update.push(user.uid == question.userId);
            }

          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    } else {
      questionsRef = questionsRef.where('hidden', '==', false)
        .orderBy('createdAt', 'desc')
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          } 
          snapshot.forEach(doc => {
            let question = doc.data();
            question.id = doc.id;
            this.questions.push(question);
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }
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
  padding-left: 5vw;
  padding-right: 5vw;
}
#q-title-block{
  background-color: #003399;
  margin-left: -5vw;
  padding-left: 5vw;
  margin-right: -5vw;
  padding-right: 5vw;
  padding-top: 20px;
  padding-bottom: 5px;
}
h1 a:link, h1 a:visited, h1 a:hover, h1 a:active  {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 0.9em;
  color: white;
  background-size : cover;
  /* display: inline-block; */
}

/* #updateButton {
  display: inline-block;
} */
</style>
