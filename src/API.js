import axios from 'axios';

// Borrar todos los comentarios HECHO
// Borrar todos los console.log HECHO
// Borramos los ; del codigo (NO LOS DEL CSS!) HECHO
// Tabular correctamente HECHO (usar cmd + shift + P y Format Document)
// Todo el codigo a Ingles HECHO
// No harcodeamos variables
// Refactor de los metodos de CSV
// Aplicar programación funcional. Cada funcion hace 1 cosa.
// Extraemos a compomentes las distintas funcionalidades
// DESPLEGAR



const login = async (email, password) => {
 const response = await axios.post('/loginbackend', { email, password })
 return response
}

const signUp = async (email, password) => {
  const response = await axios.post('/signUp', { email, password })
  return response
}

const sendCSV = (students) => {
  axios.post('/saveUsers', students)
}

const sendForm = ({email, arrayClick}) => {
axios.post('/saveMap', { email, arrayClick })
}

const getListStudents = async () => {
  const response = await axios.get('/listStudents')
  return response
}

const sendResults = async (email, form) => {
  const response = await axios.post('/saveResultForm', {email, form})
  return response
}

export default {
  login,
  sendCSV,
  sendForm,
  signUp,
  getListStudents,
  sendResults
}