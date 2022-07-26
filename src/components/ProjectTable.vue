<template>
  <router-link to='/projects/new' class='button'>
      <span class='icon is-small'>
        <i class='fas fa-plus' />
      </span>
    <span>New project</span>
  </router-link>
  <table class='table is-fullwidth mt-4'>
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
        <button class='button ml-2 is-danger' @click='deleteProject(project.id)'>
          <i class='fas fa-trash' />
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang='ts'>
import { Mutation } from '@/store/mutation';
import { useCustomStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent ({
  methods: {
    deleteProject (projectId: string) {
      this.store.commit(Mutation.DELETE_PROJECT, projectId);
    }
  },
  name: "ProjectTable",
  setup () {
    const store = useCustomStore();
    return {
      projects: computed(() => store.state.projects),
      store
    };
  }
});
</script>

<style scoped>

</style>