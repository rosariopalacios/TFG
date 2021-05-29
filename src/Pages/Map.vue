
<template>
  <div class="containerMap">
      <div class="customMap">
        <mapSVG class="map" @clickRegion="handleClick"/>
      </div>

    <div class="optionButtons">
        <CountDown :seconds="1200"/>
        <button id="instructions" @click="showModal = true "> Instrucciones </button>
        <modal v-if="showModal" @close="showModal = false"/> 
        <button id="clear" @click="emptyMap"> Limpiar mapa </button>
        <button id="form" @click="continueToForm"> Enviar</button>
         <div class="colorButtons">
        <button v-for="(color, index) in colors" v-bind:style="{'background-color': color}" :key="index" @click="clickedColor(color)">
        </button>
      </div>
    </div>
  </div>
</template>


<script>

import mapSVG from '../Pages/MapSVG.vue';
import CountDown from '../Pages/CountDown.vue';
import Modal from '../Pages/Modal.vue';

const colors = ['#FFAF36','#43F2F2', '#FFF308', '#FA0000', '#3697FF','#43F2F2', '#AC43F2', '#43F266']

export default {
  name: 'Map',
  components: { 
    mapSVG, 
    CountDown, 
    Modal 
  },
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
  created () {
    console.log('Created Map')
  },
  methods: {
   continueToForm (){
     // Buscar como al hacer un router push poder mandar info.
    this.$router.push({name: '/form', params: {arrayClicks: this.arrayClicks}})
   },
   handleClick(region){
     this.selectedRegion = region
      this.selectedRegion.style.fill = this.selectedColor
      const clickRegion = { regionClicked: region.id, colorPainted: this.selectedColor, date: new Date() }
      this.arrayClicks.push(clickRegion)
   },
   clickedColor(color){
     this.selectedColor = color
     const clickColor = { colorClicked: this.selectedColor, date: new Date() }
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

  .optionButtons button{
    background: #00aae4;
    padding: 0,5rem 0;
    cursor: pointer;
    margin: 2px;
  }
</style>
