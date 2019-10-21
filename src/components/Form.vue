<template>

  <b-container fluid>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="question_global" label="Question" label-cols-lg="3">

        <b-form-group id="question_title_group" label="Question summary*:" label-for="question_title" label-cols-sm="3">

          <b-form-input v-if='question' id="question_title" type="text" :disabled=true v-model='this.question.title'></b-form-input>
          <b-form-input v-else id="question_title" type="text" placeholder="required" v-model='question_data.title'></b-form-input>

        </b-form-group>

        <b-form-group id="question_title" label="Details:"
          label-for="question_summary" label-cols-sm="3"
          description="Add some details to explain your question if you want."
        >

          <b-form-input v-if='question' id="question_summary" type="text" :disabled=true v-model='this.question.summary'></b-form-input>
          <b-form-input v-else id="f_question_summary" type="text" v-model='question_data.summary'></b-form-input>

        </b-form-group>

      </b-form-group>


      <b-form-group id="hypothesis-global" label="Hypothesis" label-cols-lg="3">

        <b-form-group id="hypothesis_title_group" label="Hypothesis*:" label-for="hypothesis_title" label-cols-sm="3">

          <b-form-input v-if='hypothesis' id='hypothesis_title' type="text" :disabled=true v-model='this.hypothesis.title'></b-form-input>
          <b-form-input v-else id='hypothesis_title' type="text" placeholder="required" v-model='hypothesis_data.title'></b-form-input>

        </b-form-group>

        <b-form-group id="hypothesis_summary_group" label="Details:"  
            label-for="hypothesis_summary" label-cols-sm="3"
            description="Add some details to explain your hypothesis if you want."
          >
            <b-form-input v-if='hypothesis' id='hypothesis_summary' type="text" :disabled=true v-model='this.hypothesis.summary'></b-form-input>
            <b-form-input v-else id='hypothesis_summary' type="text" placeholder="required" v-model='hypothesis_data.summary' ></b-form-input>

        </b-form-group>

      </b-form-group>


      <b-form-group id="experiment_global" label="Experiment" label-cols-lg="3" >

        <b-form-group id="methods" label="Methods:" label-for="experiment_methods"
         label-cols-sm="3" description="Describe how you performed the experiment to test this hypothesis." 
         >
          <wysiwyg id="experiment_methods" v-model='experiment_data.methods'/>
        </b-form-group>

        <b-form-group id="results" label="Results:" label-for="experiment_results"
         label-cols-sm="3" description="What were the results of the experiment, and did the results support / go against the hypothesis?" 
         >
           <wysiwyg id="experiment_results" v-model='experiment_data.results'/>
        </b-form-group>

      </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>

      </b-form>

    </b-container>

</template>

<script>
import db from '@/plugins/firebase';


export default {
  name: 'InputForm',
  props: {
    question: {
        type: Object
    },
    hypothesis: {
        type: Object
    },
  },
  data: () => ({
      show: true,
      hypothesis_data: {
        title: '',
        summary: '',
        parent: '',
      },
      question_data: {
        title: '',
        summary: '',
        hidden: false,
      },
      experiment_data: {
        methods: '',
        results: '',
      },
  }),
  methods: {
    onSubmit(evt) {
        evt.preventDefault()
        if(this.question != null){
          this.question_data.title = this.question.title
        } else {

          let add_question = db.collection('questions').add(this.question_data)
            .then(ref => {
              console.log('Added question with ID: ', ref.id);
              let q_id = ref.id;

              //add hypothesis
              if(this.hypothesis_data.title){
                  let add_hypothesis = db.collection('questions').doc(ref.id)
                                      .collection('hypotheses').add(this.hypothesis_data)
                    .then(ref => {
                      console.log('Added hypothesis with ID: ', ref.id);
                      let h_id = ref.id;

                      //add experiment
                      if(this.experiment_data.methods){
                        let add_experiment = db.collection('questions').doc(q_id)
                                      .collection('hypotheses').doc(h_id)
                                      .collection('experiments').add(this.experiment_data)
                          .then(ref => {
                            console.log('Added experiment with ID: ', ref.id);
                          });
                      }
                      this.$router.push('/');
                    });
              } else {
                this.$router.push('/');
              }
            });
        }
        
      },
    onReset(evt) {
      evt.preventDefault()
      // Reset form values
      this.question_data.title = ''
      //this.form.f_hypothesis = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
textarea {
  rows: 3
}
</style>
