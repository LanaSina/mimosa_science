<template>
  <div class="home">
    <router-link to="/">Home</router-link>

	<div id="question" v-for="(q, idx) in questionArray">

	  <h1>
          Question: {{ q.title }}
      </h1>
      <p>{{ q.summary }}</p>
      <HypothesesList v-bind:question='q'/>

  </div>

    <Form question = question />
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
    questionArray: [],
    id : null,
  }),
  created() {
  	this.id = this.$route.params['id']
  	let questionRef = db.collection('questions').doc(this.id);
	let getDoc = questionRef.get()
	  .then(doc => {
	    if (!doc.exists) {
	      console.log('No such document!');
	    } else {
	      let question = doc.data();
	      question.id = doc.id;
	      this.questionArray.push(question);
	    }
	  })
	  .catch(err => {
	    console.log('Error getting document', err);
	  });

    this.$bind(
      'hypotheses',
      db.collection('questions')
        .doc(this.$route.params['id'])
        .collection('hypotheses'));
  }
}
</script>
