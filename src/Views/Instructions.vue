<template>
  <div class="instructions">
    <h1 class="title">Instrucciones</h1>
    <div class="instructions-text">
      <p>
        Se parte de un mapa en el que se les ofrecen 8 colores, debes utilizar
        el número mínimo de colores posibles para colorear el mapa. Las regiones
        colindantes no pueden colorearse del mismo color. Dispones de un tiempo
        de 20 minutos para terminar con el objetivo de conseguir responder a la
        siguiente cuestión: <br />
        "¿Cuál es el menor número de colores con el que se puede colorear el
        siguiente mapa?"
      </p>
      <input
        class="continue"
        type="submit"
        @click="passToMap"
        value="Continuar"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Instructions",

  methods: {
    passToMap() {
      this.$router.push("/map")
    },
  },
}
</script>

<style scoped>
.instructions {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7rem;
}
.title {
  text-align: center;
}
.instructions-text {
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(0, 86, 151, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
p {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  text-align: justify;
}
.continue {
  background: #00aae4;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
}
</style>
