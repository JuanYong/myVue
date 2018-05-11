import Vue from 'vue'
import Router from 'vue-router'

import hello from '../views/hello'
import login from '../views/login'
import okay from '../views/okay'
import demo from '../views/demo'
import test from '../views/test'
import other from '../views/other'
import store from '../vuex/store'
import app from '../components/App'
Vue.use(Router)


 const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'login'
    }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{title: 'login',requireAuth: false},
    },
    {
      path:'/app',
      name: 'app',
      component: app,
      meta:{title: '飓风物流PC端',requireAuth: true},
      children:[
        {
          path: '',
          name: 'hello',
          component: hello,
        },
        {
          path: 'demo',
          name: 'demo',
          component: demo,
        },
        {
          path: 'hello',
          name: 'hello',
          component: hello,
        },
        {
          path: 'okay/',
          name: 'okay',
          component:okay,
          children: [
            {
              path: '',
              component: test
            },
            {
              path: 'other',
              name: 'other',
              component: other
            },
            {
              path: 'test',
              name: 'test',
              component: test
            } 
          ],
        }
      ]
    }
  ],
     // mode:'history'   //去#号 需要服务器支持
      mode:'hash'   //默认
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token');
  store.commit('SET_TOKEN', token);
  //  判断是否需要登录权限 以及是否登录
     if (to.meta.requireAuth) {// 判断是否需要登录权限
      if (!store.state.token && to.path !== '/login') {// 判断是否登录
        next({
          path: '/login',
       })
       } else {
        next()
        }
     } else {
          next()
        }
          //路由钩子改标题
        if(to.meta.title){
          document.title = to.meta.title
        }
   })

export default router


