<template>
  <form @submit.prevent='onFormSubmit'>
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
</template>

<script lang='ts'>
import { Mutation } from '@/store/mutation';
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
      this.store.commit(Mutation.EDIT_PROJECT, {
        id: this.id,
        name: this.projectName
      });
    },
    onFormSubmit () {
      this.id === undefined ? this.save() : this.edit();
      this.$router.push('/projects');
    },
    save () {
      this.store.commit(Mutation.ADD_PROJECT, this.projectName);
      this.store.commit(Mutation.NOTIFICATE, {
        message: 'New project available',
        title: 'Project saved',
        type: NotificationTypes.success
      });
    }
  },
  mounted () {
    if (!this.id) return;
    const project = this.store.state.projects.find(project => project.id === this.id);
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
    return {
      projects: computed(() => store.state.projects ),
      store
    };
  }
});
</script>

<style scoped>

</style>