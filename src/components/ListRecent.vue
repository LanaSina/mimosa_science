<template>
    <q-list bordered padding>
      <!-- <q-item>
        <q-item-section>
          <q-item-label overline>OVERLINE</q-item-label>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced /> -->
      <q-item-label overline class="text-center">Recent</q-item-label>

      <!-- <q-item>
        <q-item-section avatar>
          <q-icon color="green" name="arrow_upward" />
        <q-icon color="red" name="arrow_downward" />
        </q-item-section>
        <q-item-section>List item</q-item-section>
        <q-item-section side>
          <q-item-label caption>meta</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset="item" /> -->

      <q-item>
        <q-item-section top avatar>
         <q-avatar rounded color="primary" text-color="white">H</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="3">The ability to generalize behavior to new stimuli evolved from predictive abilities</q-item-label>
          <q-item-label caption lines="3">SPredictions provide an abundant error signal that is necessary to learn classifications and generalize from there.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <!-- <q-icon name="pie_chart" color="green" /> -->
        </q-item-section>
        
      </q-item>

      <q-separator spaced inset="item" />

     <q-item>
        <q-item-section top avatar>
         <q-avatar rounded color="primary" text-color="white">H</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="3">DThe ability to predict evolved when inhbitory neurons evolved inside purely reactive excitatory networks.</q-item-label>
          <q-item-label caption lines="3">Initially, networks were only made of excitatory neurons.The evolution of inhibitory neurons allowed to stabilzse the spiking dynamics of the network, and these inhibitory neurons then started being used to match internal predictions to outside stimuli.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <!-- <q-icon name="pie_chart" color="red" /> -->
        </q-item-section>
        
      </q-item>

       <q-separator spaced inset="item" />

     <q-item>
        <q-item-section top avatar>
         <q-avatar rounded color="primary" text-color="white">H</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="3">There are 3 conditions: Connectivity, Controllability; and 1 time condition on the input/output loop.</q-item-label>
          <q-item-label caption lines="3">Connectivity: relevant information from the sensors must be able to reach the actuators of the agent. Controllability: there exists a subset of outputs from the agent that can modify the source of the input in the environment. Time condition: the input-output loop must be closed in the time window during which the network can evaluate the consequences the action that it took.

</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <!-- <q-icon name="pie_chart" color="green" /> -->
        </q-item-section>
        
      </q-item>

       <q-separator spaced inset="item" />

     <q-item>
        <q-item-section top avatar>
         <q-avatar rounded color="secondary" text-color="white">Q</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="2">What are the sufficient conditions for a spiking network to learn to react to environmental stimuli?</q-item-label>
          <q-item-label caption lines="3">More specifically in the case of a network with Learning by Stimulation Avoidance (https://www.mitpressjournals.org/doi/pdf/10.1162/978-0-262-33027-5-ch037)</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <!-- <q-icon name="pie_chart" color="red" /> -->
        </q-item-section>
     </q-item>

    <q-separator spaced inset="item" />

     <q-item>
        <q-item-section top avatar>
         <q-avatar rounded color="secondary" text-color="white">Q</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="2">What are the sufficient conditions for a spiking network to learn to react to environmental stimuli?</q-item-label>
          <q-item-label caption lines="3">More specifically in the case of a network with Learning by Stimulation Avoidance (https://www.mitpressjournals.org/doi/pdf/10.1162/978-0-262-33027-5-ch037)</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <!-- <q-icon name="pie_chart" color="red" /> -->
        </q-item-section>
     </q-item>

     <q-separator spaced inset="item" />

     <q-item>
        <q-item-section top avatar>
         <q-avatar rounded color="secondary" text-color="white">Q</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="2">What are the sufficient conditions for a spiking network to learn to react to environmental stimuli?</q-item-label>
          <q-item-label caption lines="3">More specifically in the case of a network with Learning by Stimulation Avoidance (https://www.mitpressjournals.org/doi/pdf/10.1162/978-0-262-33027-5-ch037)</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <!-- <q-icon name="pie_chart" color="red" /> -->
        </q-item-section>
     </q-item>

    
    </q-list>
    
</template>

<script>
export default {
    name: 'ListRecent'
}
</script>