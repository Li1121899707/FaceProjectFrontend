<template>
  <div>
    <el-col :span="24">
      <el-col
        :span="13"
        :offset="6"
        style="margin-bottom:30px; font-size:24px"
      >
        <el-card shadow="hover">
          请输入您的个人信息
        </el-card>
      </el-col>
    </el-col>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- <el-form-item
        label="工号"
        prop="id"
      >
        <el-input v-model.number="ruleForm.id"></el-input>
      </el-form-item> -->
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        //id: "",
        name: ""
      },
      rules: {
        // id: [
        //   { required: true, message: "请输入您的ID", trigger: "blur" }
        //   // { min: 5, max: 10, message: "长度为9", trigger: "blur" }
        // ],
        name: [
          { required: true, message: "请输入您的姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  props: { childImgUrl: String, required: true },
  methods: {
    submitForm(formName) {
      if(this.childImgUrl == "" || this.childImgUrl == null)
      {
        this.$message("您还未录入人脸信息");
        return false
      }
      else if(this.ruleForm.name == "" || this.ruleForm.name == null){
        this.$message("您还未填写个人信息");
        return false
      }
      var postName = this.ruleForm.name;
      var postUrl = this.childImgUrl;
      var that = this;
      this.axios
        .post(
          "/api/admin/employee/create",{
            name: postName,
            faceInfo: postUrl
          }
        )
        .then(response => {
          console.log(response.data.msg);
          that.$message(response.data.msg);
        })
        .catch(function(error) {
          console.log("注册失败，请重试！");
          that.$message("注册失败，请重试!");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>