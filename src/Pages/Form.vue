<template>
  <div class="form">
    <h1 class="title">Cuestionario Final</h1>
    <div class= "pregunta1">
     <label for="colores"> ¿Cuál es el menor número de colores que has empleado para colorear el mapa? </label>
        <select class="form-control" id="coloresUtilizados">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
        </select>
    </div>
    <div class="pregunta2">
        <label>¿Crees que podría colorearse con un número de colores menor al que tú has empleado? ¿Por qué? Justifica la respuesta.</label>
        <input id="si" type="radio" class="custom-control-input" value="si" name="pregunta" ngModel>
        <label class="custom-control-label" for="si">Sí</label>
        <input id="no" type="radio" class="custom-control-input" value="no" name="pregunta" ngModel>
        <label class="custom-control-label" for="no">No</label>
        <textarea class="form-control" id="pregunta" rows="3"></textarea>            
    </div>  
    <div class="pregunta3">
      <label>¿Qué estrategia has utilizado para resolver el juego? Describe con detalle cómo has llegado a esa solución.</label>
      <textarea class="form-control" id="estrategia" rows="3"></textarea>           
    </div>
    <div class="pregunta4">
      <label>¿Crees que el juego tiene alguna relación con las matemáticas? ¿Por qué? Justifica tu respuesta.</label>
      <textarea class="form-control" id="matematicas" rows="3"></textarea>     
    </div>
    <div class="pretgunta5">
        <label for="puntua">Puntúa del 1 al 5 la dificultad del juego siendo:</label>
        <select class="form-control" id="puntuaDificultad">
            <option>1: Muy fácil</option>
            <option>2: Fácil</option>
            <option>3: Dificultad intermedia</option>
            <option>4: Difícil</option>
            <option>5: Muy difícil</option>
        </select>
    </div>
    <div class="pregunta6">
      <label for="puntua">Puntúa del 1 al 5 tu gusto por las matemáticas, siendo:</label>
        <select class="form-control" id="puntuaMatematicas">
            <option>1: No me gustan nada</option>
            <option>2: No me gustan mucho</option>
            <option>3: Me son indiferentes</option>
            <option>4: Me gustan</option>
            <option>5: Me encantan</option>
        </select>
    </div>
    <button class="finishButton"> Finalizar </button>
  </div>
</template>

<script>
export default {
  name: 'Form',
  
  methods: {
   
  }
}
</script>

<style scoped>
.form div{
  display: inline-flexbox;
  margin-top: 20px;
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
