<template>
  <div class="home">
    <router-link to="/">Home</router-link>
    <Form question='aaa'/>
  </div>
</template>

<script>
import Form from '@/components/Form.vue'

export default {
  name: 'home',
  components: {
    Form
  }
}
</script>
