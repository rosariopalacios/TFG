import Login from './Pages/Login.vue'
import StudentsList from './Pages/StudentsList.vue'
import Instructions from './Pages/Instructions.vue'
import Map from './Pages/Map.vue'
import Modal from './Pages/Modal.vue'
import Form from './Pages/Form.vue'
import Admin from './Pages/Admin.vue'


const routes = [
  { path: '/login', component: Login },
  { path: '/studentslist', component: StudentsList},
  { path: '/instructions', component: Instructions },
  { path: '/map', name: 'Map', component: Map},
  { path: '/modal', component: Modal},
  { path: '/form', name: '/form', component: Form},
  { path: '/admin', component: Admin},
  { path: '/', component: Login }
]

export default routes
