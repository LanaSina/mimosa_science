<template>
    <div class="q-pa-md">
      <div class="row" >

        <div class="col-sm-12 col-md-4">
          <HypothesesUpdates/>
        </div>

        <div class="col-sm-12 col-md-4">
          <ListRecent/>
        </div>

        <div class="col-sm-12 col-md-4">
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