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
      name: "签到时间列表",
      cols: [
        //表头
        { prop: "atId", label: "签到时间表ID", width: 120 },
        { prop: "atEmployeeId", label: "员工ID", width: 120 },
        { prop: "eiName", label: "员工姓名", width: 100 },
        { prop: "atDate", label: "考勤时间", width: 100 },
        { prop: "atStart", label: "上班时间", width: 100 },
        { prop: "atEnd", label: "下班时间", width: 100 }
      ]
    };
  },
  methods: {
    readData(page) {
      this.axios
        .get("/api/admin/time/queryall", {
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
    this.readData(1);
  }
};
</script>