<template>
    <div id="marquee">
        <div id="marqueeContainer">
        <p id="marqueeContents">{{ marqueeContents }}</p>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const marqueeContents = ref("");

onMounted(() => {
  fetchMarqueeContents();
})

function fetchMarqueeContents() {
  // 連接 api
  marqueeContents.value = "The seaweed is always greener in somebody else's lake. You dream about goin' up there, but that is a big mistake.";
}

</script>

<style lang="scss" scoped>
#marquee {
    #marqueeContainer {
      width: calc(100vw - 25em - 25em - 2em);
      height: 2em;
      border-left: thick double red;
      border-right: thick double red;
      overflow: hidden;
      animation: fresh 1s linear infinite;

      @keyframes fresh {
        0% {
          border-left: thick double rgba(#ffffff, 0);
          border-right: thick double rgba(#ffffff, 0);
        }

        50% {
          border-left: thick double red;
          border-right: thick double red;
        }

        100% {
          border-left: thick double rgba(#ffffff, 0);
          border-right: thick double rgba(#ffffff, 0);
        }
      }

      #marqueeContents {
        width: fit-content;
        height: 100%;
        font-size: 1.5em;
        color: rgb(var(--RED));
        line-height: 1.25em;
        text-wrap: nowrap;
        animation: slide 20s linear infinite;

        @keyframes slide {
          0% {
            transform: translatex(100%)
          }
  
          100% {
            transform: translatex(-100%)
          }
        }
      }
    }
}
</style>