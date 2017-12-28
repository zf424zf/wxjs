<template>
  <div class="qrcode" style="margin: 10rem">
    <!--<qrcode :value="qrcode" type="img" :size="200"></qrcode>-->
    <img :src="qrcode" width="400">
  </div>
</template>
<script>
  import {Qrcode} from 'vux'
  export default{
    components: {
      Qrcode,
    },
    created(){
      let clid = this.$route.query.clid;
      let self = this;
      this.$axios.get(this.ApiRoute.getsignqrcode + '?courselogid=' + clid, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.qrcode = result.data;
        } else {
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
      });
    },
    data(){
      return {
        qrcode: ''
      };
    }
  }
</script>
<style>

</style>
