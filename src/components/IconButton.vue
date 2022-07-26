<template>
  <button class="button" :disabled="isDisabled">
    <span class="icon">
      <i :class="icon" />
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'IconButton',
  props: {
    icon: {
      required: true,
      type: String
    },
    isDisabled: {
      default: false,
      type: Boolean
    },
    text: {
      required: true,
      type: String
    }
  }
});
</script>

<style scoped>

</style>