<template>
  <div class="form">
    <h1 class="title">Cuestionario Final</h1>
    <div class= "question1">
     <label for="colors"> ¿Cuál es el menor número de colores que has empleado para colorear el mapa? </label>
        <select class="form-control" id="usedColors">
            <option v-for="(option, index) in numberOfColors" :key="index"> {{option}} </option>
        </select>
    </div>
    <div class="question2">
        <label>¿Crees que podría colorearse con un número de colores menor al que tú has empleado? ¿Por qué? Justifica la respuesta.</label>
        <input id="yes" type="radio" class="custom-control-input" value="si" name="question" ngModel>
        <label class="custom-control-label" for="yes">Sí</label>
        <input id="no" type="radio" class="custom-control-input" value="no" name="question" ngModel>
        <label class="custom-control-label" for="no">No</label>
        <textarea class="form-control" id="question" rows="3"></textarea>            
    </div>  
    <div class="question3">
      <label>¿Qué estrategia has utilizado para resolver el juego? Describe con detalle cómo has llegado a esa solución.</label>
      <textarea class="form-control" id="strategy" rows="3"></textarea>           
    </div>
    <div class="question4">
      <label>¿Crees que el juego tiene alguna relación con las matemáticas? ¿Por qué? Justifica tu respuesta.</label>
      <textarea class="form-control" id="maths" rows="3"></textarea>     
    </div>
    <div class="question5">
        <label for="choose">Puntúa del 1 al 5 la dificultad del juego siendo:</label>
        <select class="form-control" id="chooseDifficulty">
            <option v-for="(option, index) in difficulty" :key="index"> {{option}} </option>
        </select>
    </div>
    <div class="question6">
      <label for="choose">Puntúa del 1 al 5 tu gusto por las matemáticas, siendo:</label>
        <select class="form-control" id="chooseMaths">
         <option v-for="(option, index) in optionsLikeMaths" :key="index"> {{option}} </option>
        </select>
    </div>
    <button class="finishButton"> Finalizar </button>
  </div>
</template>
<script>

const numberOfColors = ['1', '2', '3', '4', '5', '6', '7', '8']
const optionsLikeMaths = ['1: No me gustan nada', '2: No me gustan mucho', '3: Me son indiferentes', '4: Me gustan', '5: Me encantan']
const difficulty = ['1: Muy fácil', '2: Fácil', '3: Dificultad intermedia', '4: Difícil', '5: Muy difícil']

export default {
  name: 'Form',
  data () {
    return {
      numberOfColors,
      optionsLikeMaths,
      difficulty
    }
  },
  created () {
    this.showArray()
  },
  methods: {
    showArray(){
      console.log(this.$route.params.arrayClicks)
    }
  }
}
</script>

<style scoped>
.form div{
  /* display: inline-flexbox; */
  display: inline-flexbox;
  margin-top: 20px;
  width: 100%;
}
textarea{
  width: 80%;
}
.finishButton{
  background: #00aae4;
  color: white;
  padding: 0,5rem 0;
  cursor: pointer;
  width: fit-content;
  margin: 20px;
}

</style>
