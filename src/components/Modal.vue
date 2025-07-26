<template>
    <div id="modal" class="modal">
        <div id="modal-header">
            <span></span>
            <p id="modalTitle">{{ modalContents.label }}</p>
            <span id="close-btn" @click="closeModal">&times;</span>
        </div>
        <div id="modal-content">
            <div class="row" v-for="(value, key) in modalContents" :key="key">
                {{ key }} : {{ value }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const modalContents = computed(() => store.getters.MODAL_STATUS.CONTENTS);

function closeModal() {
    const value = {
        IS_SHOW: false,
        DATA: {}
    }
    store.commit("SET_MODAL_STATUS", value)
}
</script>

<style lang="scss" scoped>
.modal {
    width: 50em;
    height: 35em;
    z-index: 10;
    display: flex;
    align-content: center;
    flex-direction: column;
    color: rgb(var(--WHITE));
    background-color: rgba(var(--B9), 0.9);
    background-size: 100% 100%;

    #modal-header {
        height: 3.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2em;
        border: 1px solid red;

        #close-btn {
            cursor: pointer;
        }
    }

    #modal-content {
        height: 100%;
        text-wrap: wrap;
        overflow: hidden;
    }
}
</style>