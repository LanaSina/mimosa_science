<template>
  <div id="app">
    <div id="question" v-for="(q, idx) in questions">
      <h1>
        <router-link :to="{ name: 'question', params: {id: idx} }">
          Question: {{ q.title }}
        </router-link>
      </h1>
      <template v-for="h in q.hypos">
        <h2>Hypothesis: {{ h.title }} </h2>
        <ul>
          <template v-for="e in h.experiments">
            <li> {{e.title}} </li>
            result:
            <p> {{e.result}} </p>
          </template>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
let data = {
  questions: [
    {
      title: "What kind of stimuli Mimosa respond to?",
      hypos: [
        {
          title: 'Mimosa responds to spicy stimulus',
          experiments: [
            {
              title: 'Carefully drop some mustard on the leaves',
              result: 'resul resul resul resul resul resul resul resul resul resul resul resul'
            },
            {
              title: 'Carefully drop some wasabi on the leaves',
              result: 'resul resul resul resul resul resul resul resul resul resul resul resul'
            }
          ]
        },
        {
          title: 'Mimosa responds to electrical stimulus',
          experiments: [
            {
              title: 'Send electrical stimulus to petiole',
              result: 'https://onlinelibrary.wiley.com/doi/full/10.1111/j.1365-3040.2009.02066.x'
            },
            {
              title: 'Send electrical stimulus to pulvinus',
              result: 'https://onlinelibrary.wiley.com/doi/full/10.1111/j.1365-3040.2009.02066.x'
            }
          ]
        },
        {
          title: 'Mimosa responds to heat',
          experiments: []
        }
      ]
    },
    {
      title: "q1",
      hypos: [
        {
          title: 'h1',
          experiments: [
            {
              title: 'e1',
              result: 'resul'
            },
            {
              title: 'e1',
              result: 'resul'
            }
          ]
        },
        {
          title: 'h1',
          experiments: [
            {
              title: 'e1',
              result: 'resul'
            },
            {
              title: 'e1',
              result: 'resul'
            }
          ]
        }
      ]
    }
  ]
}

export default {
  name: 'app',
  data: () => {
    return data
  }
}
</script>

<style>
#question {
  border: solid black 1px;
  margin: 20px 10px;
  padding: 20px;
}
</style>
