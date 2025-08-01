<template>
	<div id="footer">
		<ul id="sectionBtnGroup">
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'cesium' }" @click="currentSection = 'cesium'">
				<font-awesome-icon icon="fa-solid fa-house" />
				<p>Cesium</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'panel' }" @click="currentSection = 'panel'">
				<font-awesome-icon icon="fa-solid fa-house" />
				<p>Panel</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'tag' }" @click="currentSection = 'tag'">
				<font-awesome-icon icon="fa-solid fa-solar-panel" />
				<p>Tag</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'information' }" @click="currentSection = 'information'">
				<font-awesome-icon icon="fa-solid fa-solar-panel" />
				<p>Information</p>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";
const store = useStore();
const currentSection = computed({
	get() { return store.getters.CURRENT_SECTION; }, // 'SET_CURRENT_VIEW' 被更新後會被觸發 get 更新 currentSection
	set(value) { store.commit("SET_CURRENT_SECTION", value); } // 改變 <select> 時，set 會被觸發更新 'SET_CURRENT_VIEW'
});
</script>

<style lang="scss" scoped>
#footer {
	width: 100%;
	height: 3em;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	color: rgb(var(--WHITE));
	font-weight: bold;

	#sectionBtnGroup {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-evenly;
		align-items: stretch;
		list-style: none;

		.SectionBtn {
			flex-grow: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgb(var(--GRAY2));
			cursor: pointer;

			// 有底圖
			// background-image: url("../assets/image/page_BTN_OFF.png");
			// background-size: 10em auto;
			// background-repeat: no-repeat;
			// background-position: bottom;

			// 沒有底圖
			background-color: rgb(var(--B9));

			p {
				margin: 3px 0 0 0.5em;
			}
		}

		.currentSection {
			color: rgb(var(--WHITE));
			background-color: rgb(var(--B6));
			// background-image: url("../assets/image/page_BTN_ON.png");
		}

	}
}
</style>
