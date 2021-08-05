<template>
  <div class="signup">
    <NavBar :is-login-page="false"/>
    <SignupForm/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
//import LoginForm from '@/components/LoginForm.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import SignupForm from '@/components/SignupForm.vue'



export default {
  name: 'Signup',
  components: {
    SignupForm,
    NavBar,
    Footer
  },

}
</script>
