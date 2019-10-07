<template>
  <div class="home">
    <router-link to="/">Home</router-link>

    <div id="question">

      <h1>
            Question: {{ question.title }}
      </h1>
      <p>{{ question.summary }}</p>
      <HypothesesList v-bind:question='question'/>

    </div>

    <Form v-bind:question='question'/>
  
  </div>
</template>

<script>
import Form from '@/components/Form.vue'
import db from '@/plugins/firebase'
import ExperimentsList from '@/components/ExperimentsList.vue'
import HypothesesList from '@/components/HypothesesList.vue'


export default {
  name: 'home',
  components: {
    Form,
    ExperimentsList,
    HypothesesList,
  },
  data: () => ({
    hypotheses: [],
    question:null,
    id : null,
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
  }
}
</script>
