<template>
  <header>
    <div class="center">
      <div class="is-flex is-align-items-center is-flex-direction-column">
        <h1>
          <img src="../../assets/app-logo.png" alt="app-logo"/>
        </h1>
        <button class="button" @click="changeTheme">
          {{ buttonText }}
        </button>
      </div>
      <nav class="panel mt-5">
        <ul>
          <li>
            <router-link to="/" class="link">
              <i class="fas fa-tasks"> Tasks</i>
            </router-link>
          </li>
          <li>
            <router-link to="/projects" class="link">
              <i class="fas fa-project-diagram"> Projects</i>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
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
  .center {
    margin: 0 auto;
    width: fit-content;
  }
  .panel li {
    margin: 8px 0;
  }
  .link {
    color: #ffffff;
  }
  .link:hover {
    color: #faf0ca
  }
  .link-router-link-active {
    color: #faf0ca;
  }
</style>