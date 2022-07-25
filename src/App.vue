<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <LateralMenu />
    </div>
    <div class="column is-three-quarters">
      <TaskForms />
    </div>
  </main>
</template>

<script lang="ts">
import LateralMenu from '@/components/LateralMenu.vue';
import TaskForms from '@/components/TaskForms.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LateralMenu,
    TaskForms
  },
  name: 'App'
});
</script>

<style lang="scss">
  body {
    margin: 0;
  }
</style>
