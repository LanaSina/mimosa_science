<template>
  <div>
    <template v-for="(h, index) in hypotheses">
      <h3>
        <router-link :to="{ name: 'hypothesis', params: {id: h.id} }">
          Hypothesis {{index+1}}: {{ h.title }}
        </router-link>
      </h3>
      <p> {{h.summary}} </p>
      <ExperimentsList v-bind:question='question' v-bind:hypothesis='h'/>
    </template>
  </div>
</template>


<script>
import db from '@/plugins/firebase';
import ExperimentsList from '@/components/ExperimentsList.vue'

export default {
  name: 'HypothesesList',
  components: {
    ExperimentsList
  },
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
