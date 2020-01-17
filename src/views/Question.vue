<template>
  <div class="container">
    <!-- <router-link to="/">Home</router-link> -->

    <div>

      <div v-if="question" id="question">
        <h1>
              Question: {{ question.title }}
        </h1>
        <p>{{ question.summary }}</p>
        <HypothesesList v-bind:question='question'/>

        <h2> Add your proposed hypothesis here: </h2>
        <br/>

        <Form v-bind:question='question'/>

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


export default {
  name: 'home',
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
    // initializingViews: function () {
    //   this.question.n_views = 0
    //   db.collection('questions').doc(this.id).update({...this.question})
    //     .then(function() {
    //       console.log("set number of views to 0")
    //     }).catch(err => {
    //       console.log(err)
    //     })
    // },

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
