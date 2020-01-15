<template>
  <div class="container">
    <b-tabs content-class="mt-3">
      <!-- Start questions -->
      <b-tab title="Questions" active>
        <div class="card" v-for="(q, idx) in questions">
          <!-- Begin: rating -->
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width:80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
            <!-- End rating -->
            <div class="card-body">
              <div class="card-title">
                <router-link :to="{ name: 'question', params: {id: q.id} }">
                  <h5>{{ q.title }} </h5>
                </router-link>
              </div>
              <!-- List of the most active users with their avatars??? -->
              <ul class="avatars">
                <li>
                  <a href="#" data-toggle="tooltip" title="Oury Diallo">
                    <img alt="Oury" class="avatar filter-by-alt" src="../assets/images/user-avatar.png" data-filter-by="alt">
                  </a>
                </li>
                <li>
                  <a href="#" data-toggle="tooltip" title="Lana Sinapayen">
                    <img alt="Lana" class="avatar filter-by-alt" src="../assets/logo.png" data-filter-by="alt">
                  </a>
                </li>
                <li>
                  <a href="#" data-toggle="tooltip" title="Unknown Unknowm">
                    <img alt="Unknown" class="avatar filter-by-alt" src="../assets/images/user-avatar.png" data-filter-by="alt">
                  </a>
                </li>
                <li>
                  <a href="#" data-toggle="tooltip" title="Lana Sinapayen">
                    <img alt="Lana" class="avatar filter-by-alt" src="../assets/logo.png" data-filter-by="alt">
                  </a>
                </li>
              </ul>
              <!-- End list of avatars -->

              <!-- Card Optional menu -->
              <div class="dropdown card-options">
                <button class="btn-options" type="button" id="dropDownOptionalMenu" data-toggle="dropdown" aria-haspopup="true" >
                  <i class="material-icons">more_vert</i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropDownOptionalMenu">
                  <a class="dropdown-item" href="#">Edit</a>
                  <a class="dropdown-item" href="#">Invite people</a>
                  <a class="dropdown-item" href="#">Make public</a>
                  <a class="dropdown-item" href="#">Share</a>
                  <a class="dropdown-item" href="#">Archive</a>
                </div>
              </div>
              <!-- End optional menu -->
              
              <div class="card-text" v-if="q.summary.length < 600">
                  {{q.summary}}
              </div>
              <div class="card-text" v-else>
                {{q.summary.substring(0, 600)+ "..."}}
              </div>
              <div class="card-meta d-flex justify-content-between">
							<div class="d-flex align-items-center">
								<i class="material-icons mr-1" title="Number of comments">comment</i>
								<span class="text-small">120</span> <span>&nbsp;</span>
                <i class="material-icons mr-1" title="Number of views">remove_red_eye</i>
								<span class="text-small">1k</span><span>&nbsp;</span>
                <i class="material-icons mr-1" title="Number of participants">group</i>
								<span class="text-small">15</span><span>&nbsp;</span>
							</div>
							<span class="text-small">Last modified: {{q.createdAt.toDate() | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</span>
						</div>
              
            </div>
          </div>

        <!-- <div class="card" v-for="(q, idx) in questions">
          <b-card :title="q.title">
            <b-card-text>
              {{q.summary}}
            </b-card-text>
            <b-button href="#" variant="primary" @click="readQuestion(q.id)">Read more</b-button>
            <b-button href="#" variant="warning" @click="updateQuestion(q.id)">Update</b-button>
          </b-card>
        </div> -->
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
    let qRef = db.collection('questions')
      //.where('hidden', '==', false)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching questions.');
          return;
        } 
        snapshot.forEach(doc => {
          let question = doc.data();
          question.id = doc.id;
          if(question.userId == firebase.auth().currentUser.uid){
            this.questions.push(question);
          }
          let hypRef = db.collection('questions').doc(doc.id).collection('hypotheses').where('parent', '==', '').get().then(snapshot => {
            snapshot.forEach(doc => {
              let hyp = doc.data();
              hyp.id = doc.id;
              if(hyp.userId == firebase.auth().currentUser.uid){
                this.hypotheses.push(hyp);
                this.questions_id.push(question.id);
              }
              let expRef = db.collection('questions').doc(question.id).
              collection('hypotheses').doc(doc.id).collection('experiments').get().then(snapshot => {
                snapshot.forEach(doc => {
                  let exp = doc.data();
                  exp.id = doc.id;
                  if(exp.userId === firebase.auth().currentUser.uid) {
                    this.experiments.push(exp);
                    this.questions_id_exp.push(question.id);
                    this.hypotheses_id_exp.push(hyp.id);
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
