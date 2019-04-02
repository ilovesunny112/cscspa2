import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/detail',
    //   name: 'detail',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './pages/Detail.vue')
    // },
    {
      path:'/detail/:id',
      name:'detail page',
      props:(route)=>{
        return {id: route.params.id }
      },
      
      component: () => import(/* webpackChunkName: "about" */ './pages/Detail.vue')
    },
    {
      path:"/digital/customer-connection",
      name:"customer connection",
      component:Home,
      props:{
        digitalPage:true
      }
    }
    ,
    {
      path:"/digital/power-employee",
      name:"power employee",
      component:Home,
      props:{
        digitalPage:true
      }
    },
    {
      path:"/digital/optimize-business",
      name:"optimize business",
      component:Home,
      props:{
        digitalPage:true
      }
    },
    {
      path:"/digital/transform-service",
      name:"transform service",
      component:Home,
      props:{
        digitalPage:true
      }
    }
  ]
})
