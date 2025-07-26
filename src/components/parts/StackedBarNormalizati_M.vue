<template>
  <div id="DoughnutChart" class="svgContainer large">

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
  title: "智慧燈桿耗電量",
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
      trigger: 'axis', // 'axis' / 'item'
    },
    legend: {
      bottom: '5%',
      selectedMode: true,
      textStyle: {
        color: 'white'
      }
    },
    grid: {
      left: '5%',
      right: '7.25%',
      top: '20%',
      bottom: '15%',
      containLabel: true // 屬性是否包含在 grid 內
    },
    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: fakeChartData.value.xData
    },
    yAxis: {
      type: 'value'
    },
    textStyle: {
      color: 'white'
    },
    series: fakeChartData.value.yData.map((name, sid) => {
      return {
        name,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
          show: true,
          formatter: (params) => params.value
        },
        data: fakeChartData.value.data[sid]
      };
    })
  });
}

onMounted(() => {
  setChart();
})

</script>

<style scoped></style>
