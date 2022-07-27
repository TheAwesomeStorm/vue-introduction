<template>
  <TaskForms @onTaskCompleted="saveTask" />
  <ul class="list">
    <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" @click='selectTask(task)' class='is-cursor-pointer' />
    <BoldedBox v-if="isTasksEmpty">
      No tasks yet
    </BoldedBox>
  </ul>
  <TaskEditModal v-if='selectedTask' :class="{ 'is-active': selectedTask }" :onClose='closeModal' :on-save='editTask' :task='task' />
</template>

<script lang="ts">
import { Actions } from '@/store/actions';
import BoldedBox from '@/components/Common/BoldedBox.vue';
import TaskEditModal from '@/components/Task/TaskEditModal.vue';
import TaskForms from '@/components/Task/TaskForms.vue';
import TaskItem from '@/components/Task/TaskItem.vue';
import { useCustomStore } from '@/store';
import { ITask, Task } from '@/interfaces/ITask';
import { computed, defineComponent } from 'vue';

export default defineComponent ({
  components: {
    BoldedBox,
    TaskEditModal,
    TaskForms,
    TaskItem
  },
  computed: {
    isTasksEmpty (): boolean {
      return this.tasks.length === 0;
    },
    task (): Task | null {
      if (!this.selectedTask) return null;
      return new Task(this.selectedTask);
    }
  },
  data () {
    return {
      selectedTask: null as ITask | null
    };
  },
  methods: {
    closeModal() {
      this.selectedTask = null;
    },
    editTask (task: ITask) {
      this.store.dispatch(Actions.UPDATE_TASK, task).then(() => this.selectedTask = null);
    },
    saveTask (task: ITask) {
      this.store.dispatch(Actions.CREATE_TASK, task);
    },
    selectTask (task: ITask) {
      this.selectedTask = task;
    }
  },
  name: 'TaskPage',
  setup() {
    const store = useCustomStore();
    store.dispatch(Actions.READ_ALL_TASKS);
    store.dispatch(Actions.READ_ALL_PROJECTS);
    return {
      store,
      tasks: computed(() => store.state.task.tasks)
    };
  }
});
</script>

<style scoped>
  .is-cursor-pointer {
    cursor: pointer;
  }
</style>