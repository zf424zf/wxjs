<template>
  <div class="reg-container">
    <div class="reg-logo">
      <img src="../../static/images/zyjs_logo.png"/>
    </div>
    <div class="body">
      <div class="reg">
        <group>
          <x-input name="mobile" @on-blur="phoneBlur" v-model="phone" placeholder="请输入手机号码" keyboard="number"
                   is-type="china-mobile">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册1.png">
            <span slot="right" v-show="!phoneType" style="color: #f00000">格式不正确</span>
          </x-input>
          <x-input type="password" placeholder="请输入密码" v-model="password" :min="6" :max="20" @on-change="change">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册2.png">
          </x-input>
          <x-input v-model="password2" type="password" placeholder="请确认密码" :equal-with="password">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册3.png">
          </x-input>
          <x-input v-model="code" class="weui-vcode" placeholder="请确认验证码">
            <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册4.png">
            <x-button class="yzm" slot="right" plain type="primary" mini text="发送验证码" @click.native="send1"
                      v-if="show"></x-button>
            <x-button class="yzm" slot="right" plain type="primary" mini :text="'剩余'+time+'s'" :disabled="!show"
                      v-if="!show"></x-button>
          </x-input>
        </group>
      </div>
      <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastText" :position="'middle'">
        {{toastText}}
      </toast>
      <x-button @click.native="reg1" class="zhuce" type="primary">注册</x-button>
      <x-button @click.native="back" class="back" type="primary">返回</x-button>
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
        password: '',
        password2: '',
        code: '',
        enterText: '',
        valid1: false,
        valid2: false,
        iconType: '',
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
          this.$http.get(this.ApiRoute.userreg + '?phone=' + this.phone + '&pwd=' + this.password + '&repwd=' + this.password2 + '&code=' + this.code).then(response => {
            let data = JSON.parse(JSON.stringify(response.body)).response;
            console.log(response);
            if (data.code == 200) {
              window.location.href ='/Personal';
            } else {
              this.toastText = data.msg;
              this.showPositionValue = true;
              window.location.href ='/Login';
//              this.$router.push({path:'/Login'});
            }
          }, response => {

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
          this.$http.get(this.ApiRoute.getvalidatecode + '?action=reg&phone=' + this.phone).then(response => {
            let date = JSON.parse(JSON.stringify(response.body)).response;
            if (date.code == 200) {
              this.toastText = '发送成功';
              this.showPositionValue = true;
              this.getCode();
            } else {
              this.toastText = date.msg;
              this.showPositionValue = true;
            }
          }, response => {

          });
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
      },
      getValid1 () {
        this.valid1 = this.$refs.input01.valid
      },
      getValid2 () {
        this.valid2 = this.$refs.input02.valid
      },
      change (val) {
        console.log(val)
      },
      onBlur (val) {
        console.log('on blur', val)
      },
      onFocus (val, $event) {
        console.log('on focus', val, $event)
      },
      onEnter (val) {
        console.log('click enter!', val)
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
  .reg-container {
    background: url("../../static/images/reg.png") no-repeat;
    background-size: cover;
    width: 100%;
    height: 80rem;
  }

  .reg-container .reg-logo img{
    width: 575px;
    height: 280px;
  }
  .reg-container .vux-x-input, .reg-container .weui-cell {
    height: 5rem !important;
    line-height: 5rem !important;
    font-size: 1.5rem !important;
  }

  .reg-container .weui-btn {
    font-size: 1.5rem !important;
  }

  .reg-container .yzm {
    border-radius: .5rem !important;
    border: .15rem solid #ff6600 !important;
    color: #1c1d1f !important;
  }

  .reg-container .zhuce {
    background-color: #ff6600 !important;
  }

  .reg-container .back {
    background-color: #8e8e93 !important;
    opacity: 0.5;
  }

  .reg-container .zhuce, .back {
    height: 5rem !important;
    color: #f3f3f3 !important;
    width: 90% !important;
  }

  .reg-container .reg {
    opacity: 0.5;
    background: #fff;
    margin: 2rem;
    width: 90%;
  }

  .reg-container .vux-x-input {
    border: 1px rgb(215, 212, 210) solid;
  }

  .reg-container .reg-logo {
    padding: 6rem 0 6rem 0;
  }
</style>
