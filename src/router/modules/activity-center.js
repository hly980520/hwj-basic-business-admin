import Layout from '@/layout'

const activityCenterRouter = {
    path: '/activity-center',
    component: Layout,
    redirect: '/activity-center/activity-list',
    name: 'Activity-Center',
    meta: {
        title: 'Activity Center',
        icon: 'table'
    },
    children: [
        {
            path: 'activity-list',
            component: () => import('@/views/activity-center/activity-list'),
            name: 'activityList',
            meta: { title: 'Activity List' }
        },
        {
            path: 'activity-task-list',
            component: () => import('@/views/activity-center/activity-task-list'),
            name: 'activityTaskList',
            meta: { title: 'Activity Task List' }
        },
        {
            path: 'activity-member-list',
            component: () => import('@/views/activity-center/activity-member'),
            name: 'activityMemberList',
            meta: { title: 'Activity Member List' }
        },
        {
            path: 'create-new-activity',
            component: () => import('@/views/activity-center/activity-info'),
            name: 'createNewActivity',
            meta: { title: 'Create New Activity' },
            hidden: true
        },
        {
            path: 'edit-activity',
            component: () => import('@/views/activity-center/activity-info'),
            name: 'editActivity',
            meta: { title: 'Edit Activity' },
            hidden: true
        },
        {
            path: 'view-activity',
            component: () => import('@/views/activity-center/activity-info'),
            name: 'viewActivity',
            meta: { title: 'View Activity' },
            hidden: true
        },
        {
            path: 'create-activity-task',
            component: () => import('@/views/activity-center/activity-task-info'),
            name: 'createActivityTask',
            meta: { title: 'Create Activity Task' },
            hidden: true
        },
        {
            path: 'edit-activity-task',
            component: () => import('@/views/activity-center/activity-task-info'),
            name: 'editActivityTask',
            meta: { title: 'Edit Activity Task' },
            hidden: true
        },
        {
            path: 'view-activity-task',
            component: () => import('@/views/activity-center/activity-task-info'),
            name: 'viewActivityTask',
            meta: { title: 'View Activity Task' },
            hidden: true
        }
    ]
}

export default activityCenterRouter