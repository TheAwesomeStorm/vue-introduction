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
import { Actions } from '@/store/actions';
import BoldedBox from '@/components/Common/BoldedBox.vue';
import { ITask } from '@/interfaces/ITask';
import TaskForms from '@/components/Task/TaskForms.vue';
import TaskItem from '@/components/Task/TaskItem.vue';
import { useCustomStore } from '@/store';
import { computed, defineComponent } from 'vue';

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
  methods: {
    saveTask (task: ITask) {
      this.store.dispatch(Actions.CREATE_TASK, task);
    }
  },
  name: 'TaskPage',
  setup() {
    const store = useCustomStore();
    store.dispatch(Actions.READ_ALL_TASKS);
    store.dispatch(Actions.READ_ALL_PROJECTS);
    return {
      store,
      tasks: computed(() => store.state.tasks)
    };
  }
});
</script>

<style scoped>

</style>