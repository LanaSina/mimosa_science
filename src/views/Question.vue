<template>
  <div class="q-pa-md">
    <div class="q-pa-md q-gutter-sm">


      <q-card class="my-card">
        <q-item>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">LS</q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Lana Sinapayen </q-item-label>
            <q-item-label caption>
              Last modified: 2 months ago
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-card-section horizontal>
          <q-parallax

            src="https://cdn.quasar.dev/img/parallax2.jpg"
            :height="200"
          />

          <q-card-actions vertical class="justify-around q-px-md">
            <q-btn flat round color="red" icon="favorite_outline"></q-btn>
            <q-btn flat round color="accent" icon="star_outline"></q-btn>
            <q-btn flat round color="primary" icon="share"></q-btn>
            <q-btn flat round color="secondary" icon="add"></q-btn>
          </q-card-actions>
        </q-card-section>
        
        
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Question: {{ question.title }}
            </div>
        

            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <!-- {{ question.summary }} -->
            </div>
          </div>
          <q-rating size="18px" v-model="stars" :max="5" color="primary"></q-rating>
          <span class="text-caption text-grey q-ml-sm">{{stars}} (551)</span>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="">
            {{lorem}}
          </div>
          
        </q-card-section>
     
      </q-card>

      <QuestionTree v-bind:question='question'/>

    </div>
    
  </div>

</template>

<script>
import Form from '@/components/Form.vue'
import {db} from '../main';
import QuestionTree from '@/components/QuestionTree.vue'
import { firestore } from 'firebase';
const firebase = require('firebase/app');
require('firebase/auth');

export default {
  name: 'Question',
  components: {
    Form,
    QuestionTree,
  },

  data: () => ({
    question:null,
    id : null,
    n_views: null,
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
