import { INotification } from '@/interfaces/INotification';
import { Module } from 'vuex';
import { Mutation } from '@/store/mutation';
import { State } from '@/store';

export interface NotificationState {
  notifications: INotification[]
}

export const notification: Module<NotificationState, State> = {
  mutations: {
    [Mutation.NOTIFY](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);
      setTimeout(() => {
        state.notifications = state.notifications.filter(
          notificationState => notificationState.id !== notification.id);
      }, 2000);
    }
  },
  state: {
    notifications: []
  }
};