<template>
  <div>
    <template v-for="(h, index) in hypotheses">
      <h2>
        <router-link :to="{ name: 'hypothesis', params: {h_id: h.id, q_id:question.id} }">
          Hypothesis: {{ h.title }}
        </router-link>
      </h2>
      <p id="context" v-html="h.summary"> </p>
      <p class="text">
        <b-button variant="info" @click="changeShowSub(index)">Show sub-hypotheses</b-button>
      </p>
      <div v-if="show_sub[index]">
        <div v-if="sub_contents[index].length">
          Sub-hypotheses:
        </div>
        <div v-else>
          No sub-hypotheses.
          <br/>
        </div>
        <div id="sub_hypothesis" v-for="(sh, idx) in sub_contents[index]">
          <router-link :to="{ name: 'hypothesis', params: {h_id: sh.id, q_id:question.id} }">
            {{ sh.title }}
          </router-link>
        </div>
      </div>
      <ExperimentsList v-bind:question='question' v-bind:hypothesis='h'/>
    </template>
  </div>
</template>


<script>
import {db} from '../main';
import ExperimentsList from '@/components/ExperimentsList.vue'

export default {
  name: 'HypothesesList',
  components: {
    ExperimentsList
  },
  props: ['question'],
  data: () => ({
    hypotheses: [],
    show_sub: [],
    sub_contents: [],
  }),
  created() {

    //get hypotheses for this question
    let hypRef = db.collection('questions')
      .doc(this.question.id)
      .collection('hypotheses')
      .where('parent', '==', '');
    hypRef.get()
      .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          } 
          snapshot.forEach(doc => {
            let hyp = doc.data();
            hyp.id = doc.id;
            this.hypotheses.push(hyp);
          });
          this.show_sub = new Array(this.hypotheses.length).fill(false);
          this.sub_contents = new Array(this.hypotheses.length).fill([]);
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

  },
  methods: {
    changeShowSub: function (index) {
      //get the sub-hypotheses titles
    let subRef = db.collection('questions')
      .doc(this.question.id)
      .collection('hypotheses');
    subRef.where('parent', '==', this.hypotheses[index].id).get()
      .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          } 
          let sub_hypotheses = []
          snapshot.forEach(doc => {
            let hyp = doc.data();
            hyp.id = doc.id;
            sub_hypotheses.push(hyp);
          });
          
          this.$set(this.sub_contents, index, sub_hypotheses);

        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

        this.$set(this.show_sub, index, !this.show_sub[index]);
    }
  },
}
</script>


<style>
h2 a:link, h2 a:visited, h2 a:hover, h2 a:active  {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  color: black;
  font-size: 0.65em;
}
</style>

