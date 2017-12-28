<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="../../static/images/zyjs_logo.png"/>
    </div>
    <div class="login">
      <group>
        <x-input name="mobile" @on-blur="phoneBlur" v-model="phone" placeholder="请输入手机号码" keyboard="number"
                 is-type="china-mobile">
          <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册1.png">
          <span slot="right" v-show="!phoneType" style="color: #f00000">格式不正确</span>
        </x-input>

        <x-input title="请输入密码" @on-blur="pwdBlur" type="password" placeholder="请输入密码" v-model="password" :min="6"
                 :max="20">
          <img slot="label" style="padding-right:10px;display:block;" src="../../static/images/卓赢健身切图2_icon-注册2.png">
          <span slot="right" v-show="!passwordType" style="color: #f00000">格式不正确</span>
        </x-input>
      </group>
    </div>
    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="toastText" :position="'middle'">
      {{ toastText}}
    </toast>
    <x-button class="denglu" type="primary" @click.native="login1">登录</x-button>
    <x-button class="zhuce" type="primary" @click.native="goToReg">注册</x-button>
    <x-button class="zhuce" type="primary" @click.native="goForget">忘记密码</x-button>
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
        toastText: '',
        password: '',
        enterText: '',
        showPositionValue: false,
        valid1: false,
        valid2: false,
        phone: '',
        phoneType: true,
        passwordType: true,
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
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    created(){
//      this.$axios.get('http://192.168.3.6:803/Mobile/Api/getoauthinfo', {}, {
//        headers: {
//          "Content-Type":"application/json;charset=utf-8"
//        },
//        withCredentials : true
//      }).then(function(response) {
//          console.log(response);
//        // 这里是处理正确的回调
//        let result = response.data.result;
//        if (0 == result) {
//          self.menulist = response.data.item.menulist;
//        } else if (11 == result || 9 == result) {
//          self.$router.push('/login');
//        } else {
//          console.log(response.data);
//        }
//
//      }).catch( function(response) {
//        // 这里是处理错误的回调
//        console.log(response)
//      });

    },
    methods: {
      goToReg(){
        window.location = 'Reg'
      },
      goForget(){
        this.$router.push({path: 'PasswordForget'})
      },
      login1(){
//          console.log(this.phoneType == true && this.passwordType == true && this.phone.length==11 && this.password.length >= 6);
        if (this.phoneType == true && this.passwordType == true && this.phone.length == 11 && this.password.length >= 6) {
          let self = this;
          this.$axios.get(this.ApiRoute.userlogin + '?phone=' + this.phone + '&pwd=' + this.password, {}, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
            // 这里是处理正确的回调
            let result = response.data.response;
            if (200 == result.code) {
              self.$store.commit('uid', result.data);
              localStorage.setItem('uid', result.data)
              window.location.href = '/Personal'
//              self.$router.push({path: '/Personal'})
            } else {
              self.toastText = result.msg;
              self.showPositionValue = true;
            }

          }).catch(function (response) {
            // 这里是处理错误的回调
            console.log(response)
          });

//          this.$http.get().then(response => {
//            let data = JSON.parse(JSON.stringify(response.body)).response;
//            if (data.code == 200) {
//              this.$store.commit('uid', data.data);
//              localStorage.setItem('uid', data.data)
//              this.$router.push({path: '/Personal'})
//            } else {
//              this.toastText = data.msg;
//
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
      pwdBlur(){
        this.passwordType = (this.password.length >= 6 && this.password.length <= 20)
      }
      ,
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
    }
  }
</script>
<style>
  .login-container .login-logo img{
    width: 575px;
    height: 280px;
  }
  .login-container {
    background-size: auto;
    background: url("../../static/images/reg.png") no-repeat;
    width: 100%;
    height: 82rem;
  }
  .login-container .weui-icon-clear{
  font-size: 44px;
}
  .login-container .vux-x-input, .login-container .weui-cell {
    height: 7rem !important;
    line-height: 5rem !important;
    font-size: 2.5rem !important;
  }

  .login-container .weui-btn {
    height: 3rem !important;
    font-size: 2.5rem !important;
  }

  .login-container .denglu, .back {
    margin: 2rem 0;
  }

  .login-container .denglu {
    color: #ffffff !important;
    background-color: #ff6600 !important;
    width: 100% !important;
    height: 7rem !important;
  }

  .login-container .login-logo {
    padding: 6rem 0 6rem 0;
  }

  .login-container .zhuce {
    height: 7rem !important;
    background-color: #8e8e93 !important;
    opacity: 0.5;
  }
  /*body{*/
    /*height: 100%;*/
  /*}*/
</style>
