<template>
  <div id="system">
    <div class="buttonWrapper" @click="pickSystem('index')">
      <img class="buttonIcon" src="@/assets/image/blue.png"></img>
      <p class="buttonText">DEMO</p>
    </div>
    <div class="buttonWrapper" @click="pickSystem('other')">
      <img class="buttonIcon" src="@/assets/image/brown.png"></img>
      <p>A系統</p>
    </div>
    <div class="buttonWrapper" @click="pickSystem('other')">
      <img class="buttonIcon" src="@/assets/image/brown.png"></img>
      <p>B系統</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function pickSystem(page) {
  router.push(`/${page}`);
}
</script>

<style lang="scss" scoped>
#system {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/image/loginBackground.png");
  background-size: cover;
  background-repeat: no-repeat;

  .buttonWrapper {
    margin: 0 2em;
    display: flex;
    flex-direction: column;
    align-items: center;

    .buttonIcon {
      width: 10rem;
      height: 10rem;
      margin-bottom: 1rem;
      background-color: rgb(var(--WHITE));
      font-size: 3rem;
      border-width: 0.5rem;
      border-style: solid;
      border-radius: 10rem;
      border-top-color: rgb(var(--CYAN));
      border-bottom-color: rgba(var(--CYAN));
      border-left-color: rgba(var(--CYAN), 0.5);
      border-right-color: rgba(var(--CYAN), 0.5);
      cursor: pointer;
    }

    p {
      font-size: 1.5em;
      font-weight: bolder;
      color: rgb(var(--WHITE));
      cursor: pointer;
    }
  }

}
</style>