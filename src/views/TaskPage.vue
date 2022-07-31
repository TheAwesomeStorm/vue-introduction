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
  <TaskEditModal
      v-if="selectedTask"
      :is-modal-shown="isModalShown"
      :onClose='closeModal'
      :on-save='editTask'
      v-model:description="selectedTask.description"
  />
</template>

<script lang="ts">
import { Actions } from '@/store/actions';
import BoldedBox from '@/components/Common/BoldedBox.vue';
import { ITask } from '@/interfaces/ITask';
import TaskEditModal from '@/components/Task/TaskEditModal.vue';
import TaskForms from '@/components/Task/TaskForms.vue';
import TaskItem from '@/components/Task/TaskItem.vue';
import { useCustomStore } from '@/store';
import { computed, defineComponent, ref, watchEffect } from 'vue';

export default defineComponent ({
  components: {
    BoldedBox,
    TaskEditModal,
    TaskForms,
    TaskItem
  },
  computed: {
    isModalShown (): boolean {
      return this.selectedTask !== null;
    },
    isTasksEmpty (): boolean {
      return this.tasks.length === 0;
    }
  },
  data () {
    return {
      originalDescription: '',
      selectedTask: null as ITask | null
    };
  },
  methods: {
    closeModal() {
      if (!this.selectedTask) return;
      this.selectedTask.description = this.originalDescription;
      this.selectedTask = null;
    },
    editTask () {
      this.selectedTask &&
      this.store.dispatch(Actions.UPDATE_TASK, this.selectedTask)
          .then(() => this.selectedTask = null);
    },
    saveTask (task: ITask) {
      this.store.dispatch(Actions.CREATE_TASK, task);
    },
    selectTask (task: ITask) {
      this.selectedTask = task;
      this.originalDescription = task.description;
    }
  },
  name: 'TaskPage',
  setup() {
    const filter = ref('');
    const store = useCustomStore();

    /* Use the code below to filter tasks using the Vuex state */
    // const tasks = computed(() =>
    //     store.state.task.tasks.filter(task =>
    //         !filter.value || task.description.includes(filter.value)
    //     )
    // );

    /* Use the code below to filter tasks using requests to the API */
    const tasks = computed(() => store.state.task.tasks);

    watchEffect(() => {
      store.dispatch(Actions.READ_ALL_TASKS, filter.value);
    });

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