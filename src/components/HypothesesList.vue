<template>
  <div>
    <template v-for="(h, index) in hypotheses">
      <h3>
        <router-link :to="{ name: 'hypothesis', params: {id: h.id} }">
          Hypothesis {{index+1}}: {{ h.title }}
        </router-link>
      </h3>
      <p> {{h.summary}} </p>
      <p>
        <b-button block variant="primary" @click="changeShowSub(index)">Show sub-hypotheses</b-button>
      </p>
      <p v-if="show_sub[index]">
        hello
      </p>
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
