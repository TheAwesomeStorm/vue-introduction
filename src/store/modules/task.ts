import { Actions } from '@/store/actions';
import { ITask } from '@/interfaces/ITask';
import { Module } from 'vuex';
import { Mutation } from '@/store/mutation';
import { State } from '@/store';
import http from '@/http';

export interface TaskState {
  tasks: ITask[]
}

export const task: Module<TaskState, State> = {
  actions: {
    [Actions.CREATE_TASK](context, task: ITask) {
      return http.post('/tasks', task).then(response => {
        context.commit(Mutation.ADD_TASK, response.data);
      });
    },
    [Actions.READ_ALL_TASKS]({ commit }, filter?: string) {
      let url = 'tasks';
      if (filter) url += `?description=${filter}`;
      http.get(url).then(res => commit(Mutation.STORE_TASKS, res.data));
    },
    [Actions.UPDATE_TASK](context, task: ITask) {
      return http.put(`/tasks/${task.id}`, task).then(() => {
        context.commit(Mutation.EDIT_TASK, task);
      });
    },
    [Actions.DELETE_TASK](context, id: number) {
      return http.delete(`/tasks/${id}`).then(() => {
        context.commit(Mutation.DELETE_TASK, id);
      });
    }
  },
  mutations: {
    [Mutation.ADD_TASK](state, task: ITask) {
      state.tasks.push(task);
    },
    [Mutation.DELETE_TASK](state, taskId: number) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    [Mutation.EDIT_TASK](state, task: ITask) {
      const index = state.tasks.findIndex(stateTask => stateTask.id === task.id);
      state.tasks[index] = task;
    },
    [Mutation.STORE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },
  },
  state: {
    tasks: []
  }
};