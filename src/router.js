import Login from './Views/Login.vue'
import StudentsList from './Views/StudentsList.vue'
import Instructions from './Views/Instructions.vue'
import Map from './Views/Map.vue'
import Modal from './Views/Modal.vue'
import Form from './Views/Form.vue'
import Admin from './Views/Admin.vue'
import SignUp from './Views/SignUp.vue'


const routes = [
  { path: '/login', component: Login },
  { path: '/studentslist', component: StudentsList},
  { path: '/instructions', component: Instructions },
  { path: '/map', name: 'Map', component: Map},
  { path: '/modal', component: Modal},
  { path: '/form', name: '/form', component: Form},
  { path: '/admin', component: Admin},
  { path: '/signUp', component: SignUp },
  { path: '/', component: Login }
]

export default routes
