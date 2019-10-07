<template>
  <b-container fluid>
    
    <p>
      <b-row>
        <b-col sm="2">
          <label>Question:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input v-model="question" placeholder="required"></b-form-input>
        </b-col>
      </b-row>
    </p>

    <p>
      <b-row>
        <b-col sm="2">
          <label>Hypothesis:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input placeholder="required"></b-form-input>
        </b-col>
      </b-row>
    </p>

    <b-row>
      <h2>Experiment</h2>
    </b-row>

    <p>
      <b-row>
        <b-col sm="2">
          <label>Methods:</label>
        </b-col>
        <b-col sm="10">
          <wysiwyg v-model="myHTML" />
        </b-col>
      </b-row>
    </p>

    <p>
      <b-row>
        <b-col sm="2">
          <label>Result:</label>
        </b-col>
        <b-col sm="10">
          <wysiwyg v-model="myHTML" />
        </b-col>
      </b-row>
    </p>

    <router-link to="/">Submit</router-link>

</b-container>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    question: String
  }
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
