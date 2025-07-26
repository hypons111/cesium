<template>
  <div id="container">
    <router-view/>
  </div>
</template>

<script setup></script>

<style lang="scss">

* {
  padding: 0;
  margin: 0;
}
body {
  width: 100vw;
  height: 100vh;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    
    #container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
