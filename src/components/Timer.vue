<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Clock :time-in-seconds="timeInSeconds" />
    <button class="button" @click="startCountdown" :disabled="isRunning">
            <span class="icon">
              <i class="fas fa-play" />
            </span>
      <span>Play</span>
    </button>
    <button class="button" @click="stopCountdown" :disabled="!isRunning">
            <span class="icon">
              <i class="fas fa-stop" />
            </span>
      <span>Stop</span>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Clock from '@/components/Clock'

export default defineComponent ({
  name: 'Timer',
  components: { Clock },
  data () {
    return {
      timeInSeconds: 0,
      stopwatch: 0,
      isRunning: false
    }
  },
  methods: {
    startCountdown () {
      this.isRunning = true
      this.stopwatch = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000)
    },
    stopCountdown () {
      this.isRunning = false;
      clearInterval(this.stopwatch);
    }
  }
})
</script>

<style scoped>

</style>