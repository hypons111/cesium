<template>
  <div id="report">
    <div id="reportComponent">
      <aside>
        <nav>
          <a :class="{ currentReport: currentReport === 'e' }" @click="switchReport('e')">船流事件</a>
          <a :class="{ currentReport: currentReport === 'f' }" @click="switchReport('f')">電子圍籬事件</a>
        </nav>
      </aside>
      <main>

        <el-table id="report_e" class="reportTable" :data="tableData.data" v-if="currentReport === 'e'">
          <el-table-column v-for="item in tableData.header" :key="item.propKey" :prop="item.propKey" :label="item.label"
            :formatter="item.formatter" />
        </el-table>

        <el-table id="report_f" class="reportTable" :data="tableData.data" v-if="currentReport === 'f'">
          <el-table-column v-for="item in tableData.header" :key="item.propKey" :prop="item.propKey" :label="item.label"
            :formatter="item.formatter" />
        </el-table>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios"

const currentReport = ref('')
const tableData = ref({});

function switchReport(option) {
  axios
    .get(`./json/fake_${option}.json`)
    .then(response => {
      tableData.value = response.data;
      currentReport.value = option;
    })
    .catch(error => {
      console.error("[ERROR] :", error);
    });
}

onMounted(() => {
  switchReport("e");
});


</script>

<style lang="scss" scoped>
#report {
  height: calc(100% - 6.5rem - 3rem); // 6.5em:header; 3em:footer
  overflow: hidden;
  margin-top: 6.5em; // header 距離

  #reportComponent {
    height: 100%;
    display: flex;
    background-color: rgba(var(--BLACK), 0.5);

    aside {
      width: 15em;

      nav {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        color: white;
        border-right: 5px solid rgb(var(--BLUE_0));

        a {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1em;
          cursor: pointer;

          &:hover {
            color: rgb(var(--B1));
          }

          &.currentReport {
            color: rgb(var(--B3));
          }
        }
      }
    }

    main {
      flex-grow: 1;
      padding: 0 1rem;

      .reportTable {
        height: 100%;
        --el-table-border: 1px solid transparent;
        --el-table-bg-color: transparent;
        --el-table-border-color: transparent;

        ::v-deep {
          thead tr {
            height: 2rem;
            font-size: 1.1rem;
            color: rgb(var(--B3));
            --el-table-header-bg-color: rgb(var(--GRAY9));

            th {
              text-align: center;
              border-left: 1px solid rgb(var(--BLACK));
              border-right: 1px solid rgb(var(--BLACK));
            }
          }

          tbody tr {
            font-size: 1rem;
            color: rgb(var(--WHITE));
            background-color: rgb(var(--GRAY7));
            --el-table-border: 0.1rem solid rgb(var(--BLACK));
            --el-table-row-hover-bg-color: rgb(var(--B9));
          }

          tbody tr:nth-child(even) {
            background-color: rgb(var(--GRAY8));
          }
        }
      }
    }
  }
}
</style>