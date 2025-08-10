<template>
  <div id="RightPanel" class="panel">
    <!-- <Information v-if="currentSection === 'panel'"/> -->
    <Line v-if="currentSection === 'panel'" :title="'Line'" :data="lineData" :size="'large'" />
    <Doughnut v-if="currentSection === 'panel'" :title="'Doughnut'" :data="doughnutData" :size="'small'" />
    <Tag v-if="currentSection === 'tag'"/>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import Information from "@/components/parts/Information.vue"
import Line from "@/components/parts/Line"
import Doughnut from "@/components/parts/Doughnut.vue"
import Tag from "@/components/parts/Tag.vue"

const store = useStore();
const currentSection = computed(() => store.getters.CURRENT_SECTION);

const lineData = ref({
  xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      name: 'A',
      type: 'line',
      // stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'B',
      type: 'line',
      // stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'C',
      type: 'line',
      // stack: 'Total',
      data: [250, 332, 401, 354, 90, 730, 210]
    },
    {
      name: 'D',
      type: 'line',
      // stack: 'Total',
      data: [32, 33, 30, 33, 39, 33, 32]
    },
    {
      name: 'E',
      type: 'line',
      // stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
})

const doughnutData = ref({
  xData: ['A', 'B', 'C', 'D', 'E'],
  series: [
    {
      type: 'pie',
      center: ['57.5%', '52.5%'],
      radius: ['20%', '75%'],
      data: [
        {
          name: 'A',
          value: 120,
        },
        {
          name: 'B',
          value: 220
        },
        {
          name: 'C',
          value: 150
        },
        {
          name: 'D',
          value: 320
        },
        {
          name: 'E',
          value: 820
        }
      ],
      /* pie 旁邊的文字 */
      label: {
        formatter: '{b} : {c}',
        fontSize: 12,
        color: 'white'
      },
      /* pie 旁邊的線 */
      labelLine: {
        length: 5,
        length2: 5,
      },
    }
  ]
});
</script>

<style scoped>
#RightPanel {
  width: 25em;
  height: calc(100vh - 48px - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

