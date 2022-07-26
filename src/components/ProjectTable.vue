<template>
  <router-link to='/projects/new' class='button'>
      <span class='icon is-small'>
        <i class='fas fa-plus' />
      </span>
    <span>New project</span>
  </router-link>
  <table class='table is-fullwidth'>
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for='project in projects' :key='project.id'>
      <td>{{ project.id }}</td>
      <td>{{ project.name }}</td>
      <td>
        <router-link :to='`/projects/${project.id}`' class='button'>
              <span class='icon is-small'>
              <i class='fas fa-pencil-alt' />
            </span>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang='ts'>
import { useCustomStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent ({
  name: "ProjectTable",
  setup () {
    const store = useCustomStore();
    return {
      projects: computed(() => store.state.projects)
    };
  }
});
</script>

<style scoped>

</style>