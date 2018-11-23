<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="4"> <i class="el-icon-news"></i> 公司考勤系统  </el-menu-item>
    <el-menu-item
      v-for="(item, index) in routes"
      :index="item.currentIndex"
      :key="index"
      @click="activeHandler(index)"
    >
      <router-link :to="item.url" style="text-decoration:none">{{item.title}} </router-link>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0',
      routes: [
        { url: "/index/login", title: "打卡" , currentIndex:'0'},
        { url: "/index/register", title: "注册",currentIndex:'1' },
        { url: "/index/adminlogin", title: "管理员",currentIndex:'2' }
      ],
      
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    activeHandler(index){
      this.activeIndex = this.routes[index].currentIndex
    }
  }
};
</script>

<style scoped>
</style>