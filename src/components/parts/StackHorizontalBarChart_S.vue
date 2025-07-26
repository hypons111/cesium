<template>
  <div id="stackHorizontalBarChart" class="svgContainer small">

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
  title: "Stack Horizontal Bar Chart S",
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
});

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
      formatter: 'Label : {a} <br/> Y軸 : {b} <br/> 值 : {c}', // 可以放各個軸的參數 
      axisPointer: {
        type: 'shadow' // 'shadow' / 'line'
      }
    },
    /* 刪除 legend 代表不顯示每種顏色代表的屬性 */
    legend: {
      bottom: '5%',
      textStyle: {
        color: 'white'
      }
    },
    grid: {
      left: '5%',
      right: '7.25%',
      top: '17.5%',
      bottom: '17.5%',
      containLabel: true // 屬性是否包含在 grid 內
    },
    toolbox: {
      feature: {
        // saveAsImage: {}
      }
    },
    xAxis: {
      type: 'value'
    },

    yAxis: {
      type: 'category',
      data: fakeChartData.value.yData
    },

    series: fakeChartData.value.series,

    textStyle: {
      color: 'white'
    }
  });
}

onMounted(() => {
  setChart();
})

</script>

<style scoped>
#stackHorizontalBarChart {}
</style>
