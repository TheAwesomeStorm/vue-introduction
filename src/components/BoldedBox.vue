<template>
  <li class="box has-text-weight-bold">
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  name: 'BoldedBox'
});
</script>

<style scoped>
.box {
  background: #FAF0CA;
}
</style>