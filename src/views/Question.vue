<template>
  <div class="q-pa-md">
    <div class="q-pa-md q-gutter-sm">


      <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">LS</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>Lana Sinapayen </q-item-label>
          <q-item-label caption>
            Last modified: 2 months ago
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-card-section horizontal>
        <q-parallax

          src="https://cdn.quasar.dev/img/parallax2.jpg"
          :height="200"
        />

        <q-card-actions vertical class="justify-around q-px-md">
          <q-btn flat round color="red" icon="favorite_outline"></q-btn>
          <q-btn flat round color="accent" icon="star_outline"></q-btn>
          <q-btn flat round color="primary" icon="share"></q-btn>
          <q-btn flat round color="secondary" icon="add"></q-btn>
        </q-card-actions>
      </q-card-section>
      
      
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            Question: {{ question.title }}
          </div>
      

          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <!-- {{ question.summary }} -->
          </div>
        </div>
        <q-rating size="18px" v-model="stars" :max="5" color="primary"></q-rating>
        <span class="text-caption text-grey q-ml-sm">{{stars}} (551)</span>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="">
          {{lorem}}
        </div>
        
      </q-card-section>
     
    </q-card>

    <QuestionTree v-bind:question='question'/>

  </div>

    <!-- <router-link to="/">Home</router-link> -->

    <div>
        <!-- Initialize the statistics of a question -->
        <!-- <button type="button" @click="initializingParticipants()">
          <i class="material-icons">edit</i>
        </button> -->
      <div v-if="question" id="question">
        <h1>
              Question: {{ question.title }}
        </h1>
        <p>{{ question.summary }}</p>        
        <HypothesesList v-bind:question='question'/>

        <!-- <h2> Add your proposed hypothesis here: </h2>
        <br/> -->
        <b-button v-b-modal="'my-modal'">Add your hypothesis (Modal)</b-button>

        <b-modal id="my-modal" size="xl" title="Add your hypothesis">
        <Form v-bind:question='question'/>
        </b-modal>
        
        <br/><b-button v-b-toggle.collapse>Add your hypothesis (Toggle Collapse)</b-button>

        <b-collapse id="collapse">
          <Form v-bind:question='question'/>
        </b-collapse>

      </div>

      <div v-else>
        <Form/>
      </div>

    </div>
    
  </div>

</template>

<script>
import Form from '@/components/Form.vue'
import {db} from '../main';
import HypothesesList from '@/components/HypothesesList.vue'
import QuestionTree from '@/components/QuestionTree.vue'
import { firestore } from 'firebase';
const firebase = require('firebase/app');
require('firebase/auth');

export default {
  name: 'Question',
  components: {
    Form,
    HypothesesList,
    QuestionTree,
  },

  data: () => ({
    hypotheses: [],
    question:null,
    id : null,
    n_views: null,
    splitterModel: 50,
      hypothesis1: 'Connectivity: relevant information from the sensors must be able to reach the actuators of the agent. Controllability: there exists a subset of outputs from the agent that can modify the source of the input in the environment. Time condition: the input-output loop must be closed in the time window during which the network can evaluate the consequences the action that it took.',

      method1: 'In <a href="https://www.mitpressjournals.org/doi/abs/10.1162/isal_a_00037" target="_blank" rel="noopener noreferrer">"Autonomous Regulation of Self and Non-Self by Stimulation Avoidance in Embodied Neural Networks"</a>  we showed that simulated networks and biological networks can learn wall avoidance in a one-dimensional environment through LSA. This is reactive behavior, as the robot must react to the wall by turning around. We compared the results when Controllability is respected (the target output from the network stops the stimulation immediately, ∆t2 = 0 ms) and when Controllability is not respected (the stimulation is random and no output can stop it). The Connectivity condition was respected in both conditions.',

      result1: 'In the controllable setting, the networks learned to react to the stimulation by firing the expected output; in the uncontrollable setting, the networks did not learn to react to the input. Controllability is therefore necessary for proper learning in both biological and simulated networks: this result supports the hypothesis.',

      method2: 'In a simulated minimal spiking network with two neurons and in the absence of long term memory, the time window τ is equal to 20 ms (the time constant of the STDP learning rule). The weights of a neuron’s connections are only changed by STDP during this 20 ms time window before or after the neuron spikes, so an action by the network in response to a stimulation must take effect in the environment in less than 20 ms, for the action to be associated to the input and learned by the network.',

      result2: 'In "Homeostasis by action, prediction, selection in embodied neural networks" (Phd thesis), we showed that this loop must be closed in 40 ms in simulated networks with 100 neurons. This result supports the hypothesis.',

      method3: 'We evaluated the relation between connectivity and learning success in biological networks("Homeostasis by action, prediction, selection in embodied neural networks", PhD thesis).We defined a connectivity measure: the number of connections with low time delay between input neurons and output neurons, and a success measure: the shortening of the time between reaching the wall and turning away from it (reaction time).',

      result3: 'We found a strong correlation between high connectivity and high success; in addition, if the connectivity is zero (no appropriate connections between input and output), the network cannot learn the behavior to avoid the stimulation. Connectivity is therefore necessary for proper learning in biological networks, and although we have not yet conducted simulation experiments, we expect that this condition should be respected in simulated networks.',

      selected: 'Hypothesis 1: There are 3 conditions: Connectivity, Controllability; and 1 time condition on the input/output loop.',
      simple: [
        {
          label: 'Hypothesis 1: There are 3 conditions: Connectivity, Controllability; and 1 time condition on the input/output loop.',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          children: [
              {
                  label: 'Title of experiment of Experiment 1',
                  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
              },

              {
                  label: 'Title of experiment of Experiment 2',
                  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
              },

              {
                  label: 'Title of experiment of Experiment 3',
                  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
              },

            {
              label: 'Experiment 4:',
              // icon: 'photo',
              avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
              children: [
                { label: 'Result 4_1', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg' },
                { label: 'Result 4_2', avatar: 'https://cdn.quasar.dev/img/avatar5.jpg', },
                { label: 'Result 4_3', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'}
              ]
            },
            {
              label: 'Experiment 2:',
              // icon: 'photo',
              avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
              disabled: false,
              children: [
                { label: 'Result 2_1', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png', },
                { label: 'Result 2_2', avatar: 'https://cdn.quasar.dev/img/avatar3.jpg' }
              ]
            },
            {
              label: 'Experiment 3',
              // icon: 'photo',
              avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
              children: [
                { label: 'Result 3_1', avatar: 'https://cdn.quasar.dev/img/avatar5.jpg' },
                { label: 'Result 3_2', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png' },
                { label: 'Result 3_3', avatar: 'https://cdn.quasar.dev/img/avatar4.jpg', }
              ]
            }
          ]
        }
      ],

      simple2: [
        {
          label: 'Hypothesis 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet lectus velit, nec finibus augue bibendum sed.',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        //   children: [
        //     {
        //       label: 'Experiment 1:',
        //       icon: 'photo',
        //       children: [
        //         { label: 'Result 1_1' },
        //         { label: 'Result 1_2' },
        //         { label: 'Result 1_3'}
        //       ]
        //     },
        //     {
        //       label: 'Experiment 2:',
        //       icon: 'photo',
        //       disabled: false,
        //       children: [
        //         { label: 'Result 2_1' },
        //         { label: 'Result 2_2' }
        //       ]
        //     },
        //     {
        //       label: 'Experiment 3',
        //       icon: 'photo',
        //       children: [
        //         { label: 'Result 3_1' },
        //         { label: 'Result 3_2' },
        //         { label: 'Result 3_3' }
        //       ]
        //     }
        //   ]
        }
      ],

      simple3: [
        {
          label: 'Hypothesis 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet lectus velit, nec finibus augue bibendum sed.',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        }
      ],
      
      simple4: [
        {
          label: 'Hypothesis 4: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet lectus velit, nec finibus augue bibendum sed.',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        }
      ],
      
      simple5: [
        {
          label: 'Hypothesis 5: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet lectus velit, nec finibus augue bibendum sed.',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
        }
      ]  
  }),

  created() {
    this.id = this.$route.params['id']

    this.$bind('question',
        db.collection('questions')
        .doc(this.id));

    this.$bind(
      'hypotheses',
      db.collection('questions')
        .doc(this.$route.params['id'])
        .collection('hypotheses'));
  },

  methods: {
    initializingParticipants: function () {
      this.question.n_participants = 1
      db.collection('questions').doc(this.id).update({...this.question})
        .then(function() {
          console.log("set number of participants to 1")
        }).catch(err => {
          console.log(err)
        })
    },

    incrementViews: function () {
      //var n_views = 0
      db.collection('questions').doc(this.id).get().then(doc => {
        let n_views = doc.data().n_views
        // console.log(doc.data().n_views)
        db.collection('questions').doc(this.id).update({
          n_views: n_views + 1
        }).then(() => {

        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },

    getParticipants: function () {
      let currentUser = firebase.auth().currentUser
      let docId = `${currentUser.uid}_${this.id}`
      db.collection('participants').doc(docId).get().then(doc => {
        console.log(doc.id, '=>', doc.data())
      }).catch(err => {
        console.log(err)
      })
    }
  },

  mounted() {
    // Do not call when creating a new question
    if (this.id != 'new') {
      this.incrementViews()
    }
},
}
</script>
