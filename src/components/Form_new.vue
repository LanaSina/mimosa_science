<template>
    <div class="q-gutter-md">
      <q-select filled v-model="model1" :options="options" label="New item" stack-label :dense="dense" :options-dense="denseOpts" />

      <q-select filled v-model="model2" :options="questions" label="Question" stack-label :dense="dense" :options-dense="denseOpts" />

      <q-select filled v-model="model3" :options="hypotheses" label="Hypothesis" stack-label :dense="dense" :options-dense="denseOpts"/>

      <q-editor v-model="editor" min-height="21rem" />

      <q-select filled v-model="model4" :options="visibility" label="Visibility" stack-label :dense="dense" :options-dense="denseOpts"/>

      <div class="q-pa-md q-gutter-sm">
        <q-btn color="primary" label="Save draft" />
        <q-btn color="secondary" label="Publish" />
      </div>
    </div>
</template>

<script>
export default {
    name: 'Form',

  data () {
    return {
      type: null,

      options: [
        'Question', 'Hypothesis', 'Experiment', 'Result'
      ],

      questions: [
          'What are the sufficient conditions for a spiking network to learn to react to environmental stimuli?',
          'Where does predictive coding fit in the evolutionary history of neural networks?',
          "Why can't PredNet learn to predict natural videos and the Game of Life with the same learning scheme?",
          "Change blindess happens when the uncertainty on the predicted variable is low compared to a pulse-like change in that variable",
      ],

      hypotheses: [
          "The ability to generalize behavior to new stimuli evolved from predictive abilities",
          "The ability to predict evolved when inhbitory neurons evolved inside purely reactive excitatory networks.",
          "There are 3 conditions: Connectivity, Controllability; and 1 time condition on the input/output loop.",
          "Dynamic CB is caused by predictive coding",
      ],

      visibility: [
        'Public', 'Private', 'Team A', 'Team B', 'Team C' 
      ],

       editor: 'What you see is <b>what</b> you get.',
      model1: '',
      model2: '',
      model3: '',
      model4: '',
      dense: false,
      denseOpts: false
    }
  }
}
</script>