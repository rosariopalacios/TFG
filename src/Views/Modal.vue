<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Instrucciones
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              Se parte de un mapa en el que se ofrecen 8 colores, debes utilizar el número mínimo de colores posibles para colorear el mapa. Las regiones colindantes no pueden colorearse del mismo color. Dispones de un tiempo de 20 minutos para terminar con el objetivo de conseguir responder a la siguiente cuestión: <br />
              "¿Cuál es el menor número de colores con el que se puede colorear el siguiente mapa?"</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header{
  font-weight: bold;
}
.modal-body {
  text-align: justify;
  margin: 20px 0;
}

.modal-default-button {
  float: center;
  background: #00aae4;
    color: white;
    padding: 0,5rem 0;
    cursor: pointer;
    margin: 2px;
}

</style>