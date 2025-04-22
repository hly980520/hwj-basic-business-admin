import Layout from '@/layout'

const memberCenterRouter = {
    path: '/member-center',
    component: Layout,
    redirect: '/member-center/member-list',
    name: 'Member-Center',
    meta: {
        title: 'Member Center',
        icon: 'table'
    },
    children: [
        {
            path: 'member-list',
            component: () => import('@/views/member-center/list'),
            name: 'memberList',
            meta: { title: 'Member List' }
        }
    ]
}

export default memberCenterRouter