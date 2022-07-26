<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <LateralMenu />
    </div>
    <div class="column is-three-quarters">
      <TaskForms @onTaskCompleted="saveTask" />
      <ul class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import { ITask } from '@/interfaces/ITask';
import LateralMenu from '@/components/LateralMenu.vue';
import Task from '@/components/Task.vue';
import TaskForms from '@/components/TaskForms.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LateralMenu,
    Task,
    TaskForms
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
  name: 'App'
});
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  .list {
    padding: 1.25rem;
  }
</style>
