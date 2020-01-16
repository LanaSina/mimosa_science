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
              <b-navbar-nav class="ml-auto card-options">
                <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template v-slot:button-content>
                    <i class="btn-options material-icons">more_vert</i>
                  </template>
                  <b-dropdown-item :to="{ name: 'updateQuestion', params: {id: q.id} }">Edit</b-dropdown-item>
                  <b-dropdown-item to="#">Invite people</b-dropdown-item>
                  <b-dropdown-item to="#">Make public</b-dropdown-item>
                  <b-dropdown-item to="#">Share</b-dropdown-item>
                  <b-dropdown-item to="#">Archive</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
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
                <i class="material-icons mr-1" title="Number of likes">favorite</i>
                <span class="text-small">{{q.likes}}</span><span>&nbsp;</span>
							</div>
							<span v-if="q.modifiedOn" class="text-small">Last modified: {{q.modifiedOn | formatDate}} </span>
                <span v-else class="text-small">Last modified: {{q.createdAt | formatDate}}</span>
						</div>
              
            </div>
          </div>
        </b-tab>
      <!-- End questions -->

      <!-- Start Hypotheses -->
      <b-tab title="Hypotheses">
        <div class="card" v-for="(h, idx) in hypotheses">
          <!-- Begin: rating -->
          <!-- <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width:80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
          </div> -->
            <!-- End rating -->
          <div class="card-body">
            <div class="card-title">
              <router-link :to="{ name: 'question', params: {id: questions_id[idx]} }">
                <h5>{{ h.title }} </h5>
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
            <div class="card-options">
              <b-button href="#" class="btn-options" @click="updateHypothesis(questions_id[idx], h.id)"><i class="btn-options material-icons">edit</i></b-button>
            </div>
            
            <!-- End optional menu -->
            
            <div class="card-text" v-if="h.summary.length < 600">
                {{h.summary}}
            </div>
            <div class="card-text" v-else>
              {{h.summary.substring(0, 600)+ "..."}}
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
            <span v-if="h.modifiedOn" class="text-small">Last modified: {{h.modifiedOn | formatDate}} </span>
            <span v-else class="text-small">Last modified: {{h.createdAt | formatDate}}</span>
          </div>
              
            </div>
          </div>
      </b-tab>
      <!-- End Hypotheses -->

      <!-- Start Experiments -->
      <b-tab title="Experiments">
        <div class="card" v-for="(e, idx) in experiments">
          <!-- Begin: rating -->
          <!-- <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width:80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
          </div> -->
            <!-- End rating -->
          <div class="card-body">
            <div class="card-title">
              <router-link :to="{ name: 'question', params: {id: questions_id_exp[idx]} }">
                <h5>Title of the experiment </h5>
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
            <div class="card-options">
              <b-button href="#" class="btn-options" @click="updateExperiment(questions_id_exp[idx], hypotheses_id_exp[idx], e.id)"><i class="btn-options material-icons">edit</i></b-button>
            </div>
            
            <!-- End optional menu -->
            
            <h5>Methods: </h5>
              <span v-html="e.methods"/>
              <h5>Results: </h5>
              <span v-html="e.results"/>
            <div class="card-meta d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <i class="material-icons mr-1" title="Number of comments">comment</i>
              <span class="text-small">120</span> <span>&nbsp;</span>
              <i class="material-icons mr-1" title="Number of views">remove_red_eye</i>
              <span class="text-small">1k</span><span>&nbsp;</span>
              <i class="material-icons mr-1" title="Number of participants">group</i>
              <span class="text-small">15</span><span>&nbsp;</span>
            </div>
            <span v-if="e.modifiedOn" class="text-small">Last modified: {{e.modifiedOn | formatDate}} </span>
            <span v-else class="text-small">Last modified: Yesterday</span>
            <!-- <span class="text-small">Last modified: {{h.createdAt | formatDate}}</span> -->
          </div>
              
            </div>
          </div>
      </b-tab>
      <!-- End Experiments -->
    </b-tabs>
  </div>
</template>

<script>
import firebase from "firebase"
import { mapGetters } from "vuex"
import moment from "moment"
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

  filters: {
    formatDate(val) {
      if (!val) {
        return '-'
      }
      return moment(val.toDate()).fromNow()
    }
  },

  created() {
    let qRef = db.collection('questions')
      .orderBy('createdAt', 'desc')
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
