<template>
  <header class="is-flex is-align-items-center is-flex-direction-column">
    <h1>
      <img src="../assets/app-logo.png" alt="app-logo"/>
    </h1>
    <button class="button" @click="changeTheme">
      {{ buttonText }}
    </button>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent ({
    computed: {
      buttonText (): string {
        if (this.isDarkModeEnabled) return 'Disable dark mode';
        return 'Enable dark mode';
      }
    },
    data () {
      return {
        isDarkModeEnabled: false
      };
    },
    emits: ['onThemeChanged'],
    methods: {
      changeTheme () {
        this.isDarkModeEnabled = !this.isDarkModeEnabled;
        this.$emit('onThemeChanged', this.isDarkModeEnabled);
      }
    },
    name: "LateralMenu"
  });
</script>

<style scoped>
  header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
  }

  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }
</style>