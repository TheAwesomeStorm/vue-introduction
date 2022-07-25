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
import Clock from '@/components/Clock';
import { defineComponent } from 'vue';

export default defineComponent ({
  components: { Clock },
  data () {
    return {
      isRunning: false,
      stopwatch: 0,
      timeInSeconds: 0
    };
  },
  methods: {
    startCountdown () {
      this.isRunning = true;
      this.stopwatch = setInterval(() => {
        this.timeInSeconds += 1;
      }, 1000);
    },
    stopCountdown () {
      this.isRunning = false;
      clearInterval(this.stopwatch);
    }
  },
  name: 'Timer'
});
</script>

<style scoped>

</style>