<template>
  <div id="nav">
    <span v-if="isLoggedIn">
        <router-link class="link hover" to="/feed">Feed</router-link> |
        <router-link class="link hover" to="/profile">Mon Compte</router-link> |
        <a class="link hover" @click.prevent.stop="logout">Se déconnecter</a>

    </span>
    <span v-else>
        <router-link class="link hover" to="/signup" :disabled="isLoginPage">S'inscrire</router-link> |
        <router-link class="link hover" to="/" :disabled="!isLoginPage">Se connecter</router-link>
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navBar",
  
  props: ['isLoginPage'],
  
  computed: {
    ...mapGetters(['isLoggedIn'])
    },

  methods: {
    logout () {
      this.$store.commit('resetState');
      this.$router.push('/');
    }
  }
}

</script>

<style lang="scss" scoped>
@import '@/assets/_variables.scss';

#nav {
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  //animation
  position: relative;

}
#nav a {
  font-weight: bold;
}


//animation
span {
  position: relative;
  display: block;
  padding: 20px 0;
}
.link {
  display: inline-block;
  position: relative;
  text-decoration: none;
  padding: 10px 0; 
  color: $tertiary-color;


}

.hover { 
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 2px;
        transform: scaleX(0);
        background-color: $tertiary-color;

        transition: transform 0.3s;
    }

    &:hover {
        &:after {
            transform: scaleX(1);    
        }
    }
}


a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: $primary-color;
  text-decoration: underline;
  cursor: default;

//disable animation on hover
  &:hover {
        &:after {
            transform: scaleX(0);    
        }
    }
}
</style>
