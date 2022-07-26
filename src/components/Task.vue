<template>
  <BoldedBox>
    <div class="columns">
      <div class="column is-7">
        {{task.description || 'Generic task' }}
      </div>
      <div class="column">
        <Clock :time-in-seconds="task.durationInSeconds" />
      </div>
    </div>
  </BoldedBox>
</template>

<script lang="ts">
import BoldedBox from '@/components/BoldedBox.vue';
import Clock from '@/components/Clock.vue';
import { ITask } from '@/interfaces/ITask';
import { PropType, defineComponent } from 'vue';

export default defineComponent ({
  components: {BoldedBox, Clock},
  name: 'Task',
  props: {
    task: {
      required: true,
      type: Object as PropType<ITask>
    }
  }
});
</script>

<style scoped>
</style>