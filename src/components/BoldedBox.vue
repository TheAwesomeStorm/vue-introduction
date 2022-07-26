<template>
  <li class="box has-text-weight-bold" :style="styles">
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
  data () {
    return {
      styles: {
        backgroundColor: '#FAF0CA'
      }
    };
  },
  name: 'BoldedBox'
});
</script>