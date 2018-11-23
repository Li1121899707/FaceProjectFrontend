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
      name: "考勤统计列表",
      cols: [
        //表头
        { prop: "arId", label: "考勤表ID", width: 80 },
        { prop: "arEmployeeId", label: "员工ID", width: 120 },
        { prop: "eiName", label: "员工姓名", width: 100 },
        { prop: "arDate", label: "考勤时间", width: 100 },
        { prop: "atStart", label: "上班时间", width: 100 },
        { prop: "atEnd", label: "下班时间", width: 100 },
        { prop: "arLate", label: "迟到", width: 100 },
        { prop: "arEarly", label: "早退", width: 100 },
        { prop: "arAbsence", label: "缺勤", width: 100 }
      ]
    };
  },
  methods: {
    readData(page) {
      this.axios
        .get("/api/admin/count/queryall", {
          params: { pageIndex: page }
        })
        .then(response => {
          this.tableData = response.data.data;
          this.total = response.data.page.pageNumber;
          this.currentPage = response.data.page.pageIndex;
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