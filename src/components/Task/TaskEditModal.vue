<template>
  <div class='modal'>
    <div class='modal-background' @click='onClose' />
    <div class='modal-card'>
      <header class='modal-card-head'>
        <p class='modal-card-title'>Edit task</p>
        <button class='delete' aria-label='close' @click='onClose'></button>
      </header>
      <section class='modal-card-body'>
        <div class='field'>
          <label for='taskDescription' class='label'>
            Description
          </label>
          <input type='text' class='input' v-model="taskDescription" id="taskDescription" placeholder='Task name'>
        </div>
      </section>
      <footer class='modal-card-foot'>
        <button class='button is-success' @click='editTask'>Save changes</button>
        <button class='button' @click='onClose'>Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { ITask, Task } from '@/interfaces/ITask';

export default defineComponent ({
  data () {
    return {
      taskDescription: this.task.description
    };
  },
  methods: {
    editTask() {
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
    onClose: {
      required: true,
      type: Function
    },
    onSave: {
      required: true,
      type: Function
    },
    task: {
      required: true,
      type: Task
    }
  }
});
</script>

<style scoped>

</style>