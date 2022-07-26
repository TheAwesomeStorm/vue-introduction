<template>
  <section class='projects'>
    <h1 class='title'>
      Projects
    </h1>
    <form @submit.prevent='save'>
      <div class='field'>
        <label for='projectName' class='label'>
          Project Name
        </label>
        <input type='text' class='input' v-model='projectName' id='projectName'>
      </div>
      <div class='field'>
        <button class='button' type='submit' :disabled='isProjectNameEmpty'>
          Save
        </button>
      </div>
    </form>
    <table class='table is-fullwidth'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='project in projects' :key='project.id'>
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang='ts'>
import { useCustomStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent ({
  computed: {
    isProjectNameEmpty (): boolean {
      return this.projectName.length === 0;
    }
  },
  data () {
    return {
      projectName: ''
    };
  },
  methods: {
    save () {
      this.store.commit('ADD_PROJECT', this.projectName);
      this.projectName = '';
    }
  },
  name: "ProjectsPage",
  setup () {
    const store = useCustomStore();
    return {
      projects: computed(() => store.state.projects ),
      store
    };
  }
});
</script>

<style scoped>
  .projects {
    padding: 1.25rem;
  }
</style>