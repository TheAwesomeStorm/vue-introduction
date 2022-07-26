<template>
  <div class='notifications'>
    <article class='message'
             v-for='notification in notifications'
             :key='notification.id'
             :class='notification.type'>
      <div class='message-header'>{{notification.title}}</div>
      <div class='message-body'>{{notification.message}}</div>
    </article>
  </div>
</template>

<script lang='ts'>
import { useCustomStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent ({
  name: "Notification",
  setup () {
    const store = useCustomStore();
    return {
      notifications: computed(() => store.state.notifications)
    };
  }
});
</script>

<style scoped>
.notifications {
  padding: 8px;
  position: absolute;
  right: 0;
  width: 300px;
  z-index: 1;
}
</style>