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
            node-key="id"
            label-key="title"
            children-key="experiments"
            selected-color="primary"
            :selected.sync="selected"
            default-expand-all
          />
          <q-tree
            :nodes="simple2"
            node-key="label"
            selected-color="primary"
            :selected.sync="selected2"
            default-expand-all
          />

          <q-tree
            :nodes="simple3"
            node-key="label"
            selected-color="primary"
            :selected.sync="selected2"
            default-expand-all
          />

          <q-tree
            :nodes="simple4"
            node-key="label"
            selected-color="primary"
            :selected.sync="selected2"
            default-expand-all
          />

          <q-tree
            :nodes="simple5"
            node-key="label"
            selected-color="primary"
            :selected.sync="selected2"
            default-expand-all
          />
        </div>
      </template>

      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" />
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="selected"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          
          <q-tab-panel name="Hypothesis 1: There are 3 conditions: Connectivity, Controllability; and 1 time condition on the input/output loop.">
                <div class="cursor-pointer">
                    <p v-html=hypothesis1></p>
                    <q-popup-edit buttons v-model="hypothesis1">
                        <q-editor
                            v-model="hypothesis1"
                            min-height="5rem"
                            autofocus
                            @keyup.enter.stop
                        />
                    </q-popup-edit>
                </div>
            </q-tab-panel>
        
            <q-tab-panel name="Title of experiment of Experiment 1">
                <div class="text-h5 q-mb-md">Methods</div>
                <div class="cursor-pointer">
                    <p v-html="method1"></p>
                    <q-popup-edit buttons v-model="method1">
                        <q-editor
                            v-model="method1"
                            min-height="10rem"
                            autofocus
                            @keyup.enter.stop
                        />
                    </q-popup-edit>
                </div>
            
                <div class="text-h5 q-mb-md">Result</div>
                <div class="cursor-pointer">
                    <p v-html=result1></p>
                    <q-popup-edit buttons v-model="result1">
                        <q-editor
                            v-model="result1"
                            min-height="10rem"
                            autofocus
                            @keyup.enter.stop
                        />
                    </q-popup-edit>
                </div>
            </q-tab-panel>

            <q-tab-panel name="Title of experiment of Experiment 2">
                <div class="text-h5 q-mb-md">Methods</div>
                <div class="cursor-pointer">
                    <p v-html=method2></p>
                    <q-popup-edit buttons v-model="method2">
                        <q-editor
                            v-model="method2"
                            min-height="10rem"
                            autofocus
                            @keyup.enter.stop
                        />
                    </q-popup-edit>
                </div>
            
                <div class="text-h5 q-mb-md">Result</div>
                <div class="cursor-pointer">
                    <p v-html=result2></p>
                    <q-popup-edit buttons v-model="result2">
                        <q-editor
                            v-model="result2"
                            min-height="10rem"
                            autofocus
                            @keyup.enter.stop
                        />
                    </q-popup-edit>
                </div>
            </q-tab-panel>

            <q-tab-panel name="Title of experiment of Experiment 3">
                <div class="text-h5 q-mb-md">Methods</div>
                <div class="cursor-pointer">
                    <p v-html=method3></p>
                    <q-popup-edit buttons v-model="method3">
                        <q-editor
                            v-model="method3"
                            min-height="10rem"
                            autofocus
                            @keyup.enter.stop
                        />
                    </q-popup-edit>
                </div>
            
                <div class="text-h5 q-mb-md">Result</div>
                <div class="cursor-pointer">
                    <p v-html=result3></p>
                    <q-popup-edit buttons v-model="result3">
                        <q-editor
                            v-model="result3"
                            min-height="10rem"
                            autofocus
                            @keyup.enter.stop
                        />
                    </q-popup-edit>
                </div>
            </q-tab-panel>


           <q-tab-panel name="Result 4_1">
            <div class="text-h5 q-mb-md">Result 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet lectus velit, nec finibus augue bibendum sed. Proin tellus lectus, lobortis laoreet bibendum nec, rutrum non diam. Nullam in quam porttitor, pellentesque dui in, dapibus risus. Mauris at luctus nunc, in interdum ex. Quisque volutpat, tellus volutpat luctus ornare, mauris ipsum rhoncus quam, ut posuere nunc lacus eu libero. Integer non tempus odio. Sed ipsum mauris, lacinia ac varius sit amet, aliquam at dolor. Proin gravida condimentum sollicitudin.</p>
            <p>Suspendisse diam urna, semper eu odio et, rutrum luctus purus. Praesent malesuada, tortor vitae interdum pretium, felis justo lacinia mauris, non ullamcorper justo enim sed mi. Mauris accumsan ultricies est et tincidunt. Integer fringilla lobortis consectetur. Phasellus nec enim sed lectus pulvinar blandit nec ut ipsum. Sed id semper sapien, quis accumsan sem. Morbi sit amet lectus in sapien blandit accumsan. Suspendisse dolor felis, venenatis a erat eget, accumsan accumsan velit. Nullam molestie odio id blandit tempor. Morbi finibus lacus sit amet gravida bibendum.</p>
            <p>Fusce pulvinar vulputate nunc, ac fermentum ligula commodo id. Duis in massa sit amet lorem sagittis vulputate. Nulla commodo ipsum sed justo consequat egestas. Vivamus pellentesque feugiat sem, vel maximus libero gravida a. Donec gravida aliquet convallis. Nulla facilisi. Phasellus congue ullamcorper lectus, a rhoncus nulla eleifend vel.</p>
            <p>Proin commodo quam et dapibus fringilla. Nam eget ligula euismod libero sagittis tincidunt. Phasellus condimentum metus id facilisis ultricies. Aenean gravida nisi ut porta pretium. Donec ornare ac eros sed molestie. Nam maximus enim pharetra, sollicitudin velit vulputate, porta justo. Pellentesque ut metus sit amet lorem sagittis viverra et sed nibh. Curabitur sit amet justo ut tellus venenatis aliquet. Pellentesque semper facilisis libero eget consequat. Nam dui elit, laoreet in elementum vitae, egestas vel eros. Mauris nisl velit, cursus nec leo viverra, ultricies sagittis tellus. Phasellus rutrum urna a tincidunt ultricies. Praesent mi orci, sodales vitae eros a, euismod luctus odio.</p>
            <p>Duis efficitur libero in orci ullamcorper, at suscipit turpis fermentum. Praesent varius enim vel ex mattis, ut volutpat urna tincidunt. Proin mollis eros vel quam convallis, eget porttitor velit fermentum. Nam sed nibh enim. Vivamus urna arcu, mollis non fermentum sed, aliquet sed mauris. Aliquam eu metus nec est imperdiet posuere in sed ex. Aliquam pretium tincidunt dolor, vehicula condimentum arcu. Proin vitae nibh justo. Aliquam aliquam nulla dictum sodales suscipit. Donec gravida eros mi, eu lacinia lacus luctus eget. Aliquam ac ligula elit. Suspendisse pharetra accumsan ipsum. Cras gravida consequat odio ac dictum. Suspendisse pretium nisl ut aliquam interdum. Fusce dolor diam, tristique nec condimentum eget, lobortis id nulla. Fusce nulla nibh, aliquam non molestie ut, venenatis in orci. </p>
            
          </q-tab-panel> 

          <q-tab-panel name="Result 4_2">
            <div class="text-h4 q-mb-md">Result 2</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="Result 4_3">
            <div class="text-h4 q-mb-md">Result 3</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
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
            hyp.avatar = "https://cdn.quasar.dev/img/boy-avatar.png"
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
                  hyp.experiments.push(epx_doc.data());
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
              });

          });
          // this.show_sub = new Array(this.hypotheses.length).fill(false);
          // this.sub_contents = new Array(this.hypotheses.length).fill([]);
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

  },
  }

</script>