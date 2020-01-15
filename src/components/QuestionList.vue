<template>
  <div class="container">
    <!-- <div class="row"> -->
        <!-- <div class="col-lg-6" v-for="q in questionsPerPage" :key="q.id" id="allQuestions"> -->
          <div class="card" v-for="q in questionsPerPage" :key="q.id" id="allQuestions">

            <!-- Begin: rating -->
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
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
              <div class="card-options">
                <button class="btn-options" type="button" id="" @click="AddToFavoriteQuestions()">
                  <i class="material-icons">favorite</i>
                </button>
              </div>
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
          <!-- </div> -->
      <!-- </div> -->
      <!-- Pagination -->
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="allQuestions"
        ></b-pagination>
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
    show_update: [],
    perPage: 10,
    currentPage: 1
  }),
  firestore: {

  },

  computed: {
    questionsPerPage() {
      // Return a sub-array containing `perPage` questions
      return this.questions.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    },

    rows() {
      // Return the total number of questions.
      return this.questions.length
    }
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
