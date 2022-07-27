import { Actions } from '@/store/actions';
import { IProject } from '@/interfaces/IProject';
import { Module } from 'vuex';
import { Mutation } from '@/store/mutation';
import { State } from '@/store';
import http from '@/http';

export interface ProjectState {
  projects: IProject[]
}

export const project: Module<ProjectState, State> = {
  actions: {
    [Actions.CREATE_PROJECT](context, projectName: string) {
      return http.post('/projects', {
        name: projectName
      });
    },
    [Actions.READ_ALL_PROJECTS]({ commit }) {
      http.get('/projects').then(res => {
        commit(Mutation.STORE_PROJECTS, res.data);
      });
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
    [Mutation.STORE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    }
  },
  state: {
    projects: []
  }
};

