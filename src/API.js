import axios from 'axios';

const login = async (email, password) => {
  console.log('Llamo al login')
  await axios.post('/loginbackend', { email, password })
}

const sendCSV = (students) => {
  axios.post('/saveUsers', students)
}

const sendForm = () => {
// Que llegue aqui el array con las respuestas del form y le historico del mapa
}

export default {
  login,
  sendCSV,
  sendForm
}