<template>
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
    >确认使用该照片 </el-button>
    <!-- <div
      slot="tip"
      class="el-upload__tip"
    >只能上传jpg/png文件，且不超过500kb</div> -->
    <img
      :src="imageUrl"
      class="avatar"
      v-show="imageUrl"
    >

    <el-dialog
      title="请点击按钮打卡"
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
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      fileList: [],
      limit: 1,
      dialogVisible: false,
      isfullscreen: true,
      isCanvasShow: false
    };
  },
  props: {
    name: String,
    required: true
  },
  methods: {
    submitUpload() {
      if (this.imageUrl == "") {
        this.$message("您还未录入人脸信息");
      } else {
        this.$message("人脸信息等待上传，请填写您的个人信息。");
      }
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
  }
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
