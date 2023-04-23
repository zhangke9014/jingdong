import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/home/Home'
// import Login from '../views/login/Login'
// import Register from '../views/register/Register'
// import Shop from '../views/shop/Shop'
const routes = [
  {
    path:'/',
    redirect:'Login'
  },
  {
    path:'/AllOrders',
    name:'AllOrders',
    component: () => import(/* webpackChunkName: "AllOrders" */ '../views/Person/AllOrders')
  },
  {
    path: '/Home',
    name: 'Home',
    //component: Home,
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  }, {
    path: '/CartList',
    name: 'CartList',
    //component: Home,
    component: () => import(/* webpackChunkName: "CartList" */ '../views/CartList/CartList')
  }, {
    path: '/orderConfrimation/:id',
    name: 'orderConfrimation',
    //component: Home,
    component: () => import(/* webpackChunkName: "orderConfrimation" */ '../views/orderConfrimation/orderConfrimation')
  }, {
    path: '/orderList',
    name: 'orderList',
    //component: Home,
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/orderList')
  },{
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter: (to, from, next) => {
      const isLogin = localStorage.isLogin
      if(isLogin){
        next({name:'Home'})
      }else{
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter: (to, from, next) => {
      const isLogin = localStorage.isLogin
      if(isLogin){
        next({name:'Home'})
      }else{
        next()
      }
    }
  },{
    path:'/Person',
    name:'Person',
    component: () => import(/* webpackChunkName: "register" */ '../views/Person/Person')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin
  const name = to.name
  const isLoginOrRegister = (name=='Login'||name=='Register')
  if (isLogin || isLoginOrRegister) {
    next()
  } else {
    next({ name: 'Login' })
  }
})
export default router
