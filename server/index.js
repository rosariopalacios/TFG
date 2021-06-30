import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

// var Db = require('mongodb').Db

let Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Student = new Schema({
  id: ObjectId,
  numero: String,
  dni: String,
  nombre: String,
  email: String,
  convocatorias: String,
  matriculas: String,
  evalucionDiferenciada: String,
  erasmus: String,
  clasesExpositivas: String,
  practicasDeAula: String,
  practicasDeLaboratorio: String,
  tutoriasGrupales: String,
  password: String
});

const connectDatabase = async () => {
    const connect = await mongoose.connect('mongodb+srv://admin:admin@cluster0.34rmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });

 }
connectDatabase();

const app = express();


// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas

app.post('/loginbackend', (req, res) => {
  const { email, password } = req.body

  // Comprobar si email esta repetido, mandar error
  // Comprobar si login es correcto, mandar error
  console.log('EL LOGIN', email, password)
})


app.post('/signup', (req, res) => {
  const { email, password } = req.body

  // Aqui comprobaremos el usuario maestro que sera el unico que puede
  console.log('EL LOGIN', email, password)
})

app.post('/saveresults', (req, res) => {
  const { email, results } = req.body
  // Comprobar que existe usuario y guardar resultados.
  // Lanzar error si ya ha completado el mapa
})

app.post('/saveUsers', (req, res) => {
  console.log('Endpoint saveUsers')
    const MyModel = mongoose.model('Student', Student);
    req.body.forEach((user) => {
      user.password = user.dni
      user.isAdmin = false
      const studentModel = new MyModel( user );
      studentModel.save((err) => { console.log(err, 'Error al registrar alumno')});
    }) 
});

//Login

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port'+ app.get('puerto'));
});