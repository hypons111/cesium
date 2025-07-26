<template>
  <div id="LeftPanel" class="panel">
    <DoughnutChart_S />
    <StackedBarNormalizati_M />
    <!-- <DoughnutChart_S /> -->
  </div>
</template>

<script setup>
import DoughnutChart_S from "@/components/parts/DoughnutChart_S.vue"
import StackedBarNormalizati_M from "@/components/parts/StackedBarNormalizati_M.vue"

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
