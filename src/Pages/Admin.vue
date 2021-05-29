<template>
    <div>
        <h1>Admin</h1>
        <input type="file" class="csvInput" accept=".csv" ref="listStudents" @change="getFile"/>
    </div>
</template>

<script>

import API from '../API.js';

export default {
  name: 'Admin',
  
  methods: {
   getFile(){
     const files = this.$refs.listStudents.files[0]
    this.$papa.parse(files, {
      delimiter: ';',
      encoding: "UTF-8",
      complete: (results) => this.parseCSV(results.data)
      })
  },
  parseCSV(csv) {
    const students = []
    csv.forEach(row => {
      // Cada array tiene 12 posiciones
      if(!row[0]||row[1] === 'DNI'||row[0] === 'LISTADO DE ALUMNOS MATRICULADOS') return

      let student = {
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
        tutoriasGrupales: row[11]
      }
      students.push(student)
    })
    console.log(students,'LISTADO DE ALUMNOS')
    API.sendCSV(students)
  }
  }
}
</script>

<style scoped>

</style>