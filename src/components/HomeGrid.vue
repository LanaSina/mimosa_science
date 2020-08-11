<template>
    <div class="q-pa-md">
      <div class="row" >

        <div class="col">
          <HypothesesUpdates/>
        </div>

        <div class="col">
          <ListRecent/>
        </div>

        <div class="col">
          <Form/>
        </div>

      </div>
    </div>
</template>

<script>
import HypothesesUpdates from '@/components/HypothesesUpdates'
import ListRecent from '@/components/ListRecent'
import Form from '@/components/Form_new'

export default {
    name: 'HomeGrid',

    components : {
        HypothesesUpdates,
        ListRecent,
        Form
    }
}
</script>