import Vue from 'vue'
import App from './App.vue'
import routes from './router.js'
import VueRouter from 'vue-router'
import VuePapaParse from 'vue-papa-parse'
import VueSimpleAlert from "vue-simple-alert"


Vue.use(VueRouter)
Vue.use(VuePapaParse)
Vue.use(VueSimpleAlert)

const router = new VueRouter({
  routes
})

const adminRoutes = ['/admin', '/signup']
const isAdminRoute = path => adminRoutes.find(route => route === path)

router.beforeEach((to, from, next) => {
  const userLoged = localStorage.getItem('user')
  const isAdmin = localStorage.getItem('isAdmin')
  if(userLoged === undefined || (isAdminRoute(to.path) && isAdmin === 'false')) {
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




