<template>
  <TaskForms @onTaskCompleted="saveTask" />
  <ul class="list">
    <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    <BoldedBox v-if="isTasksEmpty">
      No tasks yet
    </BoldedBox>
  </ul>
</template>

<script lang="ts">
import BoldedBox from '@/components/BoldedBox.vue';
import { ITask } from '@/interfaces/ITask';
import Task from '@/components/Task.vue';
import TaskForms from '@/components/TaskForms.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
  components: {
    BoldedBox,
    Task,
    TaskForms
  },
  computed: {
    isTasksEmpty (): boolean {
      return this.tasks.length === 0;
    }
  },
  data () {
    return {
      tasks: [] as ITask[]
    };
  },
  methods: {
    saveTask (task: ITask) {
      this.tasks.push(task);
    }
  },
  name: 'TaskPage'
});
</script>

<style scoped>

</style>