<template>
  <div id="DoughnutChart" class="svgContainer normal">

    <div id="topPatternContainer" class="patternContainer">
      <svg id="topPattern" class="pattern">
        <polyline class="filled" points="1,1 15,1 1,15 1,1 15,1" /> <!-- 左上三角形 -->
        <polyline class="filled" points="383,1 399,1 399,15 383,1 399,1" /> <!-- 右上三角形 -->
        <polyline class="filled" points="177,1 186,6 334,6 343,1 177,1 186,6" /> <!-- 梯形 -->
        <polyline points="1,39 1,20 20,1 170,1 185,10 335,10 350,1 377,1 399,20 399,39" /> <!-- 上框 -->
      </svg>
    </div>

    <div id="chart" ref="chartContainer"></div>

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
import * as echarts from 'echarts';
import "@/assets/css/chart.css"
import "@/assets/css/svg.css"

const chartContainer = ref(null);
const fakeChartData = ref({
  title: "Doughnut Chart M",
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
}
);

function setChart() {
  const chart = echarts.init(chartContainer.value);
  chart.setOption({
    title: {
      top: '5%',
      left: '2.5%',
      text: fakeChartData.value.title,
      textStyle: {
        color: 'white'
      }
    },
    tooltip: {
      trigger: 'item',
      // formatter: 'Label : {a} <br/> Y軸 : {b} <br/> 值 : {c}', // 可以放各個軸的參數 
    },
    /* 刪除 legend 代表不顯示每種顏色代表的屬性 */
    legend: {
      orient: 'vertical',
      left: '3%',
      top: 'center',
      textStyle: {
        color: 'white'
      }
    },
    series: fakeChartData.value.series,
    textStyle: {
      color: 'white'
    },

    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
  });
}

onMounted(() => {
  setChart();
})

</script>

<style scoped></style>
