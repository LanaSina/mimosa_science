<template>
  <div class="container">
    <div class="row">
        <div class="col-lg-6" v-for="q in questionsPerPage" :key="q.id" id="allQuestions">
          <div class="card">

            <!-- Begin: rating -->
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <!-- End rating -->
            <b-card>
              <b-card-title>
                <h5><router-link :to="{ name: 'question', params: {id: q.id} }">
                {{ q.title }} 
              </router-link> </h5>
              </b-card-title>
              <b-card-text v-if="q.summary.length < 60">
                {{q.summary}}
              </b-card-text>
              <b-card-text v-else>
                {{q.summary.substring(0, 60)+ "..."}}
              </b-card-text>
              <!-- TODO( "Show the last update date instead of the creation date") -->
              <small class="text-muted">Last modified: {{q.createdAt.toDate()}}</small>
            </b-card>
          </div>
          </div>
      </div>
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
    perPage: 4,
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


