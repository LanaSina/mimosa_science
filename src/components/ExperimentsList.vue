<template>
  <div id="exp-bg-block">
    <div id="experiments" v-if="experiments.length>0">
      <p id="experiment-list-header">
        Experiments
      </p>
      <template v-for="(e, index) in experiments">
        <b-container fluid>
          <b-row>
            <b-col sm="1">
              <div id="experiment-number">
                {{index+1}}
              </div>
            </b-col>
            <b-col>
              <div id="experiment" >
                <h3>
                  {{ e.summary }} This is the title of the experiment
                  <button v-if="show_up" class="btn      btn-outline-warning" @click="updateExperiment(e.id)">
                    <i class="fa fa-edit"></i>
                  </button>
                </h3>
                <p>
                  <span id="exp-subheader">Methods: </span>
                  <span v-html="e.methods"> </span>
                </p>  
                <p>
                  <span id="exp-subheader">Results: </span>
                  <span v-html="e.results"> </span>
                </p>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </div>
  </div>
</template>


<script>
import firebase from "firebase"
import {db} from '../main';

export default {
  name: 'ExperimentsList',
  props: ['question','hypothesis'],
  data: () => ({
    experiments: [],
    show_update: [],
    show_up: true
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

      // let hypRef = db.collection('questions')
      //   .doc(this.question.id)
      //   .collection('hypotheses')
      //   .doc(this.hypothesis.id)
      //   .collection('experiments');
      // hypRef.get()
      //   .then(snapshot => {
      //     if (snapshot.empty) {
      //       console.log('No matching documents.');
      //       return;
      //     }
      //     snapshot.forEach(doc => {
      //       let experiment = doc.data();
      //       this.show_update.push(firebase.auth().currentUser.uid == experiment.userId);
      //       this.experiments.push(experiment);
      //       //console.log(experiment);
      //     });
      //     // console.log(this.experiments);
      //   })
      //   .catch(err => {
      //     console.log('error getting the documents', err);
      // });
      // this.show_update = new Array(experiments.length).fill(true);
      // this.experiments.forEach(doc => {
      //   let exp = doc.data();
      //   this.show_update.push(true);
      //   console.log(exp);
      // });

  },
  // mounted() {
  //   this.show_update = new Array(this.experiments.length).fill(true);
  // },

  methods: {
    updateExperiment: function (experiment_id) {
      this.$router.push("/updateExperiment/" + this.question.id + "/hypothesis/" + this.hypothesis.id+ "/experiment/" + experiment_id)
    }
  }
}
</script>

<style>
#exp-bg-block{
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  background-color: #dae6f1;
}
#experiment {
  padding-left: 30px;
  padding-bottom: 10px;
  margin-bottom: 1em;
  margin-top: 0px;
  color: black;
}
#experiments {
  padding-left: 30px;
  margin-bottom: 30px;
  display: inline-block;
  text-align: justify;
  background-color: #dae6f1;
}
#experiment-list-header {
  color: white;
  font-family: 'Courier New', serif;
  font-size: 1.5em;
  padding-top: 10px;
}
#experiment-number {
  font-family: 'Impact';
  color: white;
  font-size: 4em;
  font-weight: bold;
  text-align: right;
  margin-top: -0.3em;
  margin-right: -0.5em
}
#experiment h3 {
  font-size: 1em;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: black;
}
#exp-subheader {
  font-family: 'Roboto', sans-serif;
  font-weight: lighter;
  font-style: italic;
  color: black;
  font-size: 0.8em;
}
</style>
