import { Actions } from '@/store/actions';
import { INotification } from '@/interfaces/INotification';
import { IProject } from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { Mutation } from '@/store/mutation';
import http from '@/http';
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
  actions: {
    [Actions.CREATE_PROJECTS](context, projectName: string) {
      return http.post('/projects', {
        name: projectName
      });
    },
    [Actions.UPDATE_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [Actions.READ_ALL_PROJECTS]({ commit }) {
      http.get('/projects').then(res => commit(Mutation.READ_PROJECTS, res.data));
    }
  },
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
    [Mutation.READ_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
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
    notifications: [],
    projects: []
  }
});