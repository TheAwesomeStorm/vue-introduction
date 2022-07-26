import { IProject } from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { Store, createStore, useStore } from 'vuex';

interface State {
  projects: IProject[]
}

export function useCustomStore(): Store<State> {
  return useStore(storeStateKey);
}

export const storeStateKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  mutations: {
    'ADD_PROJECT'(state, projectName: string) {
      const project: IProject = {
        id: new Date().toISOString(),
        name: projectName
      };
      state.projects.push(project);
    },
    'DELETE_PROJECT'(state, projectId: string) {
      state.projects = state.projects.filter(project => project.id !== projectId);
    },
    'EDIT_PROJECT'(state, project: IProject) {
      const index = state.projects.findIndex(stateProject => stateProject.id === project.id);
      state.projects[index] = project;
    }
  },
  state: {
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