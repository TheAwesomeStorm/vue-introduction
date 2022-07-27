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
import { Actions } from '@/store/actions';
import { NotificationTypes } from '@/interfaces/INotification';
import { notificationMixin } from '@/mixins/notify';
import { useCustomStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent ({
  methods: {
    deleteProject (projectId: number) {
      this.store.dispatch(Actions.DELETE_PROJECT, projectId).then(() => {
        this.notify(NotificationTypes.danger, 'Project delete', 'A project was deleted by the user');
      });
    }
  },
  mixins: [
      notificationMixin
  ],
  name: "ProjectTable",
  setup () {
    const store = useCustomStore();
    store.dispatch(Actions.READ_ALL_PROJECTS);
    return {
      projects: computed(() => store.state.projects),
      store
    };
  }
});
</script>

<style scoped>

</style>