import { Actions } from '@/store/actions';
import { INotification } from '@/interfaces/INotification';
import { IProject } from '@/interfaces/IProject';
import { ITask } from '@/interfaces/ITask';
import { InjectionKey } from 'vue';
import { Mutation } from '@/store/mutation';
import http from '@/http';
import { Store, createStore, useStore } from 'vuex';

interface State {
  notifications: INotification[]
  projects: IProject[]
  tasks: ITask[]
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
      http.get('/projects').then(res => commit(Mutation.STORE_PROJECTS, res.data));
    },
    [Actions.UPDATE_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [Actions.DELETE_PROJECT](context, id: number) {
      return http.delete(`/projects/${id}`).then(() => {
        context.commit(Mutation.DELETE_PROJECT, id);
      });
    },
    [Actions.CREATE_TASK](context, task: ITask) {
      return http.post('/tasks', task).then(response => {
        context.commit(Mutation.ADD_TASK, response.data);
      });
    },
    [Actions.READ_ALL_TASKS]({ commit }) {
      http.get('/tasks').then(res => commit(Mutation.STORE_TASKS, res.data));
    },
    [Actions.UPDATE_TASK](context, task: ITask) {
      return http.put(`/projects/${task.id}`, task);
    },
    [Actions.DELETE_TASK](context, id: number) {
      return http.delete(`/tasks/${id}`).then(() => {
        context.commit(Mutation.DELETE_TASK, id);
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
    [Mutation.STORE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },
    [Mutation.ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [Mutation.DELETE_TASK](state, taskId: number) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    [Mutation.STORE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
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
    projects: [],
    tasks: []
  }
});