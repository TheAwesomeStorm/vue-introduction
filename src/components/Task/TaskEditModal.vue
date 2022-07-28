<template>
  <Modal :on-back-ground-click="onClose" :is-shown="isModalShown">
    <template v-slot:header>
      <p class='modal-card-title'>Edit task</p>
      <button class='delete' aria-label='close' @click='onClose'></button>
    </template>
    <template v-slot:body>
      <div class='field'>
        <label for='taskDescription' class='label'>
          Description
        </label>
        <input type='text' class='input' v-model="computedTaskDescription" id="taskDescription" placeholder='Task name'>
      </div>
    </template>
    <template v-slot:footer>
      <button class='button is-success' @click='editTask'>Save changes</button>
      <button class='button' @click='onClose'>Cancel</button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import Modal from '@/components/Common/Modal.vue';
import { defineComponent } from 'vue';
import { ITask, Task } from '@/interfaces/ITask';

export default defineComponent ({
  components: {
    Modal
  },
  computed: {
    computedTaskDescription: {
      get() {
        return this.task?.description || '';
      },
      set(value: string) {
        this.taskDescription = value;
      }
    }
  },
  data () {
    return {
      taskDescription: ''
    };
  },
  methods: {
    editTask() {
      if (this.task === undefined) return;
      const task: ITask = {
        description: this.taskDescription,
        durationInSeconds: this.task.durationInSeconds,
        id: this.task.id,
        project: this.task.project
      };
      this.onSave(task);
    }
  },
  name: "TaskEditModal",
  props: {
    isModalShown: {
      required: true,
      type: Boolean
    },
    onClose: {
      required: true,
      type: Function
    },
    onSave: {
      required: true,
      type: Function
    },
    task: {
      required: false,
      type: Task
    }
  }
});
</script>

<style scoped>

</style>