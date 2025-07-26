<template>
  <div id="ais">
    <iframe src="https://iot-gw.i-fishery.ntpc.gov.tw:8443/harbor/fuji?inSrpFrame&amp;canSrp&amp;theme=dark&amp;kiosk&amp;language=zh-TW&amp;orgId=1"></iframe>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {});
</script>

<style lang="scss" scoped>
#ais {
  height: 100%;
  overflow: hidden;
}

iframe {
  width: 100%;
  height: 100%;
}
</style>