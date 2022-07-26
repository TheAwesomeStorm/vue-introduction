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
    }
  },
  state: {
    projects: [
      {
        id: new Date().toISOString(),
        name: 'Typescript'
      },
      {
        id: new Date().toISOString(),
        name: 'Vue'
      },
      {
        id: new Date().toISOString(),
        name: 'Vuex'
      }
    ]
  }
});