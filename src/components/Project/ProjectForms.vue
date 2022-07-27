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
    edit () {
      return this.store.dispatch(Actions.UPDATE_PROJECT, {
        id: this.id,
        name: this.projectName
      })
          .then(() => {
            this.notify(NotificationTypes.warning, 'Name changed', 'Project name was changed by the user');
          })
          .catch(() => {
            this.notify(NotificationTypes.danger, 'Failed!', 'Failed to change project name');
          });
    },
    onFormSubmit () {
      let response: Promise<unknown>;
      this.id === undefined ? response = this.save() : response = this.edit();
      response.then(() => {
        this.$router.push('/projects');
      });
    },
    save () {
      return this.store.dispatch(Actions.CREATE_PROJECT, this.projectName)
          .then(() => {
            this.notify(NotificationTypes.success, 'Success!', 'New project added');
          })
          .catch(() => {
            this.notify(NotificationTypes.danger, 'Failed!', "Something went wrong when creating a new project");
          });
    }
  },
  mounted () {
    if (!this.id) return;
    const project = this.store.state.project.projects.find(project => project.id.toString() === this.id);
    this.projectName = project?.name || '';
  },
  name: "ProjectForms",
  props: {
    id: {
      type: String
    }
  },
  setup () {
    const store = useCustomStore();
    const { notify } = GetNotifier();
    return {
      notify,
      projects: computed(() => store.state.project.projects ),
      store
    };
  }
});
</script>

<style scoped>

</style>