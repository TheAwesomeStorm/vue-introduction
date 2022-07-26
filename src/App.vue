<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': isDarkModeEnabled }">
    <div class="column is-one-quarter">
      <LateralMenu @onThemeChanged="changeTheme" />
    </div>
    <div class="column is-three-quarters content">
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
      isDarkModeEnabled: false,
      tasks: [] as ITask[]
    };
  },
  methods: {
    changeTheme (isDarkModeEnabled: boolean) {
      this.isDarkModeEnabled = isDarkModeEnabled;
    },
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
  main {
    --default-bg-color: #ffffff;
    --default-text-color: #000000;
  }
  main.dark-mode {
    --default-bg-color: #2b2d42;
    --default-text-color: #dddddd;
  }
  .list {
    padding: 1.25rem;
  }
  .content {
    background-color: var(--default-bg-color);
  }
</style>
