<template>
  <div class="register">
      <img src="@/assets/icon-above-font.png" alt="logo-groupomania" class="logo-home-page">
      <div>
          <form @submit.prevent = signup()>
            <div class="forms-fields">
              <label for="signup-email">Email :</label>
              <input type="email" name="email" id="signup-email" required>
            </div>
            <div class="forms-fields">
              <label for="signup-firstname">Prénom :</label>
              <input type="text" name="firstname" id="signup-firstname" required>
            </div>
            <div class="forms-fields">
              <label for="signup-lastname">Nom :</label>
              <input type="text" name="lastname" id="signup-lastname" required>
            </div>
            <div class="forms-fields">
              <label for="signup-password">Mot de passe :</label>
              <input type="password" name="password" id="signup-password" required>
            </div>
            <div class="error-message">{{message}}</div>
            <button type="submit" class="button button--connect">S'inscrire</button>
          </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from "vuex";


export default {
  name: 'SignupForm',
  
  
  data() {
    return {
        message: "",
    };
  },

  methods: {
    ...mapMutations([
      'setUserId',
      'setToken',
      'setFullName',
      'setAdmin'

    ]),
    signup () {
      const email = document.getElementById('signup-email').value;
      const firstName = document.getElementById('signup-firstname').value;
      const lastName = document.getElementById('signup-lastname').value;
      const password = document.getElementById('signup-password').value;

      axios.post(`http://localhost:3000/api/auth/signup`, 
      {
        email,
        firstName,
        lastName,
        password
      }, 
      {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => {
        if(res.status === 201) {
          console.log(res.data);
          this.setUserId(res.data.userId);
          this.setAdmin(res.data.admin)
          this.setToken(res.data.token);
          const fullName = res.data.firstName + ' ' + res.data.lastName;
          this.setFullName(fullName)
          this.$router.push('/feed');
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
            this.message = "Email déjà utilisé.";
        } 
      });

    },

  }, 
  mounted() {
    const tokenUser = this.$store.state.token
    if (tokenUser != null) {
      this.$router.push('/feed')
    }
  }
  
}
</script>
