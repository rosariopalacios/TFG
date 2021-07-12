<template>
  <div class="admin">
    <h1>Gestión de Alumnos</h1>
    <div class="header">
      <button class="closeSesion" @click="logOut"> Cerrar sesión </button>
    </div>
    <div class="fileInput">
      <label class="fileLabel"> Subir archivo nuevos alumnos </label>
      <input
        type="file"
        class="csvInput"
        accept=".csv"
        ref="listStudents"
        @change="getFile"
      />
    </div>
    <div class="exportButtons">
      <button class="buttonMap" @click="exportToCSV">
        Exportar datos mapa
      </button>
      <button class="buttonSignUp" @click="goToSignUp">
        Registrar nuevo profesor
      </button>
      <button class="buttonSignUp" @click="mapForms">
        Exportar cuestionarios
      </button>
    </div>
    <table>
      <thead>
        <th>Email</th>
        <th>Nombre</th>
        <th>Clase expositiva</th>
        <th>Practicas de Aula</th>
        <th>Practicas de Laboratorio</th>
      </thead>
      <tr v-for="student in listBehaviour" :key="student.email">
        <td>{{ student.email }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.expoClass }}</td>
        <td>{{ student.class }}</td>
        <td>{{ student.labClass }}</td>
      </tr>
    </table>

  </div>
</template>
<script>

import API from "../API.js"

const answers = {
  numberSelected:
    "¿Cuál es el menor número de colores que has empleado para colorear el mapa?",
  lessNumOptions:
    "¿Crees que podría colorearse con un número de colores menor al que tú has empleado?",
  whyLessNumOptions: "¿Por qué? Justifica la respuesta.",
  strategySelected: "¿Qué estrategia has utilizado para resolver el juego?",
  isMathsRelated:
    "¿Crees que el juego tiene alguna relación con las matemáticas?",
  difficultyLevel: "Puntúa del 1 al 5 la dificultad del juego.",
  mathsLikesNumber: "Puntúa del 1 al 5 tu gusto por las matemáticas.",
}

const buildSentencesActions = {
  colorClicked: (action) =>
    `Color seleccionado: ${action.colorClicked} fecha: ${action.date} \n\r, `,
  clickRegion: (action) =>
    `Comunidad pintada: ${action.regionClicked} fecha: ${action.date} color: ${action.colorPainted} \n\r, `,
  "Continue to form": (action) =>
    `Continuar al formulario fecha: ${action.date} \n\r, `,
  "Reset map": (action) => `Resetear mapa fecha: ${action.date} \n\r, `,
}

const titleNoAllowed = "LISTADO DE ALUMNOS MATRICULADOS"

export default {
  name: "Admin",
  data() {
    return {
      listBehaviour: [],
      titleNoAllowed,
      listForms: [],
    };
  },
  //When the view is created it gets the students of the database to show them
  async created() {
    const response = await API.getListStudents()
    response.data.students = response.data.students.filter(
      (student) => !student.isAdmin
    )

    this.listBehaviour = this.buildStudents(response.data.students)
  },

  methods: {
    //Method for mapping the students
    buildStudents(listStudents) {
      return listStudents.map((student) => {
        return {
          email: student.email,
          name: student.nombre,
          expoClass: student.clasesExpositivas,
          class: student.practicasDeAula,
          labClass: student.practicasDeLaboratorio,
          arrayClicks: student.arrayClick,
        }
      })
    },
    //Method to upload de CSV
    getFile() {
      const files = this.$refs.listStudents.files[0]
      this.$papa.parse(files, {
        delimiter: ";",
        encoding: "UTF-8",
        complete: (results) => this.parseCSV(results.data),
      })
    },
    isValidRow(row) {
      return !row[0] || row[1] === "DNI" || row[0] === titleNoAllowed
    },
    parseCSV(CSV) {
      const students = []
      CSV.forEach((row) => {
        if (this.isValidRow(row)) return
        const student = this.buildStudent(row)
        students.push(student)
      })
      API.sendCSV(students)
    },
    //Method to let the user download a CSV with the answers to the form of the existent students
    async mapForms() {
      const response = await API.getListStudents()
      response.data.students = response.data.students.filter(
        (student) => !student.isAdmin
      )
      this.listForms = response.data.students.map((student) => {
        return {
          email: student.email,
          form: student.form,
        }
      })

      const studentsFormated = this.listForms.map((student) => {
        const studentFormated = {
          email: student.email,
        }
        for (const question in student.form) {
          studentFormated[answers[question]] = student.form[question]
        }
        return studentFormated
      })

      const csvForms = this.$papa.unparse(studentsFormated)
      this.$papa.download(csvForms, "CSVForms")
    },
    //Method to change to SignUp view
    goToSignUp() {
      this.$router.push("/signUp")
    },
    //Method to export users and their information to a CSV and allow to download
    async exportToCSV() {
      let copyListBehaviour = this.listBehaviour
      const arrayCSV = copyListBehaviour.map((student) => {
        const studentParsed = { ...student }
        studentParsed.actions = ""

        student.arrayClicks.forEach((action) => {
          studentParsed.actions += buildSentencesActions[action.action](action)
        })

        delete studentParsed.arrayClicks
        return studentParsed
      })

      var csvToDowloand = this.$papa.unparse(arrayCSV)
      this.$papa.download(csvToDowloand, "CSV")
    },

    //Method for Login out
    logOut(){
      localStorage.removeItem('user')
      localStorage.removeItem('isAdmin')
      this.$router.push("/login")
    },
    buildStudent(row) {
      return {
        numero: row[0],
        dni: row[1],
        nombre: row[2],
        email: row[3],
        convocatorias: row[4],
        matriculas: row[5],
        evalucionDiferenciada: row[6],
        erasmus: row[7],
        clasesExpositivas: row[8],
        practicasDeAula: row[9],
        practicasDeLaboratorio: row[10],
        tutoriasGrupales: row[11],
      }
    },
  },
}
</script>

<style scoped>
h1 {
  display: flex;
  flex-direction: column;
}

.color-painted {
  width: 15px;
  height: 15px;
}

.table {
  margin: 0 auto;
  border-collapse: collapse;
  border: 2px solid #090a0a;
  border-radius: 3px;
  background-color: #fff;
}
th {
  background-color: #00aae4;
  cursor: pointer;
}
td {
  background-color: #f9f9f9;
}
th,
td {
  min-width: 120px;
  padding: 10px 20px;
}
.fileInput {
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.fileLabel,
csvInput {
  width: 30%;
  padding: 0, 5rem 0;
  margin: 2px;
}
.exportButtons {
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.exportButtons button {
  background: #00aae4;
  padding: 0, 5rem 0;
  margin: 2px;
  width: 20%;
  cursor: pointer;
}
.closeSesion {
  background: #00aae4;
  border: none;
  color: white;
  padding: 1rem 0;
  cursor: pointer;
  width: 10%;
}
.header {
  width: 60%;
  margin-left: 80%;
}

</style>
