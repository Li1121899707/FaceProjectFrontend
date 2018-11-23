<template>
  <div>
    <vlargetitle :name="name"></vlargetitle>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in cols"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
        :key="index"
      >
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
        @current-change="handleChangePage"
      >
      </el-pagination>
    </div>
  </div>

</template>

<script>
import vlargetitle from "../common/vlargetitle";
export default {
  components: {
    vlargetitle
  },
  data() {
    return {
      total: 0,
      pageSize: 8,
      currentPage: 1,
      tableData: [],
      name: "本月出勤率统计表",
      cols: [
        //表头
        { prop: "eid", label: "员工工号", width: 240 },
        { prop: "name", label: "员工姓名", width: 200 },
        { prop: "late", label: "迟到天数", width: 120 },
        { prop: "early", label: "早退天数", width: 120 },
        { prop: "absence", label: "缺勤天数", width: 120 }
      ]
    };
  },
  methods: {
    readData(page) {
      this.axios
        .get("/api/admin/rate/queryall", {
          params: { pageIndex: page }
        })
        .then(response => {
          this.total = response.data.page.pageNumber;
          this.currentPage = response.data.page.pageIndex;
          this.tableData = response.data.data;
          console.log(response.data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleChangePage(val) {
      this.readData(val);
    }
  },
  mounted() {
    var date = new Date();
    var month = date.getMonth() + 1;
    this.name = month + "月出勤率统计表";
    this.readData(1);
  }
};
</script>