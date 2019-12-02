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
            <b-button href="#" variant="primary" @click="readQuestion(questions_id[idx])">Read more</b-button>
            <b-button href="#" variant="warning" @click="updateHypothesis(questions_id[idx], h.id)">Update</b-button>
          </b-card>
        </div>
      </b-tab>
      <!-- End Hypotheses -->

      <!-- Start Experiments -->
      <b-tab title="Experiments">
        <div v-for="(e, idx) in experiments">
          <b-card title="Title of the experiment">
            <b-card-text>
              <h5>Methods: </h5>
              <span v-html="e.methods"/>
              <h5>Results: </h5>
              <span v-html="e.results"/>
            </b-card-text>
            <b-button href="#" variant="primary" @click="readQuestion(questions_id_exp[idx])">Read more</b-button>
            <b-button href="#" variant="warning" @click="updateExperiment(questions_id_exp[idx], hypotheses_id_exp[idx], e.id)">Update</b-button>
          </b-card>
        </div>
      </b-tab>
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
    experiments: [],
    questions_id: [], // Id of questions containing hypotheses of a user
    questions_id_exp: [], // Id of questions containing experiments of a user
    hypotheses_id_exp: [], // Id of hypotheses containing experiments of a user 
  }),

  created() {
    // TODO (combine the below queries into one BIG QUERY?)

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
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching questions.');
          return;
        } 
        snapshot.forEach(doc => {
          var q_id = doc.id
          let hypRef = db.collection('questions').doc(doc.id).collection('hypotheses').where('parent', '==', '').get().then(snapshot => {
            snapshot.forEach(doc => {
              let hyp = doc.data();
              hyp.id = doc.id;
              if(hyp.userId == firebase.auth().currentUser.uid){
                this.hypotheses.push(hyp);
                this.questions_id.push(q_id);
              }
            })
          }).catch(err => {
            console.log("Error getting hypothesis", err);
          })
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });

    // Experiments
    // This is ugly, probably firebase provides a clean way of getting the 
    // parent collection of a given subcollection?
    let qRef2 = db.collection('questions')
      .where('hidden', '==', false)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching questions.');
          return;
        } 
        snapshot.forEach(doc => {
          var q_id = doc.id
          let hypRef2 = db.collection('questions').doc(doc.id).collection('hypotheses').where('parent', '==', '').get().then(snapshot => {
            snapshot.forEach(doc => {
              var h_id = doc.id
              let expRef = db.collection('questions').doc(q_id).
              collection('hypotheses').doc(doc.id).collection('experiments').get().then(snapshot => {
                snapshot.forEach(doc => {
                  let exp = doc.data();
                  exp.id = doc.id;
                  if(exp.userId === firebase.auth().currentUser.uid) {
                    this.experiments.push(exp);
                    this.questions_id_exp.push(q_id);
                    this.hypotheses_id_exp.push(h_id);
                  }
                });
              }).catch(err => {
                console.log('Error getting the experiment', err);
              })
            });
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
    },
    updateHypothesis: function (q_id, hyp_id) {
      this.$router.push("/updateHypothesis/" + q_id + "/hypothesis/" + hyp_id);
    },
    updateExperiment: function (q_id, hyp_id, e_id) {
      this.$router.push("/updateExperiment/" + q_id + "/hypothesis/" + hyp_id + '/experiment/' + e_id) ;
    }

  }
}
</script>
