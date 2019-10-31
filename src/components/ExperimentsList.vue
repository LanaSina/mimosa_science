<template>
  <div v-if="experiments.length>0">
    <template v-for="(e, index) in experiments">
      <h4>
          Experiment {{index+1}}: 
      </h4>
      <p>
        {{ e.summary }}
      </p>
      <p v-html="e.methods"> </p>
      <p v-html="e.results"> </p>
    </template>
  </div>
</template>


<script>
import {db} from '../main';

export default {
  name: 'ExperimentsList',
  props: ['question','hypothesis'],
  data: () => ({
    experiments: [],
  }),
  created() {
    this.$bind(
      'experiments',
      db.collection('questions')
        .doc(this.question.id)
        .collection('hypotheses')
        .doc(this.hypothesis.id)
        .collection('experiments')
      );

  }
}
</script>
