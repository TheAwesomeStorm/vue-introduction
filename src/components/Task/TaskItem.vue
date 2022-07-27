<template>
  <BoldedBox>
    <div class="columns">
      <div class="column is-4">
        {{task.description || 'Generic task' }}
      </div>
      <div class='column is-3'> {{task.project?.name || 'N/D' }} </div>
      <div class="column">
        <Clock :time-in-seconds="task.durationInSeconds" />
      </div>
    </div>
  </BoldedBox>
</template>

<script lang="ts">
import BoldedBox from '@/components/Common/BoldedBox.vue';
import Clock from '@/components/Common/Clock.vue';
import { ITask } from '@/interfaces/ITask';
import { PropType, defineComponent } from 'vue';

export default defineComponent ({
  components: {BoldedBox, Clock},
  name: 'TaskItem',
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