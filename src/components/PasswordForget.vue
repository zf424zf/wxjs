<template>
  <div class="pwdf">
    <!--<div class="logo">-->
    <!--<img src="../../static/images/reg_logo.png"/>-->
    <!--</div>-->
    <div class="body">
      <div class="reg">
        <group>
          <x-input name="mobile" @on-blur="phoneBlur" v-model="phone" placeholder="请输入手机号码" keyboard="number"
                   is-type="china-mobile">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册1.png">
            <span slot="right" v-show="!phoneType" style="color: #f00000">格式不正确</span>
          </x-input>
          <x-input v-model="code" class="weui-vcode" placeholder="请确认验证码">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册4.png">
            <x-button class="yzm" slot="right" plain type="primary" mini text="发送验证码" @click.native="send1"
                      v-if="show"></x-button>
            <x-button class="yzm" slot="right" plain type="primary" mini :text="'剩余'+time+'s'" :disabled="!show"
                      v-if="!show"></x-button>
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
      <x-button @click.native="reg1" class="zhuce" type="primary">修改密码</x-button>
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
        toastText: '',
        showPositionValue: false,
        show: true,
        timer: null,
        phoneType: true,
        phone: '',
        code: '',
        enterText: '',
        iconType: '',
        password: '',
        password2: '',
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
        if (this.phoneType && this.checkPhone() && this.checkPassword()) {
          let self = this;
          this.$axios.get(this.ApiRoute.setnewpwd + '?phone=' + this.phone + '&code=' + this.code + '&newuserpwd=' + this.password + '&renewuserpwd=' + this.password2, {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
            let result = response.data.response;
            let data = result.data;
            if (200 == result.code) {
                alert('')
              window.location.href = '/Login'
            } else {
              self.toastText = data.msg;
              self.showPositionValue = true;
            }
          }).catch(function (response) {
            // 这里是处理错误的回调
          });
        }
      },
      checkPhone(){
        if (this.phone.length != 11) {
          return false;
        } else {
          return true;
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
          this.$axios.get(this.ApiRoute.getvalidatecode + '?action=findpwd&phone=' + this.phone, {}, {
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

//          this.$http.get().then(response => {
//            let date = JSON.parse(JSON.stringify(response.body)).response;
//            if (date.code == 200) {
//              this.toastText = '发送成功';
//              this.showPositionValue = true;
//              this.getCode();
//            } else {
//              this.toastText = date.msg;
//              this.showPositionValue = true;
//            }
//          }, response => {
//
//          });
        }
      },
      phoneBlur(){
        this.phoneType = (/^1(3|4|5|7|8)\d{9}$/).test(this.phone);
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
  .pwdf {
    margin-top: -1rem;
    background-image: url("../../static/images/reg.png");
    height: 80rem;
    padding-top: 5rem;
    padding-left: 4.5rem;
  }

  .pwdf .vux-x-input, .pwdf .weui-cell {
    height: 6rem !important;
    line-height: 6rem !important;
    font-size: 1.8rem !important;
  }

  .pwdf .weui-btn {
    height: 4rem !important;
    font-size: 2rem !important;
  }

  .pwdf .yzm {
    border-radius: .5rem !important;
    border: .15rem solid #ff6600 !important;
    color: #1c1d1f !important;
    margin-top: 1rem;
  }

  .pwdf .zhuce {
    background-color: #ff6600 !important;
  }

  .pwdf .back {
    background-color: #8e8e93 !important;
    opacity: 0.5;
  }

  .pwdf .zhuce, .back {
    height: 6rem !important;
    color: #f3f3f3 !important;
    width: 90% !important;
    margin: 2rem 0 2rem .5rem;
  }

  .pwdf .reg {
    opacity: 0.5;
    background: #fff;
    /*margin: 2rem;*/
    width: 90%;
  }

  .pwdf .vux-x-input {
    border: 1px rgb(215, 212, 210) solid;
  }

  .pwdf .vux-x-input .vux-input-icon {
    font-size: 1.8rem;
  }

  .pwdf .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before {
    font-size: 1.8rem;
  }
  .pwdf .weui-icon-clear{
    font-size: 1.8rem;
  }

  .pwdf .logo {
    margin: 6rem 0 6rem 0;
  }
</style>
