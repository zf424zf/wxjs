<template>
  <div>
    <group>
      <cell-box :is-link="true">
        <div style="float: left" slot="default">
          <span style="font-size: 2rem" >头像</span>
        </div>
        <div style="float: right;margin-left: 80%" slot="default">
          <img  style="width: 100px;height: 100px" :src="user.headimg">
        </div>
      </cell-box>
      <cell style="text-align: left;font-size: 2rem" title="昵称" :value="user.name" :is-link="true" link="/UpdateName"></cell>
      <cell style="text-align: left;font-size: 2rem" title="手机号" :value="user.phone" :is-link="true"></cell>
      <cell style="text-align: left;font-size: 2rem" title="修改密码" @click.native="goReset" :is-link="true"></cell>
    </group>
  </div>
</template>
<script>
  import { Group, Cell, CellBox } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      CellBox
    },
    data(){
        return {
            user:{}
        }
    },
    methods:{
      goReset:function(){
          window.location.href = '/UpdatePassword';
      }
    },
    created(){
      let self = this;
      this.$axios.get(this.ApiRoute.getuserinfo, {}, {
        headers: {
          "Content-Type":"application/json;charset=utf-8"
        },
        withCredentials : true
      }).then(function(response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.user = result.data;
        } else {
          if(109 == result.code){
//            self.$router.push({path:'/Login'})
            location.href  = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl="+location.href;
          }
        }
      }).catch( function(response) {
        console.log(response)
        // 这里是处理错误的回调
      });

    }
  }
</script>
<style>
</style>
