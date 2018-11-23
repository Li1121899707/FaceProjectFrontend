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
      <el-table-column
        label="操作"
        min-width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <vupdateinfo
      @visble="handleVisble"
      @update="handleUpdate"
      :updateData="updateData"
      :dialogFormVisible="dialogFormVisible"
    ></vupdateinfo>

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
import vupdateinfo from "../form/vupdateinfo";
export default {
  components: {
    vlargetitle,
    vupdateinfo
  },
  data() {
    return {
      total: 0,
      pageSize: 8,
      currentPage: 1,
      tableData: [],
      updateData: [],
      name: "员工个人信息表",
      dialogFormVisible: false,
      cols: [
        //表头
        { prop: "eiId", label: "员工工号", width: 200 },
        { prop: "eiName", label: "员工姓名", width: 100 },
        { prop: "ejProfession", label: "职称", width: 150 }
      ]
    };
  },
  mounted() {
    this.readData(1);
  },
  methods: {
    readData(page) {
      this.axios
        .get("/api/admin/employee/queryall", {
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
    handleEdit(index, row) {
      console.log(index, row);
      this.updateData = row;
      console.log(this.updateData);
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleVisble() {
      this.dialogFormVisible = false;
    },
    handleUpdate() {
      this.handleVisble();
      this.readData();
    },
    handleChangePage(val) {
      this.readData(val);
    }
  }
};
</script>