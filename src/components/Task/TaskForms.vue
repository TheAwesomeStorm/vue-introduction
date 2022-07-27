<template>
  <div class="box task-forms">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="A form to create new tasks">
        <input type="text" class="input" placeholder="Write a task to start" v-model="description">
      </div>
      <div class='column is-3'>
        <div class='select'>
          <select title='selectAProject' v-model='projectId'>
            <option value=''>Select a project</option>
            <option v-for='project in projects' :key='project.id' :value='project.id'>
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Timer @onTimerStopped="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Timer from '@/components/Common/Timer.vue';
import { useCustomStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  components: {
    Timer
  },
  data () {
    return {
      description: '',
      projectId: ''
    };
  },
  emits: [
      'onTaskCompleted'
  ],
  methods: {
    endTask (totalTimeElapsed: number): void {
      this.$emit('onTaskCompleted', {
        description: this.description,
        durationInSeconds: totalTimeElapsed,
        project: this.projects.find(project => project.id === this.projectId)
      });
      this.description = '';
    }
  },
  name: 'TaskForms',
  setup () {
    const store = useCustomStore();
    return {
      projects: computed(() => store.state.projects)
    };
  }
});
</script>

<style>
  .task-forms {
    background-color: var(--default-bg-color);
    color: var(--default-text-color)
  }
</style>