import ProjectForms from '@/components/Project/ProjectForms.vue';
import ProjectTable from '@/components/Project/ProjectTable.vue';
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
        children: [
            {
                component: ProjectTable,
                name: 'Projects',
                path: ''
            },
            {
                component: ProjectForms,
                name: 'NewProject',
                path: 'new'
            },
            {
                component: ProjectForms,
                name: 'EditProject',
                path: ':id',
                props: true
            }
        ],
        component: ProjectsPage,
        path: '/projects'
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});