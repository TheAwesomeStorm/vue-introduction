<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <LateralMenu />
    </div>
    <div class="column is-three-quarters">
      <TaskForms @onTaskCompleted="saveTask" />
      <ul class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
        <BoldedBox v-if="isTasksEmpty">
          No tasks yet
        </BoldedBox>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import BoldedBox from '@/components/BoldedBox.vue';
import { ITask } from '@/interfaces/ITask';
import LateralMenu from '@/components/LateralMenu.vue';
import Task from '@/components/Task.vue';
import TaskForms from '@/components/TaskForms.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    BoldedBox,
    LateralMenu,
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
