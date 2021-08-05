<template>
  <div id="app">
      <div id="content-wrap">
        <router-view/>
      </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/_variables.scss';

@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Roboto:ital@1&display=swap');

#content-wrap {
  padding-bottom: 2.5rem;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-height: 80vh;

  h1, h2 {
    font-family: 'Abril Fatface', Helvetica, Arial, sans-serif;
  }
}



</style>
