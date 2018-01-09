<template>
  <div class="container member-over-class">
    <div class="module-head">
      <div class="head-left">
        <img src="../assets/卓赢健身切图_icon.地址定位.png"/>
        <router-link to="/Pop" class="city">南京市</router-link>
      </div>
      <span class="head-right">私教课</span>
    </div>
    <tab bar-active-color="#ea5826">
      <tab-item @click.native="onItemClick1()">未完成</tab-item>
      <tab-item selected>已完成</tab-item>
    </tab>
    <div class="sl-line"></div>
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="course-list-box"
         style="margin-top: 270px; height:100%; overflow:auto;padding-bottom: 4rem">
      <div class="course-list clearfix" v-for="(item,index) in courses1" v-if="item != null">
        <div class="left">
          <img :src="item.headimg">
          <div class="coach-name">{{item.cname}}</div>
        </div>
        <div class="right">
          <div class="clearfix">
            <div class="course-name">{{item.ctitle}}</div>
            <div class="course-status text-right">
              <!--<span class="hourglass"></span>-->
              <span :class="{num:true,yiquxiao:item.status == '2'}">{{item.currenthours}}/{{item.totalhours}}</span>
              <span v-if="item.status == '2'" class="status yiquxiao">已取消</span>
              <span v-if="item.status == '3'" class="status">已完成</span>
              <span class="status" style="display:none;">教练指派中</span>
            </div>
          </div>
          <div class="clearfix">
            <div class="venue-name">
              <span class="tap">{{item.sporthall}}</span>
            </div>
            <div class="log">
              <!--<span class="btn-log"></span>-->
              <span class="alarm">{{item.signtime}}</span>
            </div>
          </div>
          <div class="address" @click="goMap(item.latitude,item.longitude,item.sporthall)">
            {{item.address}}
            <img src="../assets/卓赢健身切图_icon.地址定位.png"/>
          </div>
          <div class="class-time" v-if="item.status == 2" style="">取消时间：{{item.canceltime}}</div>
          <div class="btn-box clearfix" style="margin-top: 1rem">
            <div v-if="item.is_evaluate != 1" class="btn-right" @click="pingjia(item.id)">评价</div>
            <!--<div class="btn-right" style="color: #fff;background-color: #ea5826;margin-right: 1rem">续课</div>-->
            <div class="class-status-msg late"></div>
            <!--<div class="class-price">222元/课时</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {TransferDom, Tab, TabItem} from 'vux'
  export default {
    data () {
      return {
        courses1: []
      }
    },
    created(){
      let self = this;
      this.$axios.get(this.ApiRoute.getmycourse + '?type=2', {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.courses1 = result.data;
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
      Tab, TabItem
    },
    directives: {
      TransferDom
    },
    methods: {
      pingjia(cid){
        window.location.href = '/Pingjia?cid=' + cid;
      },
      onItemClick1(){
        window.location.href = '/NotOverClass';
      },
      goMap(lat, lng, name){
        window.location.href = '/Map?lat=' + lat + '&lng=' + lng + '&name=' + name;
      }
    }
  }
</script>
<style>
  .member-over-class .yiquxiao {
    color: #8e8e93;
  }

  .member-over-class .class-time {
    float: left;
  }

  .member-over-class .class-status-msg {
    float: left;
    margin-left: 10px;
  }

  .member-over-class .class-price {
    float: right
  }

  .member-over-class .late {
    color: #f00b0d;
  }

  .member-over-class .dingwei {
    position: absolute;
    font-size: 26px !important;
    margin-left: 5px;
  }

  .member-over-class .yiwancheng {
    color: #2BB673;
  }

  .member-over-class .kuangke {
    color: #f00b0d;
  }

  .member-over-class .module-head {
    background-color: #fdfdfd;
    height: 150px;
    text-align: center;
    color: darkgrey;
    font-size: 2rem;
    z-index: 9999;
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #DBDCDE
  }

  .member-over-class .head-left {
    float: left;
    margin: 58px;
  }

  .member-over-class .head-left a {
    text-decoration: none;
  }

  .member-over-class .head-right {
    float: right;
    margin: 60px;
  }

  .member-over-class .vux-tab {
    height: 5rem !important;
    position: fixed !important;
    z-index: 9999;
    width: 100%;
    top: 150px;
  }

  .member-over-class .vux-tab .vux-tab-item {
    line-height: 5rem !important;
    font-size: 2rem !important;
    color: #354758;
  }

  .member-over-class .vux-tab .vux-tab-item.vux-tab-selected {
    color: #76a52b !important;
    border-bottom: 3px solid #8bc53f !important;
  }

  .member-over-class .vux-tab-ink-bar {
    background: none !important;
  }

  .member-over-class .index {
    margin-top: 7.5rem;
    padding-bottom: 4.5rem;
  }

  .member-over-class .main {
    background: #fff;
  }

  .member-over-class .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }

  .member-over-class .clearfix {
  }

  .member-over-class .text-center {
    text-align: center;
  }

  .member-over-class .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .member-over-class .text-center {
    text-align: center;
  }

  .member-over-class .course-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .member-over-class .left, .member-over-class .right {
    width: 50%;
    height: 100%;
    float: left;
    text-align: left;
  }

  .member-over-class .course-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .member-over-class .course-list .right {
    width: 77%;
  }

  .member-over-class .course-list .left img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .member-over-class .course-list .left .coach-name {
    width: 80%;
    float: left;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: center;
  }

  .member-over-class .tap {
    display: inline-block;
  }

  .member-over-class .course-list .right .course-name {
    width: 60%;
    float: left;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
  }

  .member-over-class .course-list .right .course-status {
    width: 40%;
    float: left;
    line-height: 2.4rem;
    font-size: 1.8rem;
  }

  .member-over-class .text-right {
    text-align: right;
  }

  .member-over-class .course-status {
    color: #2BB673;
  }

  .member-over-class .course-status .hourglass {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .member-over-class .course-status .num {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .course-status .status {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .ready {

  }

  .normal {

  }

  .final {

  }

  .member-over-class .course-list .right .venue-name {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
    float: left;
  }

  .member-over-class .course-list .right .log {
    float: right;
    padding: .5rem;
  }

  .member-over-class .course-list .right .log .alarm {
    float: right;
    color: #76a52b;
    font-size: 1.8rem;
  }

  .member-over-class .course-list .right .log .btn-log {
    float: right;
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .member-over-class .course-list .right .venue-name span {
    margin-top: .5rem;
  }

  .member-over-class .course-list .right .course-name {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .member-over-class .course-list .right .address {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    filter: alpha(opacity=80);
  }

  .member-over-class .tap {
    margin-right: .2rem;
    padding: .1rem .4rem;
    background: #eee;
    border-radius: .3rem;
    -webkit-border-radius: .3rem;
    -moz-border-radius: .3rem;
    color: rgba(0, 0, 0, .5);
    letter-spacing: -.02rem;
  }

  .member-over-class .course-list .right .btn-box {
    padding-top: 1rem;
    background: #fff;
    border-top: 1px solid #f2f2f2;
  }

  .member-over-class .course-list .right .btn-box .btn-left1, .course-list .right .btn-box .btn-right {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.5rem;
    font-family: PingFangSC-Medium;
    height: 100%;
    float: right;
  }

  .member-over-class .course-list .right .btn-box .btn-right {
    width: 30%;
    border: 1px solid #8bc53f;
    color: #76a52b;
    border-radius: .3rem;
  }

  .member-over-class .course-list .right .btn-box .btn-left1 {
    width: 30%;
    margin-right: 2%;
    background: #8bc53f;
    color: #fff;
    border-radius: .3rem;
  }
</style>
