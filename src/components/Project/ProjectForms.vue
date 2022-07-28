<template>
  <form @submit.prevent='onFormSubmit'>
    <div class='field'>
      <label for='projectName' class='label'>
        Project Name
      </label>
      <input type='text' class='input' v-model='projectName' id='projectName' :placeholder='projectName'>
    </div>
    <div class='field'>
      <button class='button' type='submit' :disabled='isProjectNameEmpty'>
        Save
      </button>
    </div>
  </form>
</template>

<script lang='ts'>
import { Actions } from '@/store/actions';
import { GetNotifier } from '@/hooks/notifier';
import { NotificationTypes } from '@/interfaces/INotification';
import { useCustomStore } from '@/store';
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';

export default defineComponent ({
  computed: {
    isProjectNameEmpty (): boolean {
      return this.projectName.length === 0;
    }
  },
  name: "ProjectForms",
  props: {
    id: {
      type: String
    }
  },
  setup (props) {
    const store = useCustomStore();
    const router = useRouter();
    const { notify } = GetNotifier();
    const projectName = ref('');

    if (props.id) {
      const project = store.state.project.projects.find(project => project.id.toString() === props.id);
      projectName.value = project?.name || '';
    }

    const save = () => {
      return store.dispatch(Actions.CREATE_PROJECT, projectName.value)
          .then(() => {
            notify(NotificationTypes.success, 'Success!', 'New project added');
          })
          .catch(() => {
            notify(NotificationTypes.danger, 'Failed!', "Something went wrong when creating a new project");
          });
    };

    const edit = () => {
      return store.dispatch(Actions.UPDATE_PROJECT, {
        id: props.id,
        name: projectName.value
      })
          .then(() => {
            notify(NotificationTypes.warning, 'Name changed', 'Project name was changed by the user');
          })
          .catch(() => {
            notify(NotificationTypes.danger, 'Failed!', 'Failed to change project name');
          });
    };

    const onFormSubmit = () => {
      let response: Promise<unknown>;
      props.id === undefined ? response = save() : response = edit();
      response.then(() => {
        router.push('/projects');
      });
    };

    return {
      onFormSubmit,
      projectName
    };
  }
});
</script>

<style scoped>

</style>