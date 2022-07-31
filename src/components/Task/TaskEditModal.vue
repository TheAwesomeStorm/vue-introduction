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
        <input
            type='text'
            class='input'
            id="taskDescription"
            placeholder='Task name'
            :value="description"
            @input="$emit('update:description', $event.target.value)"
        >
      </div>
    </template>
    <template v-slot:footer>
      <button
          class='button is-success'
          @click="onSave"
      >
        Save changes
      </button>
      <button class='button' @click='onClose'>Cancel</button>
    </template>
  </Modal>
</template>

<script lang='ts'>
import Modal from '@/components/Common/Modal.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
  components: {
    Modal
  },
  emits: ['update:description'],
  name: "TaskEditModal",
  props: {
    description: {
      required: false,
      type: String
    },
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
    }
  }
});
</script>

<style scoped>

</style>