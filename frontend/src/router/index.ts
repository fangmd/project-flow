import loadable from '@loadable/component'
import { HomeOutlined, TableOutlined, BorderlessTableOutlined, UserOutlined } from '@ant-design/icons'

const HomePage = loadable(() => import(/* webpackChunkName: 'HomePage'*/ '@/pages/home'))
const MinePage = loadable(() => import(/* webpackChunkName: 'MinePage'*/ '@/pages/mine/mine'))
const Table = loadable(() => import(/* webpackChunkName: 'Table'*/ '@/pages/table'))

export default [
  {
    path: '/',
    component: HomePage,
    title: 'Dashboard',
    icon: HomeOutlined,
  },
  {
    path: '/table',
    title: 'CI/CD',
    children: [
      { path: '/table/table1', component: Table, title: '工程管理', icon: BorderlessTableOutlined },
    ],
  },
  {
    path: '/table2',
    title: '项目管理',
    children: [
      { path: '/table/table2', component: Table, title: '流程中心', icon: BorderlessTableOutlined },
    ],
  },
  { path: '/admin-user', component: MinePage, title: '用户管理', icon: UserOutlined },
]
