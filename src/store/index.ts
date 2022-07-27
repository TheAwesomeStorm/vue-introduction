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
    [Actions.CREATE_PROJECT](context, projectName: string) {
      return http.post('/projects', {
        name: projectName
      });
    },
    [Actions.READ_ALL_PROJECTS]({ commit }) {
      http.get('/projects').then(res => commit(Mutation.READ_PROJECTS, res.data));
    },
    [Actions.UPDATE_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [Actions.DELETE_PROJECT](context, id: number) {
      return http.delete(`/projects/${id}`).then(() => {
        context.commit(Mutation.DELETE_PROJECT, id);
      });
    }
  },
  mutations: {
    [Mutation.ADD_PROJECT](state, projectName: string) {
      const project: IProject = {
        id: Math.floor(Math.random() * (999 - 100 + 1)) + 100,
        name: projectName
      };
      state.projects.push(project);
    },
    [Mutation.DELETE_PROJECT](state, projectId: number) {
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