<template>
  <div id="app">
    <router-view></router-view>
    <div class="zytabbar">
      <tabbar v-if="showCoachBar" class="coach-tar">
        <tabbar-item :selected="this.$route.path.indexOf('/Coach/Schedule') >= 0 ||this.$route.path.indexOf('/Coach/StudentList') >= 0 " link="/Coach/Schedule">
          <span slot="label">课表</span>
        </tabbar-item>
        <tabbar-item :selected="this.$route.path.indexOf('/Coach/Student') >= 0 ||this.$route.path.indexOf('/Coach/ClassConsume') >= 0 " link="/Coach/Student">
          <span slot="label">学员信息</span>
        </tabbar-item>
        <tabbar-item :selected="this.$route.path.indexOf('/Coach/Order') >= 0 ||this.$route.path.indexOf('/Coach/FinishOrder') >= 0 " link="/Coach/Order">
          <span slot="label">订单管理</span>
        </tabbar-item>
        <tabbar-item :selected="this.$route.path.indexOf('/Coach/Personal') >= 0 || this.$route.path.indexOf('/Coach/CourseLogList') >= 0 || this.$route.path.indexOf('/Coach/SaleList') >= 0" link="/Coach/Personal">
          <span slot="label">教练中心</span>
        </tabbar-item>
      </tabbar>
      <tabbar v-if="showUserBar">
        <tabbar-item :selected="this.$route.path.indexOf('/Yueke') >= 0" @click.native="goTo('/Yueke')">
          <span slot="label" >约课</span>
        </tabbar-item>
        <tabbar-item :selected="this.$route.path.indexOf('/CoachList') >= 0 || this.$route.path.indexOf('/Gym') >= 0" @click.native="goTo('/CoachList')">
          <span slot="label" >购买</span>
        </tabbar-item>
        <tabbar-item :selected="this.$route.path.indexOf('/NotOverClass') >= 0 || this.$route.path.indexOf('/OverClass') >= 0" @click.native="goTo('/NotOverClass')">
          <span slot="label" >我的课程</span>
        </tabbar-item>
        <tabbar-item :selected="this.$route.path.indexOf('/Personal') >= 0 || this.$route.path.indexOf('/PayOrder') >= 0 || this.$route.path.indexOf('/Set') >= 0" @click.native="goTo('/Personal')">
          <span slot="label" >个人中心</span>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  import '../static/js/iscroll'
  export default {
    name: 'app',
    showCoachBar: false,
    showUserBar: false,
    components: {
      Tabbar,
      TabbarItem,
    },
    created(){

    },
    methods: {
      goTo: function (url) {
        window.location.href = url;
      }
    },
    mounted: function () {
      let path = this.$route.path;
      if (path.indexOf("/Coach/") >= 0) {
        this.showCoachBar = true;
        return;
      }
      if (path.indexOf("/Yueke") >= 0 || path.indexOf("/Gym") >= 0 || path.indexOf("/CoachList") >= 0 || path.indexOf("/PayOrder") >= 0 || path.indexOf("/NotOverClass") >= 0 || path.indexOf("/OverClass") >= 0 || path.indexOf("/Personal") >= 0) {
        this.showUserBar = true;
      }
    },
    data(){
      return {
        showCoachBar: false,
        showUserBar: false,
        hasSelect:false,
      }
    }
  }
</script>

<style lang="less">
  @import "../static/css/style.css";
  @import '~vux/src/styles/close.less';
  .weui-toast__content{
    font-size: 2rem!important;
  }
  .weui-toast{
    width: 20rem!important;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: auto;
    min-height: 100%;
  }

  .weui-tabbar__item.vux-tabbar-simple {
    height: 6rem !important;
    line-height: 6rem !important;
    padding: 1rem;
  }

  .vux-tabbar-simple .weui-tabbar__label {
    font-size: 2rem !important;
    line-height: 2rem !important;
    /*color: #ff6600 !important;*/
  }

  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #ff6600 !important;
  }

  .weui-tabbar {
    position: fixed !important;
    height: 6rem !important;
  }

  .zytabbar {
    padding-top: 1rem;
  }

  .zytabbar .weui-tabbar__label {
    color: #354758;
  }
  .coach-tar .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
    color: #8FC31F !important;
  }
  .weui-dialog__ft {
    position: relative;
    line-height: 4rem !important;
    font-size: 1.8rem !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 4rem !important;
  }
  .weui-dialog__bd {
    padding: 0 1.6em 0.8em;
    min-height: 40px;
    font-size: 1.8rem !important;
    line-height: 3rem !important;
    word-wrap: break-word;
    word-break: break-all;
    color: #999999;
    height: 9rem !important;
    text-align: left !important;
  }
  .weui-dialog__title{
    font-weight: 400;
    font-size: 1.8rem !important;
  }
  .weui-dialog__hd {
    padding: 1.3em 1.6em 0.5em;
    height: 6rem !important;
  }
  .weui-dialog{
    position: fixed;
    z-index: 5000;
    width: 80%;
    max-width: 100% !important;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }
</style>
