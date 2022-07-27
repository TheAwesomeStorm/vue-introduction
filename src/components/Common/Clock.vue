<template>
  <section>
    <strong class="display">{{ timeElapsed }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  computed: {
    timeElapsed (): string {
      return new Date(1000 * this.timeInSeconds).toISOString().substring(19, 11);
    }
  },
  name: 'Clock',
  props: {
    timeInSeconds: {
      default: 0,
      type: Number
    }
  }
});
</script>

<style scoped>
  .display {
    color: var(--default-text-color);
  }
</style>