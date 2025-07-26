<template>
  <div id="clock">
    <!-- <div id="clockContainer">{{ clock }}</div> -->
    <div id="clockContainer">
      <span>{{ date }}</span>
      <span>{{ time }}</span>
      <span>{{ day }}</span>
    </div>
  </div>
</template>

<script setup>
class DateTime {
  constructor() {
    this.weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.Date = new Date();
    this.year = this.Date.getFullYear();
    this.month = (this.Date.getMonth() + 1).toString().padStart(2, '0');
    this.date = this.Date.getDate().toString().padStart(2, '0');
    this.hour = this.Date.getHours().toString().padStart(2, '0');
    this.minute = this.Date.getMinutes().toString().padStart(2, '0');
    this.second = this.Date.getSeconds().toString().padStart(2, '0');
    this.day = this.Date.getDay();
  }

  getDate() {
    return `${this.year}-${this.month}-${this.date}`;
  }

  getTime() {
    return `${this.hour}:${this.minute}:${this.second}`;
  }

  getDay() {
    return this.weekday[this.day];
  }

  getDatetime() {
    return `${this.year}-${this.month}-${this.date} ${this.hour}:${this.minute}:${this.second} ${this.getDay()}`;
  }
}

import { ref, onMounted, onUnmounted } from "vue"
import '@/assets/font/DSfont.css'

let intervalSwitch;
const clock = ref("");
const time = ref("");
const date = ref("");
const day = ref("");

function getRealTime() {
  intervalSwitch = setInterval(() => {
    const DT = new DateTime();
    clock.value = `${DT.getDatetime()}`;
    date.value = `${DT.getDate()}`;
    time.value = `${DT.getTime()}`;
    day.value = `${DT.getDay()}`;
  }, 1000);
}

onMounted(() => {
  getRealTime();
})
onUnmounted(() => {
  clearInterval(intervalSwitch);
})

</script>


<style lang="scss" scoped>
#clockContainer {
  width: fit-content;
  height: 1.25em;
  line-height: 1.25em;
  font-size: 1.25em;
  color: rgb(var(--GRAY2));
  font-family: 'DSDigital';
  padding: 0 0.25em;

  span:nth-child(2) {
    margin: 0 0.5em;
  }
}
</style>
