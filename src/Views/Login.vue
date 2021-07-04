<template>
  <div class="login">
    <h1>
      <img class="uniovi" src="../assets/uniovi.png" />
      <label class="title"> Iniciar sesión </label>
    </h1>
    <div class="form">
      <label class="login-label" for="#email">Email:</label>
      <input class="login-input" type="email" v-model="email" />
      <label class="login-label" for="#password">Password:</label>
      <input class="login-input" type="password" v-model="password" />
      <input
        class="login-submit"
        type="submit"
        @click="sendForm"
        value="Acceder"
      />
      <div class="message" :class="`message-${typeMessage}`" v-if="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import API from "../API.js"

export default {
  name: "Login",
  data() {
    return {
      title: "Login",
      email: "",
      password: "",
      message: "",
      typeMessage: "success",
    }
  },
  methods: {
    async sendForm() {
      if (this.email.length == 0) {
        this.typeMessage = "error"
        this.message = "Por favor introduzca un email"
      } else if (this.password == 0) {
        this.typeMessage = "error"
        this.message = "Por favor introduzca una contraseña"
      } else {
        const response = await API.login(this.email, this.password)
        this.message = response.data.message

        if (response.data.usuario) {
          localStorage.setItem("user", response.data.usuario.email)
          localStorage.setItem("isAdmin", response.data.usuario.isAdmin)

          this.typeMessage = "success"
          setTimeout(() => {
            this.message = ""
            if(localStorage.getItem('isAdmin') === 'true'){
              this.$router.push("/admin")
            } else {
            this.$router.push("/instructions")
            }
          }, 1000)

          return
        }
        this.typeMessage = "error"
        setTimeout(() => {
          this.message = ""
        }, 1000)
      }
    },
  },
}
</script>

<style scoped>
h1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(0, 86, 151, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.login-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
}
.login-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
}

.login-submit {
  background: #00aae4;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
}

.uniovi {
  width: 40 px;
  height: 40 px;
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
