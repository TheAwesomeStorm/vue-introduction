<template>
  <TaskForms @onTaskCompleted="saveTask" />
  <ul class="list">
    <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" />
    <BoldedBox v-if="isTasksEmpty">
      No tasks yet
    </BoldedBox>
  </ul>
</template>

<script lang="ts">
import BoldedBox from '@/components/Common/BoldedBox.vue';
import { ITask } from '@/interfaces/ITask';
import TaskForms from '@/components/Task/TaskForms.vue';
import TaskItem from '@/components/Task/TaskItem.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
  components: {
    BoldedBox,
    TaskForms,
    TaskItem
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