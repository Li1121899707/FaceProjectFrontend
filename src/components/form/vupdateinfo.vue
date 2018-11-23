<template>
  <div>
    <el-dialog
      title="修改员工个人信息"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="closeClick"
      @open="addForm"
    >
      <el-form :model="form">
        <el-form-item
          label="员工工号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.eiId"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="员工姓名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.eiName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="员工职位"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.ejProfession"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleVisble">取 消</el-button>
        <el-button
          type="primary"
          @click="handleUpdate"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      closeClick: false,
      form: {
        eiId: 0,
        eiName: "",
        ejProfession: ""
      },
      formLabelWidth: "100px",
      options: [
        {
          value: "1",
          label: "员工"
        },
        {
          value: "2",
          label: "经理"
        },
        {
          value: "3",
          label: "副总经理"
        },
        {
          value: "4",
          label: "总经理"
        }
      ]
    };
  },
  props: ["updateData", "dialogFormVisible"],
  methods: {
    handleVisble() {
      this.$emit("visble");
    },
    addForm() {
      this.form.eiId = this.updateData.eiId;
      this.form.eiName = this.updateData.eiName;
      this.form.ejProfession = this.updateData.ejProfession;
    },
    handleUpdate() {
      this.axios
        .post("/api/admin/employee/update", {
          id: this.form.eiId,
          name: this.form.eiName,
          job: this.form.ejProfession
        })
        .then(response => {
          console.log(response);
          this.$emit("update");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {}
};
</script>