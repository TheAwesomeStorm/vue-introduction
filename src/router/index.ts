import ProjectForms from '@/components/ProjectForms.vue';
import ProjectsPage from '@/views/ProjectsPage.vue';
import TaskPage from '@/views/TaskPage.vue';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        component: TaskPage,
        name: 'Tasks',
        path: '/'
    },
    {
        component: ProjectsPage,
        name: 'Projects',
        path: '/projects'
    },
    {
        component: ProjectForms,
        name: 'NewProject',
        path: '/projects/new'
    },
    {
        component: ProjectForms,
        name: 'EditProject',
        path: '/projects/edit/:id',
        props: true
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});