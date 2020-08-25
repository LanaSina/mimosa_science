<template>
  <div>

    <q-splitter
        v-model="splitterModel"
        separator-class="bg-orange"
        separator-style="width: 3px"
      >

      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree
            :nodes="hypotheses"
            default-expand-all
            node-key="summary"
            label-key="title"
            children-key="experiments"
            selected-color="primary"
            :selected.sync="selected"
            default-expand-all
          />
        </div>
      </template>

      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" />
      </template>

      <template v-slot:after>
<!--         be sure to sanitize it either on render or server side (or both).
 -->        
        <div v-html="selected"></div>
      </template>

    </q-splitter>

  </div>
</template>

<script>
// @ is an alias to /src
  import firebase from "firebase"
  import {db} from '../main';

  export default {
    name: 'QuestionTree',
    components: {
    },
    props: ['question'],
    data () {
      return {
        hypotheses: [],
        selected: "Select an item.",//this.question.summary,
        splitterModel: 50,
      }
    },
    created() {
    var user = firebase.auth().currentUser;
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
            hyp.index = this.hypotheses.length
            hyp.avatar = "https://cdn.quasar.dev/img/boy-avatar.png"
            hyp.title = "Hypothesis: " + hyp.title
            // hyp.img = "<q-avatar color='primary' text-color='white'>LS</q-avatar>"
            hyp.experiments = []
            this.hypotheses.push(hyp);
            // get experiments for this hypothesis
            db.collection('questions')
            .doc(this.question.id)
            .collection('hypotheses')
            .doc(hyp.id)
            .collection('experiments').get()
              .then(snapshot => {
                if (snapshot.empty) {
                  return;
                } 
                snapshot.forEach(epx_doc => {
                  let exp_data = epx_doc.data()
                  exp_data.avatar = "https://cdn.quasar.dev/img/boy-avatar.png"
                  exp_data.title = "Experiment: " + exp_data.title
                  hyp.experiments.push(exp_data);
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
              });

          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
  },
  }

</script>