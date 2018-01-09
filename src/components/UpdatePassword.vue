<template>
  <div class="updatepwd">
    <div class="body">
      <div class="reg">
        <group>
          <x-input type="password" placeholder="请输入旧密码" v-model="oldpassword" :min="6" :max="20">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册2.png">
            <span slot="right" v-show="!oldpwdtype" style="color: #f00000">格式不正确</span>
          </x-input>
          <x-input type="password" placeholder="请输入新密码" v-model="password" :min="6" :max="20">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册2.png">
            <span slot="right" v-show="!passwordType" style="color: #f00000">格式不正确</span>
          </x-input>
          <x-input v-model="password2" type="password" placeholder="请确认新密码" :equal-with="password">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册3.png">
            <span slot="right" v-show="!repasswordType" style="color: #f00000">格式不正确</span>
          </x-input>
        </group>
      </div>
      <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastText" :position="'middle'">
        {{ toastText}}
      </toast>
      <x-button @click.native="updatePWD" class="zhuce" type="primary">修改</x-button>
      <x-button @click.native="back" class="zhuce backset" type="primary">返回</x-button>
    </div>
  </div>
</template>
<script>
  import {Toast, XInput, Group, XButton} from 'vux'
  export default {
    components: {
      XInput,
      XButton,
      Group,
      Toast
    },
    data () {
      return {
        password: '',
        password2: '',
        toastText: '',
        showPositionValue: false,
        repasswordType: true,
        oldpwdtype: true,
        passwordType: true,
        style: '',
        disabledValue: 'hello',
        debounceValue: '',
        maxValue: '',
        oldpassword: ''
      }
    },
    methods: {
      back(){
        window.location.href = '/Set'
      },
      updatePWD(){
        if (this.checkPassword()) {
          let self = this;
          this.$axios.get(this.ApiRoute.changepwd + '?olduserpwd=' + this.oldpassword + '&newuserpwd=' + this.password + '&renewuserpwd=' + this.password2, {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
            let result = response.data.response;
            let data = result.data;
            if (200 == result.code) {
              alert('修改成功！')
              window.location.href = '/Personal'
            } else {
              self.toastText = data.msg;
              self.showPositionValue = true;
            }
          }).catch(function (response) {
            // 这里是处理错误的回调
          });
        }
      },
      checkPassword(){
        if (this.password.length < 6) {
          return false;
        } else if (this.password != this.password2) {
          return false;
        } else {
          return true;
        }
      },
      send1(){

      },
    },
    computed: {}
  }
</script>
<style>
  .updatepwd {
    background-image: url("../../static/images/reg.png");
    height: 80rem;
    padding-top: 5rem;
  }

  .updatepwd .vux-x-input, .updatepwd .weui-cell {
    height: 5rem !important;
    line-height: 5rem !important;
    font-size: 1.5rem !important;
  }

  .updatepwd .zhuce {
    background-color: #8bc53f !important;
  }

  .updatepwd .weui-icon-clear {
    font-size: 2rem;
  }

  .updatepwd .weui-icon-success {
    font-size: 2rem;
  }

  .updatepwd .zhuce, {
    height: 5rem !important;
    color: #f3f3f3 !important;
    width: 90% !important;
    margin: 2rem 0 2rem 2rem;
  }

  .updatepwd .reg {
    opacity: 0.5;
    background: #fff;
    margin: 2rem;
    width: 90%;
  }

  .updatepwd .vux-x-input {
    border: 1px rgb(215, 212, 210) solid;
  }

  .updatepwd .weui-btn {
    height: 6rem !important;
    font-size: 2rem !important;
    line-height: 6rem;
    width: 90%;
  }

  .updatepwd .logo {
    margin: 6rem 0 6rem 0;
  }

  .updatepwd .weui-input {
    height: 5rem;
    line-height: 5rem;
    font-size: 2rem;
  }

  .updatepwd .backset {
    background-color: #ccc !important;
  }
</style>
