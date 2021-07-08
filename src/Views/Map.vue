<template>
  <div class="containerMap">
    <div class="customMap">
      <mapSVG class="map" @clickRegion="handleClick" />
    </div>

    <div class="optionButtons">
      <CountDown :seconds="1200" />
      <button id="instructions" @click="showModal = true">Instrucciones</button>
      <modal v-if="showModal" @close="showModal = false" />
      <button id="clear" @click="emptyMap">Limpiar mapa</button>
      <button id="form" @click="continueToForm">Enviar</button>
      <div class="colorButtons">
        <button
          v-for="(color, index) in colors"
          v-bind:style="{ 'background-color': color }"
          :key="index"
          @click="clickedColor(color)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import mapSVG from "../Views/MapSVG.vue"
import CountDown from "../Views/CountDown.vue"
import Modal from "../Views/Modal.vue"
import API from "../API.js"


const colors = [
  "#FFAF36",
  "#43F2F2",
  "#FFF308",
  "#FA0000",
  "#3697FF",
  "#E30052",
  "#AC43F2",
  "#43F266",
]

export default {
  name: "Map",
  components: {
    mapSVG,
    CountDown,
    Modal,
  },
  data() {
    return {
      selectedColor: "",
      selectedRegion: "",
      actualRegionColor: "",
      showModal: false,
      colors,
      arrayClicks: [],
      registro: {}
    }
  },
  methods: {
    //Method that send the data from the map and changes to Form view
    continueToForm() {
      const finish = { action: "Continue to form", date: new Date() }
      this.arrayClicks.push(finish)
      let email = localStorage.getItem("user")
      API.sendForm({ email: email, arrayClick: this.arrayClicks })
      this.$router.push({ name: "/form" })
    },
    //Method that handles the click on a region with a selected color
    handleClick(region, infoRegions) {
      const { id, brothers } = infoRegions
  
      let hasBrothersPainted = false
      Object.keys(this.registro).forEach(regionsPainted => {
        if(!hasBrothersPainted) {
          hasBrothersPainted = brothers.some(region => region === regionsPainted)
        }
      })
      //Check if some of the nearest regions of the one clicked have the same color that is trying to paint
      const canPainted = this.checkPainted(hasBrothersPainted, brothers)
      //If can´t be painted
      if(!canPainted) {
        this.$alert('No se pueden pintar dos regiones contiguas del mismo color')
      return
      }
      //If no one of the nearest regions has the desired color then it assign it
      this.registro[id] = this.selectedColor
      this.selectedRegion = region
      this.selectedRegion.style.fill = this.selectedColor
      const clickRegion = {
        action: "clickRegion",
        regionClicked: region.id,
        colorPainted: this.selectedColor,
        date: new Date(),
      }
      this.arrayClicks.push(clickRegion)
    },
    //Method to check if some of the nearest regions of the one clicked have the same color that is trying to paint
    checkPainted (hasBrothersPainted, brothers) {
      let canPainted = true
      if(hasBrothersPainted) {
        brothers.forEach(elemento => {
          if(this.registro[elemento]) {
           if(this.registro[elemento] === this.selectedColor){
            canPainted = false
            return
           }  
          }
        })
      }
      return canPainted
    },
    //Method to handle a click on the color
    clickedColor(color) {
      this.selectedColor = color
      const clickColor = {
        action: "colorClicked",
        colorClicked: this.selectedColor,
        date: new Date(),
      }
      this.arrayClicks.push(clickColor)
    },
    //Method to set the map back to the initial status
    emptyMap() {
      const paths = document.getElementsByClassName("region")
      Array.from(paths).forEach((path) => {
        path.style.fill = "#FFFFFF"
      })
      
    //Set all the elements in the object to white
      for(const elemento in this.registro){
        this.registro[elemento] = "#FFFFFF"
      }
      const empty = { action: "Reset map", date: new Date() }
      this.arrayClicks.push(empty)
    }
  },
}
</script>

<style scoped>
.colorButtons button {
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

.optionButtons button {
  background: #00aae4;
  padding: 0, 5rem 0;
  cursor: pointer;
  margin: 2px;
}
</style>
