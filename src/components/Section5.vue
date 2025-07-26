<template>
  <div id="report">
    <div id="reportComponent">
      <aside>
        <nav>
          <a :class="{currentReport : currentReport==='a'}" @click="switchReport('a')">AIS資料查詢</a>
          <a :class="{currentReport : currentReport==='b'}" @click="switchReport('b')">天氣統計資訊</a>
          <a :class="{currentReport : currentReport==='c'}" @click="switchReport('c')">人流統計資訊</a>
          <a :class="{currentReport : currentReport==='d'}" @click="switchReport('d')">照明設備列表</a>
        </nav>
      </aside>
      <main>

        <el-table id="report_a" class="reportTable" :data="tableData.data" v-if="currentReport === 'a'">
          <el-table-column v-for="item in tableData.header" :key="item.propKey" :prop="item.propKey" :label="item.label"
            :formatter="item.formatter" />
        </el-table>

        <div id="report_b" class="report_b" v-if="currentReport === 'b'">
          <el-form ref="form">

            <el-form-item class="labelWrapper" label="abcabcabcabcabc">
              <el-radio-group v-model="searchBarData.presets">
                <el-radio value="1">當天</el-radio>
                <el-radio value="2">1個月</el-radio>
                <el-radio value="3">6個月</el-radio>
                <el-radio value="4">1年</el-radio>
                <el-radio value="5">其他</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item class="labelWrapper" label="xyz">
              <el-col :span="2">
                <el-date-picker v-model="searchBarData.date1" type="date" placeholder="Pick a date"
                  style="width: 100%;" />
              </el-col>

              <el-col class="text-center" :span="1">-</el-col>

              <el-col :span="2">
                <el-date-picker v-model="searchBarData.date2" type="date" placeholder="Pick a date"
                  style="width: 100%;" />
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="">Create</el-button>
            </el-form-item>

          </el-form>

          <el-table class="reportTable" :data="tableData.data">
            <el-table-column v-for="item in tableData.header" :key="item.propKey" :prop="item.propKey"
              :label="item.label" :formatter="item.formatter" />
          </el-table>
        </div>

        <el-table id="report_c" class="reportTable" :data="tableData.data" v-if="currentReport === 'c'">
          <el-table-column v-for="item in tableData.header" :key="item.propKey" :prop="item.propKey" :label="item.label"
            :formatter="item.formatter" />
        </el-table>

        <el-table id="report_d" class="reportTable" :data="tableData.data" v-if="currentReport === 'd'">
          <template v-for="item in tableData.header" :key="item.propKey">
            <el-table-column v-if="item.propKey !== 'b'" :prop="item.propKey" :label="item.label"
              :formatter="item.formatter" />
            <el-table-column v-else :prop="item.propKey" :label="item.label">
              <template #default="scope">
                <el-tag :class="scope.row.b" disable-transitions>{{ scope.row.b }}</el-tag>
              </template>
            </el-table-column>
          </template>
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
const searchBarData = ref({
  presets: '',
  date1: '',
  date2: '',
})

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
  switchReport("a");
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
            color: rgb(var(--CYAN));
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
            height: 4rem;
            font-size: 1.1rem;
            color: rgb(var(--WHITE));
            --el-table-header-bg-color: rgb(var(--BLACK));
          }

          tbody tr {
            font-size: 1rem;
            color: rgb(var(--WHITE));
            background-color: rgb(var(--GRAY8));
            --el-table-border: 0.25rem solid rgb(var(--BLACK));
            --el-table-row-hover-bg-color: rgb(var(--B9));
          }

          tbody tr:nth-child(even) {
            background-color: rgb(var(--GRAY9));
          }

        }

      }
    }
  }
}

#report_a {}



#report_b {

  ::v-deep .el-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;


    .labelWrapper {
      width: fit-content;
      height: 100%;

      .el-form-item__label {
        width: 5rem;
        height: 100%;
        color: rgb(var(--WHITE));
        font-size: 1.25rem !important;
      }

      .el-form-item__content {
        flex: initial;
        width: 30rem;

        .el-radio-group {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .el-radio__label {
          font-size: 1.25rem !important;
          padding-left: 0.5rem;
          color: rgb(var(--WHITE));
        }

        &>.el-col-1 {
          color: rgb(var(--WHITE));
          text-align: center;
        }

        &>.el-col-2 {
          max-width: calc(50% - 0.5rem);
          flex: 1 0 0;
        }
      }

    }
  }
}

#report_d {
  .el-tag {
    width: 4rem;
    font-size: 1rem;
    color: rgb(var(--WHITE));
  }

  .online {
    color: rgb(var(--BLACK));
    border: 1px solid rgb(var(--GREEN));
    background-color: rgb(var(--GREEN));
  }

  .offline {
    border: 1px solid rgb(var(--GRAY5));
    background-color: rgb(var(--GRAY5));
  }

  .error {
    border: 1px solid rgb(var(--RED));
    background-color: rgb(var(--RED));
  }
}
</style>


<!-- date picker -->
<!-- 因為 popper 元素在 Report.vue 組件外面, 要用 <style> 定義樣式 -->
<style>
.el-popper {
  width: 22.25rem !important;
}

.el-date-picker {
  width: 100%;

  .el-date-picker__header {
    display: flex;
    width: calc(22.25rem - 2rem);
    justify-content: space-between;
    align-items: center;

    span[role="button"] {
      display: inline-block;
    }

    span:nth-child(2) {
      margin-left: auto;
      margin-right: 0;
    }

    span:nth-child(3) {
      margin-left: 0;
      margin-right: auto;
    }
  }

  .el-picker-panel__content {
    width: calc(22.25rem - 2rem);
  }
}

.el-popper {
  width: 20rem;

  * {
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(var(--BLACK)) !important;
  }
}
</style>