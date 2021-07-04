import axios from 'axios'

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

//Mostrar mensajes
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