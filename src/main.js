import Vue from 'vue'
import App from './App.vue'
import routes from './router.js'
import VueRouter from 'vue-router'
import VuePapaParse from 'vue-papa-parse'

Vue.use(VueRouter)
Vue.use(VuePapaParse)

const router = new VueRouter({
  routes
})

const adminRoutes = ['/admin', '/signup']
const isAdminRoute = path => adminRoutes.find(route => route === path)

router.beforeEach((to, from, next) => {
  const userLoged = localStorage.getItem('user')
  const isAdmin = localStorage.getItem('isAdmin')
  if(userLoged === undefined || (isAdminRouter(to.path) && isAdmin === 'false')) {
    next('/login')
  } else {
    next()
  }
 })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')




