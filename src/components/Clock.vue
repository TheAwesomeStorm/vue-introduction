<template>
  <section>
    <strong>{{ timeElapsed }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'Clock',
  computed: {
    timeElapsed (): string {
      return new Date(1000 * this.timeInSeconds).toISOString().substring(19, 11);
    }
  },
  props: {
    timeInSeconds: {
      default: 0,
      type: Number
    }
  }
})
</script>

<style scoped>

</style>