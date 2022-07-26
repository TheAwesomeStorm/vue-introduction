<template>
  <section class='projects'>
    <h1 class='title'>
      Projects
    </h1>
    <router-link to='/projects/new' class='button'>
      <span class='icon is-small'>
        <i class='fas fa-plus' />
      </span>
      <span>New project</span>
    </router-link>
    <ProjectTable class='mt-4' />
  </section>
</template>

<script lang='ts'>
import ProjectTable from '@/components/ProjectTable.vue';
import { defineComponent } from 'vue';

export default defineComponent ({
  components: {
    ProjectTable
  },
  name: "ProjectsPage"
});
</script>

<style scoped>
  .projects {
    padding: 1.25rem;
  }
  .title {
    color: var(--default-text-color);
  }
</style>