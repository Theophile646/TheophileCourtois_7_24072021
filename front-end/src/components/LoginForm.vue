<template>
  <div class="login-form">
    <img src="@/assets/icon-above-font.png" alt="logo-groupomania" class="logo-home-page">
    <div>
      <form @submit.prevent="login">
        <div class="forms-fields">
          <label for="email">Email :</label>
          <input type="email" name="email" id="login-email" required/>
        </div>
        <div class="forms-fields">
          <label for="password">Mot de passe :</label>
          <input type="password" name="password" id="login-password" required/>
        </div>
        <div class="error-message">{{message}}</div>
        <button type="submit" class="button button--connect">Se connecter</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/_variables.scss';

.forms-fields{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    padding-bottom: 10px;
    color: $primary-color;
    font-weight: bold;
  }

  input {
    width: 50%;
    margin-bottom: 10px;
    border: 2px solid $secondary-color;
    border-radius: 10px;
    
    &:focus, :active{
      background-color: $fifth-color;
      outline: none;
    }
  }

}
</style>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "LoginForm",
  data () {
    return {
      message: ""
    }
  },
  methods: {
    ...mapMutations([
      'setUserId',
      'setToken',
      'setFullName',
      'setAdmin'
    ]),
    login() {
      const email = document.getElementById('login-email').value;
      const password= document.getElementById('login-password').value;

      axios.post('http://localhost:3000/api/auth/login',
      {
        email,
        password
      },
      {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => {
        if(res.status === 200) {
          this.setUserId(res.data.userId);
          this.setAdmin(res.data.admin)
          this.setToken(res.data.token);
          const fullName = res.data.firstName + ' ' + res.data.lastName;
          this.setFullName(fullName)
          this.$router.push('/feed');

        }
      })
      .catch((error) => {
        //console.log(error.response);
        if (error.response.status === 401) {
            this.message = "Mot de passe incorrect.";
        } 
      }) 
    }
  }
  
}
</script>
