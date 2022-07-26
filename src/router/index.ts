import TaskPage from '@/views/TaskPage.vue';
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [{
    component: TaskPage,
    name: 'Tasks',
    path: '/'
}];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});