import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index'
import AdminPage from '@/views/layout/index'
import UserManage from '@/views/content/managerUser'
import AdminManange from '@/views/content/managerAdmin'
import AskProManage from '@/views/content/manageAskPro'
import FilmAddManage from '@/views/content/managerFilmAdd'
import FilmListManage from '@/views/content/managerFilmList'
import FilmSlideManage from '@/views/content/managerFilmSlide'
import CommentaryManage from '@/views/content/managerCommentary'
import ProCommentaryManage from '@/views/content/managerCommentaryPro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/page/manage',
      name: 'AdminPage',
      component: AdminPage,
      children: [{
        path: 'user',
        component: UserManage
      }, {
        path: 'admin',
        component: AdminManange
      }, {
        path: 'askpro',
        component: AskProManage
      }, {
        path: 'film',
        component: FilmAddManage
      },{
        path: 'filmlist',
        component:FilmListManage
      },{
        path: 'filmslide',
        component:FilmSlideManage
      },{
        path: 'commentary',
        component:CommentaryManage
      },{
        path: 'commentary/pro',
        component:ProCommentaryManage
      }]
    }
  ]
})
