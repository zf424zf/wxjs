<template>
  <div class="update-name">
    <group style="width: 88%;margin-left: 7%">
      <x-input style="height: 6rem;font-size: 2rem" placeholder="请输入昵称" v-model="nickname" :min="2" :max="10">
      </x-input>
    </group>
    <x-button @click.native="update1" style="font-size: 2rem" class="update-btn" type="primary">修改昵称</x-button>
  </div>
</template>
<script>
  import {Toast, XInput, Group, XButton} from 'vux'
  export default {
    components: {
      XInput,
      XButton,
      Group,
    },
    data(){
      return {
        nickname: ''
      }
    },
    created: function () {
      let user = JSON.parse(localStorage.getItem('user'));
      this.nickname = user.name;
    },
    methods: {
      update1: function () {
        let self = this;
        this.$axios.get(this.ApiRoute.setusername + '?name=' + this.nickname, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
//            self.$router.push({path: '/Personal'});
            window.location.href = '/Personal';
          } else {
            if(109 == result.code){
//              self.$router.push({path:'/Login'})
              location.href  = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl="+location.href;
            }
          }
        }).catch(function (response) {
          console.log(response)
          // 这里是处理错误的回调
        });
      }
    }
  }
</script>
<style>
  .update-name .update-btn {
    height: 5rem !important;
    color: #f3f3f3 !important;
    width: 90% !important;
    margin: 2rem 0 2rem 3rem;
    background-color: #8bc53f !important;
  }
  .update-name .weui-icon-clear, .weui-icon-search{
    font-size: 2rem;
  }
  .update-name .weui-input{
    height:5rem;
  }
</style>
