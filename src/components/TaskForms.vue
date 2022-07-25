<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="A form to create new tasks">
        <input type="text" class="input" placeholder="Write a task to start">
      </div>
      <div class="column">
        <Timer />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timer from '@/components/Timer.vue';

export default defineComponent({
  name: 'TaskForms',
  components: {
    Timer
  },
})
</script>

<style scoped>

</style>