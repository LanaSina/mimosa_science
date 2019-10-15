<template>
  <b-container fluid>

  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <p>
      <b-row>
        <b-col sm="3">
          <h2>
            <label>Question*:</label>
          </h2>
        </b-col>
        <b-col sm="8">
          <b-form-input v-if='question' id="f_question" type="text" :disabled=true v-model='form_data.test'></b-form-input>
          <b-form-input v-else id="f_question" type="text" placeholder="required" v-model='form_data.test'></b-form-input>
        </b-col>
      </b-row>
    </p>

    <p>
      <b-row>
        <b-col sm="3">
          <h2>
            <label>Hypothesis*:</label>
          </h2>
        </b-col>
        <b-col sm="8">
          <b-form-input type="text" v-if='hypothesis' :disabled=true v-model='this.hypothesis.title'></b-form-input>
          <b-form-input v-else placeholder="required"></b-form-input>
        </b-col>
      </b-row>
    </p>

    <b-row>
      <h2>Experiment</h2>
    </b-row>

    <p>
      <b-row>
        <b-col sm="3">
          <h3>
            <label>Methods:</label>
          </h3>
        </b-col>
        <b-col sm="8">
          <wysiwyg />
        </b-col>
      </b-row>
    </p>

    <p>
      <b-row>
        <b-col sm="3">
          <h3>
            <label>Result:</label>
          </h3>
        </b-col>
        <b-col sm="8">
          <wysiwyg />
        </b-col>
      </b-row>
    </p>

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
      form_data: {
        test: '',
      },
  }),
  methods: {
    onSubmit(evt) {
        // this.form_data.question_title = this.test
        // this.form_data.hypothesis = " h a "
        evt.preventDefault()
        alert(JSON.stringify(this.form_data))
      },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      // this.form_data.question_title = ''
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
