<template>
  <el-row>
    <el-col
      :span="8"
      :offset="4"
    >
      <div>
        <el-button
          style="margin-left: 40px;"
          size="large"
          type="primary"
          @click="dialogVisible = true"
        >拍照</el-button>

        <el-button
          style="margin-left: 40px;"
          size="large"
          type="success"
          @click="submitUpload"
        >进行识别 </el-button>
        <img
          :src="imageUrl"
          class="avatar"
          v-show="imageUrl"
        >

        <el-dialog
          title="请点击按钮录入人脸"
          :visible.sync="dialogVisible"
          width="30%"
          @opened="handleOpen"
          :fullscreen="isfullscreen"
        >
          <div>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-row>
                  <el-button
                    disabled
                    @click="getMedia"
                  >摄像头</el-button>
                </el-row>
                <video
                  id="video"
                  width="500px"
                  height="500px"
                  autoplay="autoplay"
                ></video>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-button
                    type="success"
                    id="snap"
                    @click="takePhoto"
                  >拍照</el-button>
                </el-row>
                <canvas
                  id="canvas"
                  width="500px"
                  height="500px"
                  v-show="isCanvasShow"
                ></canvas>
              </el-col>
            </el-row>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="handleCameraClose">取 消</el-button>
            <el-button
              type="primary"
              @click="handleCameraClose"
            >确 定</el-button>
          </span>
        </el-dialog>

      </div>
    </el-col>
    <el-col :span="8">
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
            >确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      imageUrl: "",
      fileList: [],
      limit: 1,
      dialogVisible: false,
      isfullscreen: true,
      isCanvasShow: false,
      form: {
        id: this.loginId,
        name: this.loginName
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    onSubmit() {
      if (this.imageUrl == "") {
        this.$message("您还未录入人脸信息");
        return 
      }
      var d = new Date();
      var hour = d.getHours();
      var that = this;
      var mUrl = "/api/admin/time/create"; // 上午
      var aUrl = "/api/admin/time/update";
      var url = "";
      var id = this.form.id;
      if (hour < 13) {
        url = mUrl;
      } else {
        url = aUrl;
      }
      this.axios
        .post(url, {
          id: id
        })
        .then(response => {
          that.$message(response.data.msg);
        })
        .catch(function(error) {
          that.$message("打卡失败，请重试！");
        });

      this.form.id = "";
      this.form.name = "";
      this.imageUrl = "";
    },
    submitUpload() {
      if (this.imageUrl == "") {
        this.$message("您还未录入人脸信息");
        return 
      }
      var faceUrl = this.imageUrl;
      var that = this;
      this.axios
        .post("/api/admin/employee/loginface", {
          faceInfo: faceUrl
        })
        .then(response => {
          that.$message("人脸识别成功，请检查您的个人信息是否正确");
          that.form.id = response.data.data.eiId;
          that.form.name = response.data.data.eiName;
        })
        .catch(function(error) {
          that.$message("人脸识别失败，请重试！");
          console.log("人脸识别失败，请重试！");
        });
    },
    uploadFiles(options) {
      var that = this;
      // 获取文件对象
      let file = options.file;
      var isJPG;
      //判断图片类型
      if (
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/JPG"
      ) {
        isJPG = true;
      } else {
        isJPG = false;
      }
      // alert(isJPG);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        var imgcode = e.target.result;
        that.imageUrl = imgcode;
      };
    },
    handleOpen() {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.isCanvasShow = true;
      this.getMedia();
    },
    handleCameraClose() {
      let video = document.getElementById("video");
      this.stopStreamedVideo(video);
      this.isCanvasShow = false;
      this.dialogVisible = false;
    },
    getMedia() {
      let constraints = {
        video: { width: 500, height: 500 },
        audio: true
      };
      //获得video摄像头区域
      let video = document.getElementById("video");
      let promise = navigator.mediaDevices.getUserMedia(constraints);
      promise.then(function(MediaStream) {
        video.srcObject = MediaStream;
        video.play();
      });
    },

    takePhoto() {
      //获得Canvas对象
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, 500, 500);
      var dataURL = canvas.toDataURL("image/jpeg");
      this.imageUrl = dataURL;
    },

    stopStreamedVideo(videoElem) {
      let stream = videoElem.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
      videoElem.srcObject = null;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style>
.avatar {
  margin-top: 20px;
  width: 330px;
  height: 330px;
  display: block;
}
</style>