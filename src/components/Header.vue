<template>
  <div id="header">
    
    <div id="headerRow_1" class="headerRow">
      <div id="headerMain">
        <p>{{ projectName }}</p>
      </div>
    </div>

    <div id="headerRow_2" class="headerRow">
      <Clock id="clock" />
      <Marquee id="marquee" />
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex"
import Clock from "@/components/parts/Clock.vue";
import Marquee from "@/components/parts/Marquee.vue";

const store = useStore();
const projectName = computed(() => store.getters.HEADER_TITLE);
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 6.5em;
  display: flex;
  flex-direction: column;

  .headerRow {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  #headerRow_1 {
    height: 3em;

    #headerMain {
      width: 60%;
      height: 100%;
      position: relative;
      background-image: url("../assets/image/header.png");
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;

      p {
        display: inline-block;
        color: rgb(var(--WHITE));
        font-size: 1.75em;
        font-weight: 900;
        font-weight: bolder;
        line-height: 1.5em;
      }
    }
  }

  #headerRow_2 {
    height: 3.5em;
    flex-direction: column;

    #clock {
      background-color: rgb(var(--BLACK));
    }

    #marqueeContainer {}
  }
}
</style>

<style lang="scss">
.el-popper {
  * {
    color: rgb(var(--RED));
    background-color: rgb(var(--BLUE_4));
  }
}
</style>