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
      path: '/detail/:id',
      name: 'detail page',
      props: (route) => {
        return { id: route.params.id }
      },

      component: () => import(/* webpackChunkName: "about" */ './pages/Detail.vue')
    },
    {
      path: "/digital/customer-connection",
      name: "customer connection",
      component: () => import(/* webpackChunkName: "digital s1" */ './pages/Digital.vue'),
      props: {
        digitalPage: true,
        scenario: "customer"
      }
    }
    ,
    {
      path: "/digital/power-employee",
      name: "power employee",
      component: () => import(/* webpackChunkName: "digital s2" */ './pages/Digital.vue'),
      props: {
        digitalPage: true,
        scenario: "employee"
      }
    },
    {
      path: "/digital/optimize-business",
      name: "optimize business",
      component: () => import(/* webpackChunkName: "digital s3" */ './pages/Digital.vue'),
      props: {
        digitalPage: true,
        scenario: "business"
      }
    },
    {
      path: "/digital/transform-service",
      name: "transform service",
      component: () => import(/* webpackChunkName: "digital s4" */ './pages/Digital.vue'),
      props: {
        digitalPage: true,
        scenario: "service"
      }
    }
  ]
})
