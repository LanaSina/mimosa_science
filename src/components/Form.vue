<template>
  <div class="hello">
    <p><label>Question:</label> <input v-model="question"></p>
    <p><label>Hypothisis:</label> <input placeholder="required"></p>
    <h2>Experiment</h2>
    <p><label>Method:</label> <textarea></textarea></p>
    <p><label>Result:</label> <textarea></textarea></p>
    <router-link to="/">Submit</router-link>
  </div>
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
</style>
