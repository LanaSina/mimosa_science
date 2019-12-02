<template>
  <div>
    <b-tabs content-class="mt-3">
      <!-- Start questions -->
      <b-tab title="Questions" active>
        <div v-for="(q, idx) in questions">
          <b-card :title="q.title">
            <b-card-text>
              {{q.summary}}
            </b-card-text>
            <b-button href="#" variant="primary" @click="readQuestion(q.id)">Read more</b-button>
            <b-button href="#" variant="warning" @click="updateQuestion(q.id)">Update</b-button>
          </b-card>
        </div>
      </b-tab>
      <!-- End questions -->

      <!-- Start Hypotheses -->
      <b-tab title="Hypotheses">
        <div v-for="(h, idx) in hypotheses">
          <b-card :title="h.title">
            <b-card-text>
              {{h.summary}}
            </b-card-text>
            <b-button href="#" variant="primary" @click="readQuestion(q.id)">Read more</b-button>
            <b-button href="#" variant="warning" @click="updateQuestion(q.id)">Update</b-button>
          </b-card>
        </div>
      </b-tab>
      <!-- End Hypotheses -->

      <!-- Start Experiments -->
      <b-tab title="Experiments"><p>Experiments</p></b-tab>
      <!-- End Experiments -->
    </b-tabs>
  </div>
</template>

<script>
import firebase from "firebase"
import { mapGetters } from "vuex"
import { db } from '../main'
export default {
  name: 'userItemList2',

  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  data: () => ({
    questions: [],
    hypotheses: [],
    allQuestions: []
  }),

  created() {
    // Questions
    let questionsRef = db.collection('questions')
      .where('hidden', '==', false)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        } 
        snapshot.forEach(doc => {
          let question = doc.data();
          question.id = doc.id;
          if(question.userId == firebase.auth().currentUser.uid){
            this.questions.push(question);
          }
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    
    // Hypotheses
    let qRef = db.collection('questions')
      .where('hidden', '==', false)
      // .collection('hypotheses')
      // .where('parent', '==', '')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        } 
        snapshot.forEach(doc => {
          let hypRef = db.collection('questions').doc(doc.id).collection('hypotheses').where('parent', '==', '').get().then(snapshot => {
            snapshot.forEach(doc => {
              let hyp = doc.data();
              hyp.id = doc.id;
              if(hyp.userId == firebase.auth().currentUser.uid){
                this.hypotheses.push(hyp);
              }
            })
          }).catch(err => {
            console.log("Error getting hypothesis", err);
          })
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });
  },

  methods: {
    readQuestion: function (question_id) {
      this.$router.push("/question/" +question_id);
    },
    updateQuestion: function (question_id) {
      this.$router.push("/updateQuestion/" +question_id);
    }
  }
}
</script>
