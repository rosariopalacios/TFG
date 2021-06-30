<template>
  <div class="countDown">
    <div class="card text-white bg-info mb-3" v-if="seconds">
      <div class="card-body">
        <h2>{{ countdown }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import * as moment from "moment";
export default {
  components: {},
  name: "CountDown",
  props: {
    seconds: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      countdown: null,
      expires_in: null,
      interval: null,
    };
  },
  mounted() {
    this.countdown = moment.utc(this.seconds).format("HH:mm:ss");
    this.expires_in = this.seconds;
    this._setInterval();
  },
  methods: {
    _setInterval: function() {
      this.interval = setInterval(() => {
        if (this.expires_in === 0) {
          clearInterval(this.interval);
          alert("Tiempo finalizado. Enviando a cuestionario");
          this.$router.push("/form");
        } else {
          this.expires_in -= 1;
          this.countdown = moment
            .utc(this.expires_in * 1000)
            .subtract(1, "seconds")
            .format("HH:mm:ss");
        }
      }, 1000);
    },
  },
};
</script>

<style scoped></style>
