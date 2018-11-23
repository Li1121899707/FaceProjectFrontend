<template>
  <div>
    <el-row>
      <el-col
        :span="8"
        :offset="8"
        style="margin-top:100px"
      >
        <div>
          <el-col :span="24">
            <el-col
              :span="13"
              :offset="6"
              style="margin-bottom:30px; font-size:24px"
            >
              <el-card
                shadow="hover"
                style="text-align:center;"
              >
                管理员登录
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
            <el-form-item
              label="账户ID"
              prop="id"
            >
              <el-input v-model.number="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="pwd"
            >
              <el-input v-model="ruleForm.pwd"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
              >登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "store";
export default {
  components: {},
  data() {
    return {
      ruleForm: {
        id: "",
        pwd: ""
      },
      rules: {
        id: [
          { required: true, message: "请输入您的ID", trigger: "blur" }
          // { min: 5, max: 10, message: "长度为9", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          { min: 4, message: "长度大于4", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var id = this.ruleForm.id;
      var pwd = this.ruleForm.pwd;
      var that = this;
      var formData = this.ruleForm;
      this.axios
        .post("/api/admin/login/query", {
          id: id,
          pwd: pwd
        })
        .then(response => {
          console.log(response.data);
          that.$message(response.data.msg);
          var dataObj = response.data.data;
          if (response.data.statu == 100) {
            store.set("admin_login_token", formData);
            that.$router.push({
              path: "/admin",
              name: "admin",
              query: {
                dataObj: dataObj
              }
            });
          } else {
            return false;
          }
        })
        .catch(function(error) {
          that.$message("登录失败，请重试！");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>