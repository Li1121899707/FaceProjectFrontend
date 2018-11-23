<template>
  <div class="title">
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    name: String,
    required: true
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>

<style scoped>
.title{
  font-size: 32px;
  margin-left: 5px;
  margin-bottom: 30px;
  color: #303133;
}
span{
   padding-bottom: 5px;
  border-bottom: 3px solid #545c64;
}
</style>