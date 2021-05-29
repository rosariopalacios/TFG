<template>
  <div class="login">
    <h1 class="tilte">Login</h1>
    <div class="form">
      <label class="login-label" for="#email">Email:</label>
      <input class="login-input" type="email" v-model="email" />
      <label class="login-label" for="#password">Password:</label>
      <input class="login-input" type="password" v-model="password" />
      <input class="login-submit" type="submit" @click="sendForm" value="Acceder"/> 
    </div>  
    </div>
</template>

<script>
import API from '../API.js';

export default {
  name: 'Login',
  data () {
    return {
      title: 'Login',
      email: '',
      password: ''
    }
  },
  methods: {
    async sendForm () {
      API.login(this.email, this.password)
      // console.log('LOL', this.email, this.password)
      // if(response) 
      this.$router.push('/instructions')
    }
  }
}
</script>

<style scoped>
.login {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
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
</style>
