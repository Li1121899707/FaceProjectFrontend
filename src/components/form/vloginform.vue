<template>
  <div>
    <el-col :span="24">
      <el-col
        :span="13"
        :offset="6"
        style="margin-bottom:30px; font-size:24px"
      >
        <el-card shadow="hover">
          请查看您的个人信息
        </el-card>
      </el-col>
    </el-col>

    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="您的工号">
        <el-input
          v-model="form.id"
          :disabled="true"
        > </el-input>
      </el-form-item>
      <el-form-item label="您的姓名">
        <el-input
          v-model="form.name"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >登陆</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>


<script>
export default {
  data() {
    return {
      form: {
        id: this.loginId,
        name: this.loginName
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  props:["loginId","loginName"]
};
</script>

<style scoped>
</style>
