import Layout from '@/layout'

const giftCenterRouter = {
    path: '/gift-center',
    component: Layout,
    redirect: '/gift-center/gift-list',
    name: 'Gift-Center',
    meta: {
        title: 'Gift Center',
        icon: 'table'
    },
    children: [
        {
            path: 'gift-list',
            component: () => import('@/views/gift-center/gift-list'),
            name: 'giftList',
            meta: { title: 'Gift List' }
        },
        {
            path: 'gift-issue-log',
            component: () => import('@/views/gift-center/gift-issue-log'),
            name: 'giftIssueLog',
            meta: { title: 'Gift Issue Log' }
        },
        {
            path: 'create-new-gift',
            component: () => import('@/views/gift-center/gift-info'),
            name: 'createNewGift',
            meta: { title: 'Create New Gift' },
            hidden: true
        },
        {
            path: 'edit-Gift',
            component: () => import('@/views/gift-center/gift-info'),
            name: 'editGift',
            meta: { title: 'Edit Gift' },
            hidden: true
        },
        {
            path: 'view-gift',
            component: () => import('@/views/gift-center/gift-info'),
            name: 'viewGift',
            meta: { title: 'View Gift' },
            hidden: true
        }
    ]
}

export default giftCenterRouter