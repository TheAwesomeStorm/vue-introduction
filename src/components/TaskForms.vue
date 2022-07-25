<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="A form to create new tasks">
        <input type="text" class="input" placeholder="Write a task to start">
      </div>
      <div class="column">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
          <section>
            <strong>{{ timeElapsed }}</strong>
          </section>
          <button class="button" @click="startCountdown">
            <span class="icon">
              <i class="fas fa-play" />
            </span>
            <span>Play</span>
          </button>
          <button class="button" @click="stopCountdown">
            <span class="icon">
              <i class="fas fa-stop" />
            </span>
              <span>Stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TaskForms',
  computed: {
    timeElapsed (): string {
      return new Date(1000 * this.timeInSeconds).toISOString().substring(19, 11);
    }
  },
  data () {
    return {
      timeInSeconds: 0,
      stopwatch: 0
    }
  },
  methods: {
    startCountdown () {
      this.stopwatch = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000)
    },
    stopCountdown () {
      clearInterval(this.stopwatch);
    }
  }
})
</script>

<style scoped>

</style>