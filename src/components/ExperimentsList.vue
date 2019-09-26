<template>
  <div>
    <template v-for="(e, index) in experiments">
      <h4>
          Experiment {{index+1}}: 
          <p>
            {{ e.summary }}
          </p>
          <p>
            {{ e.methods }}
          </p>
          <p>
            {{ e.result }}
          </p>
      </h4>
    </template>
  </div>
</template>


<script>
import db from '@/plugins/firebase';

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
