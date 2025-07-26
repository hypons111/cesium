<template>
  <div id="" class="svgContainer small">

    <div id="topPatternContainer" class="patternContainer">
      <svg id="topPattern" class="pattern">
        <polyline class="filled" points="1,1 15,1 1,15 1,1 15,1" /> <!-- 左上三角形 -->
        <polyline class="filled" points="383,1 399,1 399,15 383,1 399,1" /> <!-- 右上三角形 -->
        <polyline class="filled" points="177,1 186,6 334,6 343,1 177,1 186,6" /> <!-- 梯形 -->
        <polyline points="1,39 1,20 20,1 170,1 185,10 335,10 350,1 377,1 399,20 399,39" /> <!-- 上框 -->
      </svg>
    </div>

    <div id="contentContainer">
      <p id="title">當前資訊</p>
      <div id="contentGroup">
        <div id="line"></div>
        <div class="row">
          <p class="key">溫度</p>
          <p class="value">25°C</p>
        </div>
        <div class="row">
          <p class="key">濕度</p>
          <p class="value">91%</p>
        </div>
        <div class="row">
          <p class="key">PM2.5</p>
          <p class="value">3</p>
        </div>
        <div class="row">
          <p class="key">PM10</p>
          <p class="value">4</p>
        </div>
        <div class="row">
          <p class="key">風速</p>
          <p class="value">3</p>
        </div>

        <div class="row">
          <p class="key">光照度</p>
          <p class="value">540</p>
        </div>
        <div class="row">
          <p class="key">大氣壓力</p>
          <p class="value">991</p>
        </div>
        <div class="row">
          <p class="key">降雨量</p>
          <p class="value">0mm</p>
        </div>
        <div class="row">
          <p class="key">紫外線</p>
          <p class="value">7.8</p>
        </div>
        <div class="row">
          <p class="key">風向</p>
          <p class="value">135</p>
        </div>
      </div>
    </div>

    <div id="bottomPatternContainer" class="patternContainer">
      <svg id="bottomPattern" class="pattern">
        <polyline class="filled" points="1,25 1,39 15,39 1,25 1,39" /> <!-- 左下三角形 -->
        <polyline class="filled" points="385,39 399,39 399,25 385,39 399,39" /> <!-- 右下三角形 -->
        <polyline points="1,1 1,20 20,39 380,39 399,20 399,1" /> <!-- 下框 -->
      </svg>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import "@/assets/css/chart.css"
import "@/assets/css/svg.css"

onMounted(() => { })

</script>

<style scoped>
#contentContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  color: white;
  padding: 1em;
  /* border: 1px solid white; */

  #title {
    font-size: 1.2rem;
    font-weight: bolder;
    margin-bottom: 0.5em;
    letter-spacing: 0;
    /* border: 1px solid red; */
  }


  #contentGroup {
    position: relative;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 5em;
    padding: 0 0.5em;
    /* border: 1px solid purple; */


    #line {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(0, -50%);
      height: 100%;
      border-left: 1px solid rgb(var(--GRAY3));
    }

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* border: 1px solid green; */

      .value {
        color: rgb(var(--CYAN));
        /* border: 1px solid gold; */
      }
    }
  }

}
</style>
