import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [
  //公共
  {
    path: '/Layout',
    name: 'Layout',
    component: () =>
      import('../components/Layout.vue')
  },
  //首页
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  //详情
  {
    path:'/Details',
    name:'Details',
    component:()=>
      import('../components/Details.vue')
  },
  {
    path: '/Classification',
    name: 'Classification',
    component: () =>
      import('../views/Classification.vue')
  },
  {
    path:'/Shopping',
    name:'Shopping',
    component:()=>
    import ('../views/Shopping.vue')
  },
  {
    path:'/Newaddress',
    name:'Newaddress',
    component:()=>
    import('../components/Newaddress.vue')
  },
  //全部订单
  {
    path:'/Allorders',
    name:'Allorders',
    component:()=>
    import('../components/Allorders.vue')
  },
  //评价
  {
    path:'/Evaluate',
    name:'Evaluate',
    component:()=>
    import('../components/Evaluate.vue')
  },
  {
    path:'/Location',
    naem:'Location',
    component:()=>
    import('../components/Location.vue')
  },
  //评价中心
  {
    path:'/EvaluationCenter',
    name:'EvaluationCenter',
    component:()=>
    import('../components/EvaluationCenter.vue')
  },
  {
    path:'/Recentbrowsing',
    name:'Recentbrowsing',
    component:()=>
    import('../components/Recentbrowsing.vue')
  },
  {
    path:'/Completed',
    name:'Completed',
    component:()=>
    import('../components/Completed.vue')
  },
  {
    path:'/Modify',
    name:'Modify',
    component:()=>
    import('../components/Modify.vue')
  },
  //结算
  {
    path:'/Settlement',
    name:'Settlement',
    component:()=>
    import('../views/Settlement.vue')
  },
  {
    path:'/Collectionofgoods',
    name:'Collectionofgoods',
    component:()=>
    import('../components/Collectionofgoods.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () =>
      import('../views/Login.vue')
  },
  {
    path:'/Address',
    name:'Address',
    component:()=>
    import('../components/Address.vue')
  },
  {
    path:'/My',
    name:'My',
    component:()=>
      import('../views/My.vue')
  },
  {
    path: '/Setup',
    name: 'Setup',
    component:()=>
    import('../components/Setup.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
