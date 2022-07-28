<template>
  <TaskForms @onTaskCompleted="saveTask" />
  <ul class="list">
    <li class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Search for a task" v-model='filter'>
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </li>
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
import { computed, defineComponent, ref, watchEffect } from 'vue';

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
    const filter = ref('');
    const store = useCustomStore();
    const tasks = computed(() =>
        store.state.task.tasks.filter(task =>
            !filter.value || task.description.includes(filter.value)
        )
    );

    /* Use the code below to filter the API instead of the Vuex state */
    // const tasks = computed(() => store.state.task.tasks);
    //
    // watchEffect(() => {
    //   store.dispatch(Actions.READ_ALL_TASKS, filter.value);
    // });

    store.dispatch(Actions.READ_ALL_TASKS);
    store.dispatch(Actions.READ_ALL_PROJECTS);

    return {
      filter,
      store,
      tasks
    };
  }
});
</script>

<style scoped>
  .is-cursor-pointer {
    cursor: pointer;
  }
  .list {
    list-style: none;
    margin: 0;
    padding: 0 1.25rem;
  }
</style>