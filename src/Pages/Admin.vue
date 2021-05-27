<template>
    <div>
        <h1>Admin</h1>
        <input type="file" class="csvInput" accept=".csv" ref="listStudents" @change="getFile"/>
    </div>
</template>

<script>


export default {
  name: 'Admin',
  
  methods: {
   getFile(){
     const files = this.$refs.listStudents.files[0]
     console.log(files)
    this.$papa.parse(files, {
      delimiter: ';',
      encoding: "UTF-8",
      complete: (results) => {
                results.data.forEach(cadaUno => {
                  if(cadaUno[0].length !== 0) console.log(cadaUno)
                  console.log(cadaUno[3])
          })
    }})
  }
  }
}
</script>

<style scoped>

</style>