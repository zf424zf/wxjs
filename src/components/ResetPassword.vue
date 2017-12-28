<template>
  <div class="resetpwd">
    <div class="body">
      <div class="reg">
        <group>
          <x-input type="password" placeholder="请输入新密码" v-model="password" :min="6" :max="20" @on-change="change">
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
      <x-button @click.native="reg1" class="zhuce" type="primary">修改</x-button>
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
        time: 0,
        password: '',
        password2: '',
        toastText: '',
        showPositionValue: false,
        show: true,
        timer: null,
        phoneType: true,
        phone: '',
        code: '',
        enterText: '',
        iconType: '',
        repasswordType: true,
        passwordType: true,
        be2333: function (value) {
          return {
            valid: value === '2333',
            msg: 'Must be 2333'
          }
        },
        style: '',
        disabledValue: 'hello',
        debounceValue: '',
        maxValue: ''
      }
    },
    methods: {
      back(){
        this.$router.go(-1)
      },
      reg1(){
        if (this.phoneType && this.checkPassword()) {
          let self = this;
          this.$axios.get(this.ApiRoute.userreg + '?phone=' + this.phone + '&pwd=' + this.password + '&repwd=' + this.password2 + '&code=' + this.code, {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
            let result = response.data.response;
            if (200 == result.code) {
              self.toastText = '注册成功';
              self.showPositionValue = true;
              window.location.href = '/Login';
//              self.$router.push({path:'/Login'})
            } else {
              if (109 == result.code) {
                location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
//                self.$router.push({path:'/Login'})
              } else {
                self.toastText = result.data.msg;
                self.showPositionValue = true;
              }
            }
          }).catch(function (response) {
            console.log(response)
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
        if (this.phoneType) {
          let self = this;
          this.$axios.get(self.ApiRoute.getvalidatecode + '?action=reg&phone=' + self.phone, {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
            let result = response.data.response;
            if (200 == result.code) {
              self.toastText = '发送成功';
              self.showPositionValue = true;
              self.getCode();
            } else {
              self.toastText = result.date.msg;
              self.showPositionValue = true;
            }
          }).catch(function (response) {
            console.log(response)
            // 这里是处理错误的回调
          });
        }
      },
      phoneBlur(){
        this.phoneType = (/^1(3|4|5|7|8)\d{9}$/).test(this.phone);
      },
      change (val) {
        console.log(val)
      },
      getCode(){
        if (!this.timer) {
          this.time = 60;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.time > 0 && this.time <= 60) {
              this.time--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      }
    },
    computed: {
      text: function () {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
      }
    }
  }
</script>
<style>
  .resetpwd {
    background-image: url("../../static/images/reg.png");
    height: 80rem;
    padding-top: 5rem;
  }

  .resetpwd .vux-x-input,.resetpwd .weui-cell {
    height: 5rem !important;
    line-height: 5rem !important;
    font-size: 1.5rem !important;
  }

  .resetpwd .weui-btn {
    height: 3rem !important;
    font-size: 1.5rem !important;
  }

  .resetpwd .yzm {
    border-radius: .5rem !important;
    border: .15rem solid #ff6600 !important;
    color: #1c1d1f !important;
    margin-top: 1rem;
  }

  .resetpwd .zhuce {
    background-color: #ff6600 !important;
  }

  .resetpwd .back {
    background-color: #8e8e93 !important;
    opacity: 0.5;
  }

  .resetpwd .zhuce, .back {
    height: 5rem !important;
    color: #f3f3f3 !important;
    width: 90% !important;
    margin: 2rem 0 2rem 2rem;
  }

  .resetpwd .reg {
    opacity: 0.5;
    background: #fff;
    margin: 2rem;
    width: 90%;
  }

  .resetpwd .vux-x-input {
    border: 1px rgb(215, 212, 210) solid;
  }

  .resetpwd .logo {
    margin: 6rem 0 6rem 0;
  }
</style>
