import Login from './Pages/Login.vue'
import StudentsList from './Pages/StudentsList.vue'
import Instructions from './Pages/Instructions.vue'
import Map from './Pages/Map.vue'
import Modal from './Pages/Modal.vue'
import Form from './Pages/Form.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/studentslist', component: StudentsList},
  { path: '/instructions', component: Instructions },
  { path: '/map', component: Map},
  { path: '/modal', component: Modal},
  { path: '/form', component: Form}
]

export default routes
