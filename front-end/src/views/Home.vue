<template>
  <div class="home">
    <NavBar :is-login-page="true"/>
    <LoginForm/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import LoginForm from '@/components/LoginForm.vue'



export default {
  name: 'Home',

  components: {
    LoginForm,
    NavBar,
    Footer
  },

}
</script>
