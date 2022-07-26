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
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});