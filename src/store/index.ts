import { InjectionKey } from 'vue';
import { NotificationState, notification } from '@/store/modules/notification';
import { ProjectState, project } from '@/store/modules/project';
import { Store, createStore, useStore } from 'vuex';
import { TaskState, task } from '@/store/modules/task';

export interface State {
  notification: NotificationState,
  project: ProjectState,
  task: TaskState
}

export function useCustomStore(): Store<State> {
  return useStore(storeStateKey);
}

export const storeStateKey: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  modules: {
    notification,
    project,
    task
  },
});