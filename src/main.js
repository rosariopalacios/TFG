import Vue from 'vue'
import App from './App.vue'
import routes from './router.js'
import VueRouter from 'vue-router'
import VuePapaParse from 'vue-papa-parse'

Vue.use(VueRouter)
Vue.use(VuePapaParse)


const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')




