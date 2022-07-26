<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Clock :time-in-seconds="timeInSeconds" />
    <IconButton text="Play" @click="startCountdown" icon="fas fa-play" :isDisabled="isRunning" />
    <IconButton text="Stop" @click="stopCountdown" icon="fas fa-stop" :isDisabled="!isRunning" />
  </div>
</template>

<script>
import Clock from '@/components/Clock';
import IconButton from '@/components/IconButton';
import { defineComponent } from 'vue';

export default defineComponent ({
  components: {
    Clock,
    IconButton
  },
  data () {
    return {
      isRunning: false,
      stopwatch: 0,
      timeInSeconds: 0
    };
  },
  emits: ['onTimerStopped'],
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
      this.$emit('onTimerStopped', this.timeInSeconds);
      this.timeInSeconds = 0;
    }
  },
  name: 'Timer'
});
</script>

<style scoped>

</style>