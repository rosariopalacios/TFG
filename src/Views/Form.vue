<template>
  <div class="formfinish">
    <h1 class="title">Cuestionario sobre el mapa</h1>

    <form id="finalForm">
    <div class="questions">
      <div class="elementForm">
        <label class="label" for="numColors"
          >¿Cuál es el menor número de colores que has empleado para colorear el
          mapa?</label
        >
        <select v-model="numColorsSelected" required>
          <option hidden selected>Selecciona una opción</option>
          <option v-for="option in numOptions" :key="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div>
        <label class="label" for="lessNumbers"
          >¿Crees que podría colorearse con un número de colores menor al que tú
          has empleado?</label
        >
        <fieldset class="radioButtons">
          <input
            type="radio"
            name="radioNumbers"
            id="yes"
            value="Yes"
            v-model="lessNumbersOption"
            required/>
          <label for="yes">Sí</label>
          <input type="radio" name="radioNumbers" id="no" value="No" v-model="lessNumbersOption" />
          <label for="no">No</label>
        </fieldset>
        <span>¿Por qué? Justifica la respuesta.</span>
        <br />
        <textarea
          class="justifyNumbers"
          placeholder="Tu respuesta"
          v-model="why"
          required></textarea>
      </div>
      <div>
        <span
          >¿Qué estrategia has utilizado para resolver el juego? Describe con
          detalle cómo has llegado a esa solución.</span
        >
        <br />
        <textarea
          class="strategy"
          placeholder="Tu respuesta"
          v-model="strategy"
          required></textarea>
      </div>
      <div>
        <span
          >¿Crees que el juego tiene alguna relación con las matemáticas? ¿Por
          qué? Justifica tu respuesta.</span
        >
        <textarea
          class="mathsLinked"
          placeholder="Tu respuesta"
          v-model="mathsRelated"
          required></textarea>
      </div>
      <div>
        <label class="label" for="difficultyLevels"
          >Puntúa del 1 al 5 la dificultad del juego siendo:</label
        >
        <select v-model="difficulty" required>
          <option v-for="level in difficultyLevels" :key="level">
            {{ level }}
          </option>
        </select>
      </div>
      <div>
        <label class="label" for="mathsLikes"
          >Puntúa del 1 al 5 tu gusto por las matemáticas, siendo:</label
        >
        <select v-model="mathsLike" required>
          <option v-for="like in mathsLikes" :key="like">
            {{ like }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="finishButton"
        @click="sendResults"
      >"Enviar y finalizar"</button>
    </div>
  </form>
  </div>
</template>
<script>
const numOptions = ["1", "2", "3", "4", "5", "6", "7", "8"]
const difficultyLevels = [
  "1. Muy fácil",
  "2.Fácil",
  "3.Dificultad intermedia",
  "4.Difícil",
  "5.Muy difícil",
]
const mathsLikes = [
  "1.No me gustan nada",
  "2.No me gustan mucho",
  "3.Me son indiferentes",
  "4.Me gustan",
  "5.Me encantan",
]

import API from "../API.js"
export default {
  name: "Form",
  data() {
    return {
      numOptions,
      difficultyLevels,
      mathsLikes,
      numColorsSelected: 0,
      lessNumbersOption: 0,
      why: "",
      strategy: "",
      mathsRelated: "",
      difficulty: 0,
      mathsLike: 0,
      message:"",
      typeMessage:''
    }
  },
  created(){
    
  },
  methods: {
    //Method to send the answers to the form to the data base and finish the interaction with the web
    async sendResults() {
      const results = {
        numberSelected: this.numColorsSelected,
        lessNumOptions: this.lessNumbersOption,
        whyLessNumOptions: this.why,
        strategySelected: this.strategy,
        isMathsRelated: this.mathsRelated,
        difficultyLevel: this.difficulty,
        mathsLikesNumber: this.mathsLike,
      }

      //Check if the form is valid
      const inpObj = document.getElementById("finalForm");
      if (!inpObj.checkValidity()) {
        return
      }
      this.$alert('Enviado con éxito')
      const email = localStorage.getItem("user")
      const response = await API.sendResults(email, results)
      this.message = response.data.message

      if (!response.data.form) {
          this.typeMessage = "success"
          setTimeout(() => {
            this.message = ""
          }, 1000)

      }
    },
  },
}
</script>

<style scoped>
.questions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.elementForm {
  display: flex;
  justify-content: space-between;
}

.questions div {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
textarea {
  width: 80%;
}
.finishButton {
  background: #00aae4;
  border: none;
  color: white;
  padding: 1rem 0;
  cursor: pointer;
  width: 20%;
}

select {
  cursor: pointer;
  display: block;
  font-size: 1em;
  max-width: 45%;
  outline: 0;
}

.input,
select,
.textarea {
  background-color: #fff;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}
.label,
span {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
}

.title {
  text-align: center;
}

.radioButtons {
  border: none;
}

.message {
  padding: 15px;
  border: 1px solid black;
}

.message-success {
  background: green;
}

.message-error {
  background: red;
}
</style>
