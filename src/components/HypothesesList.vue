<template>
  <div>
    <template v-for="(h, index) in hypotheses">
      <h3>
        Hypothesis {{index+1}}: {{ h.title }}
      </h3>
      <p> {{h.summary}} </p>
    </template>
  </div>
</template>


<script>
import db from '@/plugins/firebase';

export default {
  name: 'HypothesesList',
  props: ['question'],
  data: () => ({
    hypotheses: [],
  }),
  created() {
    this.$bind(
      'hypotheses',
      db.collection('questions')
        .doc(this.question.id)
        .collection('hypotheses'));
  }
}
</script>
