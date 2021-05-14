
<template>
  <div class="containerMap">
      <div class="customMap">
        <mapSVG class="map" @clickRegion="handleClick"/>
      </div>

    <div class="optionButtons">
      <button id="instrucciones" @click="showModal = true "> Instrucciones </button>
        <modal v-if="showModal" @close="showModal = false"/> 
        <button id="limpiar" @click="emptyMap"> Limpiar mapa </button>
        <button id="formulario" @click="continueToForm"> Enviar</button>
         <div class="colorButtons">
        <button v-for="(color, index) in colors" v-bind:style="{'background-color': color}" :key="index" @click="clickedColor(color)">
        </button>
      </div>
    </div>
  </div>
</template>


<script>

import mapSVG from '../Pages/MapSVG.vue';
//import CountDown from '../Pages/CountDown.vue';
import Modal from '../Pages/Modal.vue';

const colors = ['#FFAF36','#43F2F2', '#FFF308', '#FA0000', '#3697FF','#43F2F2', '#AC43F2', '#43F266']

export default {
  components: { 
    mapSVG, 
    //CountDown, 
    Modal },
  name: 'Map',
  data () {
    return {
      selectedColor : '',
      selectedRegion: '',
      actualRegionColor: '',
      showModal: false,
      colors,
      arrayClicks:[]
    }
  },
  mounted(){
    
  },
  methods: {
   continueToForm (){
     console.log(this.arrayClicks)
    // this.$router.push('/form')
   },
   handleClick(region){
     this.selectedRegion = region
      this.selectedRegion.style.fill = this.selectedColor
      var clickRegion = { regionClicked: region.id, colorPainted: this.selectedColor, date: new Date() }
      this.arrayClicks.push(clickRegion)
   },
   clickedColor(color){
     this.selectedColor = color
     var clickColor = { colorClicked: this.selectedColor, date: new Date() }
    this.arrayClicks.push(clickColor)
   },
   emptyMap(){
    const paths = document.getElementsByClassName('region')
     Array.from(paths).forEach(path => {
       path.style.fill = '#FFFFFF'
    })
  }
}
}
</script>

<style scoped>
  .colorButtons button{
  margin: 10px 5px 10px 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  }

  .containerMap {
    display: flex;
    align-items: flex-start;
  }
</style>
