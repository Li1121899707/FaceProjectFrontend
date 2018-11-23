<template>
  <div>
    <vheader></vheader>
    <div class="index-container">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import vheader from "./common/vheader";
export default {
  data() {
    return {};
  },
  components: {
    vheader
  }
};
</script>

<style scoped>
.index-container{
  margin-top: 50px;
}
</style>
