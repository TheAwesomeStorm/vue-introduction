<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="A form to create new tasks">
        <input type="text" class="input" placeholder="Write a task to start" v-model="description">
      </div>
      <div class="column">
        <Timer @onTimerStopped="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Timer from '@/components/Timer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Timer
  },
  data () {
    return {
      description: ''
    };
  },
  emits: [
      'onTaskCompleted'
  ],
  methods: {
    endTask (totalTimeElapsed: number): void {
      this.$emit('onTaskCompleted', {
        description: this.description,
        durationInSeconds: totalTimeElapsed
      });
      this.description = '';
    }
  },
  name: 'TaskForms',
});
</script>

<style scoped>

</style>