<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': isDarkModeEnabled }">
    <div class="column is-one-quarter">
      <LateralMenu @onThemeChanged="changeTheme" />
    </div>
    <div class="column is-three-quarters content">
      <Notification />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import LateralMenu from '@/components/LateralMenu.vue';
import Notification from '@/components/Notification.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    LateralMenu,
    Notification
  },
  data () {
    return {
      isDarkModeEnabled: false
    };
  },
  methods: {
    changeTheme (isDarkModeEnabled: boolean) {
      this.isDarkModeEnabled = isDarkModeEnabled;
    }
  },
  name: 'App'
});
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  main {
    --default-bg-color: #ffffff;
    --default-text-color: #000000;
  }
  main.dark-mode {
    --default-bg-color: #2b2d42;
    --default-text-color: #dddddd;
  }
  .list {
    padding: 1.25rem;
  }
  .content {
    background-color: var(--default-bg-color);
  }
</style>
