<template>
  <div id="RightPanel" class="panel">
    <Information_S v-if="currentSection === 'panel'"/>
    <TemperatureLineChart_S v-if="currentSection === 'panel'"/>
    <Tag v-if="currentSection === 'tag'"/>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"
import Information_S from "@/components/parts/Information_S.vue"
import TemperatureLineChart_S from "@/components/parts/TemperatureLineChart_S.vue"
import Tag from "@/components/parts/Tag.vue"

const store = useStore();
const currentSection = computed(() => store.getters.CURRENT_SECTION);
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

