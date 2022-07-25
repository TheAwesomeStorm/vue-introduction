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
import { defineComponent } from 'vue';
import LateralMenu from '@/components/LateralMenu.vue';
import TaskForms from '@/components/TaskForms.vue';

export default defineComponent({
  name: 'App',
  components: {
    LateralMenu,
    TaskForms
  }
});
</script>

<style lang="scss">
  body {
    margin: 0;
  }
</style>
