<template>
  <div id="LeftPanel" class="panel">
    <BarVertical v-if="currentSection === 'panel'" :title="'Bar Vertical'" :data="barVerticalData" :size="'normal'" />
    <BarHorizontal v-if="currentSection === 'panel'" :title="'Bar Horizontal'" :data="barHorizontalData" :size="'normal'" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from "vuex"
import BarVertical from "@/components/parts/BarVertical"
import BarHorizontal from "@/components/parts/BarHorizontal"
import Line from "@/components/parts/Line"
import DoughnutChart from "@/components/parts/Doughnut.vue"

const store = useStore();
const currentSection = computed(() => store.getters.CURRENT_SECTION);

const barVerticalData = ref({
  xData: ['6/17', '6/18', '6/19', '6/20', '6/21', '6/22', '6/23'],
  yData: ['A1', 'A2', 'B1', 'B2', 'C1', 'D1', 'D2'],
  data: [
    [100, 102, 101, 134, 150, 130, 120],
    [120, 132, 101, 134, 150, 130, 110],
    [120, 122, 111, 134, 150, 130, 110],
    [150, 112, 101, 154, 150, 130, 110],
    [120, 132, 101, 134, 129, 133, 132],
    [150, 112, 101, 154, 150, 130, 110],
    [120, 132, 101, 134, 129, 133, 132]
  ]
})

const barHorizontalData = ref({
  yData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      name: 'A',
      type: 'bar',
      stack: 'total', // total 等於 data 的值合拼在同一條 bar 上
      label: {
        show: true // 是否在 bar 顯示 data 的值
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'B',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'C',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'D',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'E',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ],
})

</script>

<style scoped>
#LeftPanel {
  width: 25em;
  height: calc(100vh - 3em - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
