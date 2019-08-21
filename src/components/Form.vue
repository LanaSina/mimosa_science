<template>
  <b-container fluid>
  
    <p><label>Question:</label> <input v-model="question"></p>
    <p><label>Hypothesis:</label> <input placeholder="required"></p>
    <h2>Experiment</h2>
    <p><label>Method:</label> <textarea rows="10"></textarea></p>
    <p><label>Result:</label> <textarea></textarea></p>
    <router-link to="/">Submit</router-link>


    
  <b-row>
    <b-col sm="2">
      <label for="input-small">Small:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-small" size="sm" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-default">Default:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-default" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="my-1">
    <b-col sm="2">
      <label for="input-large">Large:</label>
    </b-col>
    <b-col sm="10">
      <b-form-input id="input-large" size="lg" placeholder="Enter your name"></b-form-input>
    </b-col>
  </b-row>
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
