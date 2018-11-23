<template>
  <el-container style="height: 750px;">
    <el-aside
      width="240px"
      style="background-color: rgb(84, 92, 100);"
    >
      <el-row class="tac">
        <el-menu
          default-active="2"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >

          <el-menu-item
            index="0"
            style="height:130px;padding-top:40px"
          >
            <span
              slot="title"
              style="font-size:26px;margin-left:12px"
            >考勤管理系统</span>
          </el-menu-item>

          <el-submenu
            v-for="(item,index) in routes"
            :key="item.routeid"
            :index="item.routeid"
          >
            <template slot="title">
              <i :class="item.img"></i>
              {{item.title}}
            </template>

            <el-menu-item-group
              v-for="(childitem, index) in item.childroutes"
              :key="childitem.routeid"
            >
              <router-link
                :to="childitem.url"
                style="color:white;text-decoration:none"
              >
                <el-menu-item
                  :index="childitem.routeid"
                  @click="handleButton(index)"
                >
                  {{childitem.title}}
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-row>

    </el-aside>

    <el-container>
      <el-header>
        <div style="text-align: left; font-size: 12px; margin-left:6px; width:500px; float:left">
          <el-button
            @click="handleAttendanceCount"
            v-if="isdisable"
          >统计今日考勤信息</el-button>
        </div>
        <div style="text-align: right; font-size: 12px">
          <el-button
            @click="logout"
            style="text-decoration:none;margin-right:20px"
          >退出系统 </el-button>
          <span>{{name}},您好 </span>
        </div>
      </el-header>
      <el-main>
        <vlargetitle></vlargetitle>
        <router-view></router-view>
      </el-main>
    </el-container>

    <el-button
      :plain="true"
      @click="openCreateResult"
      v-show="false"
    ></el-button>
  </el-container>
</template>


<script>
import vlargetitle from "./common/vlargetitle";
import store from "store";
export default {
  components: {
    vlargetitle
  },
  data() {
    return {
      name: "",
      msg: "",
      tempRoute: "",
      isdisable: false,
      routes: [
        {
          url: "/admin/employee",
          title: "员工信息管理",
          routeid: "1",
          img: "el-icon-document",
          childroutes: [
            {
              url: "/admin/employee/info",
              title: "员工信息列表",
              routeid: "1-1"
            }
          ]
        },
        {
          url: "/admin/attendance",
          title: "考勤管理",
          routeid: "2",
          img: "el-icon-time",
          childroutes: [
            {
              url: "/admin/attendance/time",
              title: "签到时间管理",
              routeid: "2-1"
            },
            {
              url: "/admin/attendance/count",
              title: "考勤统计管理",
              routeid: "2-2"
            },
            {
              url: "/admin/attendance/rate",
              title: "考勤率管理",
              routeid: "2-3"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleButton(index) {
      if (index == "1") {
        this.isdisable = true;
        console.log(index);
        console.log(this.isdisable);
      } else {
        this.isdisable = false;
        console.log(index);
        console.log(this.isdisable);
      }
    },
    handleAttendanceCount() {
      this.axios
        .get("/api/admin/count/create", {})
        .then(response => {
          this.openCreateResult(response.data.msg);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    openCreateResult(msg) {
      this.$message(msg);
    },
    logout() {
      store.set("admin_login_token", "");
      console.log("注销成功！");
      this.$router.push({
        path: "/adminlogin",
        name: "adminlogin"
      });
    }
  },
  mounted() {
    this.name = this.$route.query.dataObj.aiName;
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>