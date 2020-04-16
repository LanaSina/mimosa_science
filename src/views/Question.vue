<template>
  <div class="container">
    <!-- <router-link to="/">Home</router-link> -->

    <div>
        <!-- Initialize the statistics of a question -->
        <!-- <button type="button" @click="initializingParticipants()">
          <i class="material-icons">edit</i>
        </button> -->
      <div v-if="question" id="question">
        <h1>
              Question: {{ question.title }}
        </h1>
        <p>{{ question.summary }}</p>
        <HypothesesList v-bind:question='question'/>

        <!-- <h2> Add your proposed hypothesis here: </h2>
        <br/> -->
        <b-button v-b-modal="'my-modal'">Add your hypothesis (Modal)</b-button>

        <b-modal id="my-modal" size="xl" title="Add your hypothesis">
        <Form v-bind:question='question'/>
        </b-modal>
        
        <br/><b-button v-b-toggle.collapse>Add your hypothesis (Toggle Collapse)</b-button>

        <b-collapse id="collapse">
          <Form v-bind:question='question'/>
        </b-collapse>

      </div>

      <div v-else>
        <Form/>
      </div>

    </div>
    
  </div>

</template>

<script>
import Form from '@/components/Form.vue'
import {db} from '../main';
import HypothesesList from '@/components/HypothesesList.vue'
import { firestore } from 'firebase';
const firebase = require('firebase/app');
require('firebase/auth');

export default {
  name: 'Question',
  components: {
    Form,
    HypothesesList,
  },

  data: () => ({
    hypotheses: [],
    question:null,
    id : null,
    n_views: null
  }),

  created() {
    this.id = this.$route.params['id']

    this.$bind('question',
        db.collection('questions')
        .doc(this.id));

    this.$bind(
      'hypotheses',
      db.collection('questions')
        .doc(this.$route.params['id'])
        .collection('hypotheses'));
  },

  methods: {
    initializingParticipants: function () {
      this.question.n_participants = 1
      db.collection('questions').doc(this.id).update({...this.question})
        .then(function() {
          console.log("set number of participants to 1")
        }).catch(err => {
          console.log(err)
        })
    },

    incrementViews: function () {
      //var n_views = 0
      db.collection('questions').doc(this.id).get().then(doc => {
        let n_views = doc.data().n_views
        // console.log(doc.data().n_views)
        db.collection('questions').doc(this.id).update({
          n_views: n_views + 1
        }).then(() => {

        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },

    getParticipants: function () {
      let currentUser = firebase.auth().currentUser
      let docId = `${currentUser.uid}_${this.id}`
      db.collection('participants').doc(docId).get().then(doc => {
        console.log(doc.id, '=>', doc.data())
      }).catch(err => {
        console.log(err)
      })
    }
  },

  mounted() {
    // Do not call when creating a new question
    if (this.id != 'new') {
      this.incrementViews()
    }
},
}
</script>
