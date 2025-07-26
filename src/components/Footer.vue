<template>
	<div id="footer">
		<ul id="sectionBtnGroup">
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'section1' }" @click="currentSection = 'section1'">
				<font-awesome-icon icon="fa-solid fa-house" />
				<p>頁面1</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'section2' }" @click="currentSection = 'section2'">
				<font-awesome-icon icon="fa-solid fa-solar-panel" />
				<p>頁面2</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'section3' }" @click="currentSection = 'section3'">
				<font-awesome-icon :icon="['fas', 'bullhorn']" />
				<p>頁面3</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'section4' }" @click="currentSection = 'section4'">
				<font-awesome-icon :icon="['fas', 'door-closed']" />
				<p>頁面4</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'section5' }" @click="currentSection = 'section5'">
				<font-awesome-icon :icon="['fas', 'location-dot']" />
				<p>頁面5</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'section6' }" @click="currentSection = 'section6'">
				<font-awesome-icon :icon="['fas', 'link']" />
				<p>頁面6</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'section7' }" @click="currentSection = 'section7'">
				<font-awesome-icon :icon="['fas', 'vr-cardboard']" />
				<p>頁面7</p>
			</li>
			<li id="" class="SectionBtn" :class="{ currentSection: currentSection === 'section8' }" @click="currentSection = 'section8'">
				<font-awesome-icon :icon="['fas', 'cubes-stacked']" />
				<p>頁面8</p>
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
