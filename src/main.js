import Vue from 'vue'
import App from './App.vue'
// import Login from './Pages/Login.vue'
// import StudentsList from './Pages/StudentsList.vue'
// import Instructions from './Pages/Instructions.vue'
// import Map from './Pages/Map.vue'
// import Form from './Pages/Form.vue'
import VueRouter from 'vue-router'
import routes from './router.js'
import VuePapaParse from 'vue-papa-parse'

Vue.use(VueRouter)
Vue.use(VuePapaParse)

// const routes = [
//   { path: '/', component: Login },
//   { path: '/login', component: Login },
//   { path: '/studentslist', component: StudentsList},
//   { path: '/instructions', component: Instructions },
//   { path: '/map', component: Map},
//   { path: '/form', component: Form}
// ]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')




