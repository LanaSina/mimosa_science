<template>
  <div>
    <QuestionList v-bind:showMyItems='showMyItems'/>
  </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue'

export default {
  name: 'userItemList',
  components: {
    QuestionList
  },
  data: () => ({
    showMyItems: true
  }) 
}
</script>
