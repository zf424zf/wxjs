<template>
  <div class="coach-yueke container">
    <div class="module-head">
      <!--<div class="head-left" @click="showCity == true">-->
      <div class="head-left">
        <img src="../../assets/卓赢健身切图_icon.地址定位.png"/>
        <router-link to="/Pop" class="city">南京市</router-link>
      </div>
      <span class="head-right">私教课</span>
    </div>
    <div class="sl-line"></div>
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="course-list-box"
         style="margin-top: 150px">
      <div v-for="(item,index) in lists" class="course-list clearfix">
        <div class="left">
          <img :src="item['headimg']">
          <div class="coach-name">{{item['coach']}}</div>
        </div>
        <div class="right">
          <div class="clearfix">
            <div class="course-name">{{item['course']}}</div>
            <div :class="[{'yk-finish':item['currenthours'] == item['totalhours']},'course-status' , 'text-right']">
              <!--<span class="hourglass"></span>-->
              <span class="num">{{item['currenthours']}}/{{item['totalhours']}}</span>
              <span class="status">可约课</span>
              <span class="status" style="display:none;">教练指派中</span>
            </div>
          </div>
          <div class="clearfix">
            <div class="venue-name">
              <span class="tap">{{item['sporthall']}}</span>
            </div>
            <div class="log">
              <!--<span class="btn-log"></span>-->
              <span class="alarm">7天未上课</span>
            </div>
          </div>
          <div class="address" @click="getMap(item['latitude'],item['longitude'],item['sporthall'])">
            {{item['address']}}
            <img src="../../assets/卓赢健身切图_icon.地址定位.png"/>
          </div>
          <div class="btn-box clearfix">
            <div class="btn-right" @click="telCoach(item['phone'])">联系教练</div>
            <div v-if="item['currenthours'] != item['totalhours']" class="btn-left" @click="yueke(item['id'])">约课</div>
            <div v-if="item['currenthours'] == item['totalhours']" class="btn-left xuke" @click="xuke(item['cid'])">续课
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top:18rem" v-if="lists.length <= 0">
        <span>暂无课程,快去购买吧</span>
        <x-button plain type="primary" link="/CoachList" class="custom-primary-red"
                  style="margin-top:2rem;color: #ea5826;border-color:#ea5826;width: 20rem;height: 3rem;font-size: 1.5rem;border-radius: 1rem;line-height: 3rem">
          购买
        </x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {TransferDom, Tab, TabItem, XButton} from 'vux'
  export default {
    data () {
      return {
        lists: {}
      }
    },
    created(){

      let self = this;
      this.$axios.get(this.ApiRoute.getusercourse, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.lists = result.data;
        } else {
          if (109 == result.code) {
//            self.$router.push({path:'/Login'})
            location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
          }
        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });
    },
    components: {
      XButton
    },
    directives: {
      TransferDom
    },
    methods: {
      yueke(oid) {
//        this.$router.push({path: '/ChooseClass?oid=' + oid})
        window.location.href = '/ChooseClass?oid=' + oid;
      },
      xuke(cid){
//        this.$router.push({path: '/ConfirmOrder?id=' + cid})
        window.location.href = '/ConfirmOrder?id=' + cid;
        //todo
      },
      telCoach(tel){
        window.location.href = 'tel://' + tel
      },
      getMap: function (latitude, longitude, name) {
//        this.$router.push({path: '/Map?lat=' + latitude + '&lng=' + longitude + '&name=' + name})
        window.location.href = '/Map?lat=' + latitude + '&lng=' + longitude + '&name=' + name;
      },
    }
  }
</script>
<style>
  .coach-yueke .module-head {
    background-color: #fdfdfd;
    height: 150px;
    text-align: center;
    color: darkgrey;
    font-size: 36px;
    z-index: 9999;
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #DBDCDE
  }

  .coach-yueke .head-left {
    float: left;
    margin: 58px;
  }

  .coach-yueke .dingwei {
    position: absolute;
    font-size: 26px !important;
    margin-left: 5px;
  }

  .coach-yueke .head-left a {
    text-decoration: none;
  }

  .coach-yueke .head-right {
    float: right;
    margin: 60px;
  }

  .coach-yueke .vux-tab {
    height: 80px !important;
    position: fixed !important;
    z-index: 9999;
    width: 100%;
    top: 150px;
  }

  .coach-yueke .vux-tab .vux-tab-item {
    line-height: 80px !important;
    font-size: 26px !important;
  }

  .coach-yueke .vux-tab .vux-tab-item.vux-tab-selected {
    color: #ea5826 !important;
    border-bottom: 3px solid #ea5826 !important;
  }

  .coach-yueke .vux-tab-ink-bar {
    background: #ea5826 !important;
  }

  .coach-yueke .index {
    margin-top: 7.5rem;
    padding-bottom: 4.5rem;
  }

  .coach-yueke .main {
    background: #fff;
  }

  .coach-yueke .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }

  .coach-yueke .clearfix {
  }

  .coach-yueke .text-center {
    text-align: center;
  }

  .coach-yueke .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .coach-yueke .text-center {
    text-align: center;
  }

  .coach-yueke .course-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .coach-yueke .left, .coach-yueke .right {
    width: 50%;
    height: 100%;
    float: left;
    text-align: left;
  }

  .coach-yueke .course-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .coach-yueke .course-list .right {
    width: 77%;
  }

  .coach-yueke .course-list .left img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .coach-yueke .course-list .left .coach-name {
    width: 80%;
    float: left;
    font-size: 1.2rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: center;
  }

  .coach-yueke .tap {
    display: inline-block;
  }

  .coach-yueke .course-list .right .course-name {
    width: 60%;
    float: left;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
  }

  .coach-yueke .course-list .right .course-status {
    width: 40%;
    float: left;
    line-height: 2.4rem;
  }

  .coach-yueke .text-right {
    text-align: right;
  }

  .coach-yueke .course-status {
    color: #2BB673;
  }

  .coach-yueke .course-status .hourglass {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .coach-yueke .course-status .num {
    font-size: 1.6rem;
    margin-left: .5rem;
  }

  .coach-yueke .course-status .status {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .coach-yueke .course-list .right .venue-name {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
    float: left;
  }

  .coach-yueke .course-list .right .log {
    float: right;
    padding: .5rem;
  }

  .coach-yueke .course-list .right .log .alarm {
    float: right;
    margin-right: 0.5rem;
    color: #f00b0d;
  }

  .coach-yueke .course-list .right .log .btn-log {
    float: right;
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .coach-yueke .course-list .right .venue-name span {
    margin-top: .5rem;
  }

  .coach-yueke .course-list .right .course-name {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .coach-yueke .course-list .right .address {
    padding-bottom: 1rem;
    float: left;
    font-size: 1.2rem;
    width: 100%;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .coach-yueke .tap {
    margin-right: .2rem;
    padding: .1rem .4rem;
    background: #eee;
    border-radius: .3rem;
    -webkit-border-radius: .3rem;
    -moz-border-radius: .3rem;
    color: rgba(0, 0, 0, .5);
    letter-spacing: -.02rem;
  }

  .coach-yueke .course-list .right .btn-box {
    padding-top: 1rem;
    background: #fff;
    border-top: 1px solid #f2f2f2;
  }

  .coach-yueke .course-list .right .btn-box .btn-left, .course-list .right .btn-box .btn-right {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.8rem;
    font-family: PingFangSC-Medium;
    height: 100%;
    float: right;
  }

  .coach-yueke .course-list .right .btn-box .btn-right {
    width: 30%;
    border: 1px solid #ea5826;
    color: #ea5826;
    border-radius: .3rem;
  }

  .coach-yueke .course-list .right .btn-box .btn-left {
    width: 30%;
    margin-right: 2%;
    background: #ea5826;
    color: #fff;
    border-radius: .3rem;
  }

  .coach-yueke .xuke {
    border: 1px solid #ea5826 !important;
    background: #fff !important;
    color: #ea5826 !important;
  }

  .coach-yueke .yk-finish {
    color: rgb(142, 142, 147);
  }
</style>
