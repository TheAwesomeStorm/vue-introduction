import { INotification } from '@/interfaces/INotification';
import { IProject } from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { Mutation } from '@/store/mutation';
import { Store, createStore, useStore } from 'vuex';

interface State {
  notifications: INotification[]
  projects: IProject[]
}

export function useCustomStore(): Store<State> {
  return useStore(storeStateKey);
}

export const storeStateKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  mutations: {
    [Mutation.ADD_PROJECT](state, projectName: string) {
      const project: IProject = {
        id: new Date().toISOString(),
        name: projectName
      };
      state.projects.push(project);
    },
    [Mutation.DELETE_PROJECT](state, projectId: string) {
      state.projects = state.projects.filter(project => project.id !== projectId);
    },
    [Mutation.EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex(stateProject => stateProject.id === project.id);
      state.projects[index] = project;
    },
    [Mutation.NOTIFICATE](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);
      setTimeout(() => {
        state.notifications = state.notifications.filter(
          notificationState => notificationState.id !== notification.id);
      }, 2000);
    }
  },
  state: {
    notifications: [],
    projects: [
      {
        id: '0',
        name: 'Typescript'
      },
      {
        id: '1',
        name: 'Vue'
      },
      {
        id: '2',
        name: 'Vuex'
      }
    ]
  }
});