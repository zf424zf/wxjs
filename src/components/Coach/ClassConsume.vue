<template>
  <div class="coach-class-consume container">
    <ul class="order-status clear">
      <li @click="goStudent">学员信息</li>
      <li @click="goKehao" class="active">学员课耗</li>
    </ul>
    <div class="sl-line"></div>
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="course-list-box"
         style="height:100%;margin-top: 4rem">
      <div class="course-list clearfix" v-for="(item,key) in courses" v-if="item != null" >
        <div class="left">
          <img :src="item.headimg">
          <div class="coach-name">{{item.username}}</div>
        </div>
        <div class="right">
          <div class="clearfix">
            <div class="course-name">{{item.ctitle}}</div>
            <div class="course-status text-right">
              <!--<span class="hourglass"></span>-->
              <span :class="{num:true, yiwancheng:item.status == 3,yiyuyue:item.status == 1,yiquxiao:item.status == 2}">{{item.currenthours}}/{{item.totalhours}}</span>
              <span class="status yiyuyue" v-if="item.status == 1">待上课</span>
              <span class="status yiquxiao" v-if="item.status == 2">已取消</span>
              <span class="status yiwancheng" v-if="item.status == 3">已完成</span>
              <span class="status" style="display:none;">教练指派中</span>
            </div>
          </div>
          <div class="clearfix">
            <div class="venue-name">
              <span class="tap">{{item.sporthall}}</span>
            </div>
            <div class="log">
              <!--<span class="btn-log"></span>-->
              <span class="alarm">{{item.ordertime}}</span>
            </div>
          </div>
          <div class="address" @click="getMap(item.latitude,item.longitude,item.sporthall)">
            {{item.address}}
            <img src="../../assets/卓赢健身切图_icon.地址定位.png"/>
          </div>
          <div class="btn-box clearfix">
            <div class="btn-right" @click="telCoach(item.phone)">联系学员</div>
          </div>
        </div>
        <confirm v-model="confirmCancel"
                 title="取消课程"
                 theme="ios"
                 @on-confirm="cancelCourse(item.id)"
                 @on-cancel="confirmCancel = false"
        >
          <p style="text-align:center;">确定取消课程?</p>
        </confirm>
      </div>
    </div>
  </div>
</template>
<script>
  import {TransferDom, Tab, TabItem, Confirm} from 'vux'
  export default {
    data () {
      return {
        courses: [],
        confirmCancel: false
      }
    },
    created(){
      let self = this;
      this.$axios.get(this.ApiRoute.getstudentcourselog, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.courses = result.data;
        } else {
        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });
    },
    components: {
      Tab, TabItem, Confirm,
    },
    directives: {
      TransferDom
    },
    methods: {
      goKehao: function () {
        window.location.href = '/Coach/ClassConsume';
//          this.$router.push({path:'/Coach/ClassConsume'})
      },
      goStudent: function () {
        window.location.href = '/Coach/Student';
//        this.$router.push({path:'/Coach/Student'})
      },
      getMap: function (latitude, longitude, name) {
//        this.$router.push({path: '/Map?lat=' + latitude + '&lng=' + longitude + '&name=' + name})
        window.location.href = '/Map?lat=' + latitude + '&lng=' + longitude + '&name=' + name;
      },
      onItemClick(){
//        this.$router.push({path: '/OverClass'})
        window.location.href = '/OverClass';
      },
      telCoach(tel){
        window.location.href = 'tel://' + tel
      },
      cancelCourse(cid){
        this.$axios.get(this.ApiRoute.cancelcourse + '?cid=' + cid, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            let data = result.data;
          } else {
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
  @import "../../../static/css/style.css";

  .coach-class-consume .dingwei {
    position: absolute;
    font-size: 26px !important;
    margin-left: 5px;
  }

  .coach-class-consume .course-status .yiwancheng {
    color: #2BB673 !important;
  }
  .coach-class-consume .course-status .yiquxiao {
    color: #a3a3a3 !important;
  }
  .coach-class-consume .course-status .yiyuyue {
    color: #f00000 !important;
  }
  .coach-class-consume .kuangke {
    color: #f00b0d;
  }

  .coach-class-consume .module-head {
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

  .coach-class-consume.head-left {
    float: left;
    margin: 40px;
  }

  .coach-class-consume.head-left a {
    text-decoration: none;
  }

  .coach-class-consume .head-right {
    float: right;
    margin: 60px 30px 60px 60px;
  }

  .coach-class-consume .vux-tab {
    height: 80px !important;
    position: fixed !important;
    z-index: 9999;
    width: 100%;
  }

  .coach-class-consume .vux-tab .vux-tab-item {
    line-height: 80px !important;
    font-size: 26px !important;
  }

  .coach-class-consume .vux-tab .vux-tab-item.vux-tab-selected {
    color: #ea5826 !important;
    border-bottom: 3px solid #ea5826 !important;
  }

  .coach-class-consume .vux-tab-ink-bar {
    background: none !important;
  }

  .coach-class-consume .index {
    margin-top: 7.5rem;
    padding-bottom: 4.5rem;
  }

  .coach-class-consume .main {
    background: #fff;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .coach-class-consume .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }

  .coach-class-consume .clearfix {
  }

  .coach-class-consume.text-center {
    text-align: center;
  }

  .coach-class-consume.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .coach-class-consume .text-center {
    text-align: center;
  }

  .coach-class-consume .course-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .coach-class-consume .left, .coach-class-consume .right {
    width: 50%;
    height: 100%;
    float: left;
    text-align: left;
  }

  .coach-class-consume .course-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .coach-class-consume .course-list .right {
    width: 77%;
  }

  .coach-class-consume .course-list .left img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .coach-class-consume .course-list .left .coach-name {
    width: 80%;
    float: left;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: center;
  }

  .coach-class-consume .tap {
    display: inline-block;
  }

  .coach-class-consume .course-list .right .course-name {
    width: 60%;
    float: left;
    font-size: 2rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
  }

  .coach-class-consume .course-list .right .course-status {
    width: 40%;
    float: left;
    line-height: 2.4rem;
  }

  .coach-class-consume .text-right {
    text-align: right;
  }

  .coach-class-consume .course-status {
    color: #2BB673;
  }

  .coach-class-consume .course-status .hourglass {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .coach-class-consume .course-status .num {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .coach-class-consume .course-status .status {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .ready {

  }

  .normal {

  }

  .final {

  }

  .coach-class-consume .course-list .right .venue-name {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
    float: left;
  }

  .coach-class-consume .course-list .right .log {
    float: right;
    padding: .5rem;
  }

  .coach-class-consume .course-list .right .log .alarm {
    float: right;
    color: #FF6600;
    font-size: 1.8rem;
  }

  .coach-class-consume .course-list .right .log .btn-log {
    float: right;
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .coach-class-consume .course-list .right .venue-name span {
    margin-top: .5rem;
  }

  .coach-class-consume .course-list .right .course-name {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .coach-class-consume .course-list .right .address {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .coach-class-consume .tap {
    margin-right: .2rem;
    padding: .1rem .4rem;
    background: #eee;
    border-radius: .3rem;
    -webkit-border-radius: .3rem;
    -moz-border-radius: .3rem;
    color: rgba(0, 0, 0, .5);
    letter-spacing: -.02rem;
  }

  .coach-class-consume .course-list .right .btn-box {
    padding-top: 1rem;
    background: #fff;
    border-top: 1px solid #f2f2f2;
  }

  .coach-class-consume .course-list .right .btn-box .btn-left, .course-list .right .btn-box .btn-right {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.8rem;
    font-family: PingFangSC-Medium;
    height: 100%;
    float: right;
  }

  .coach-class-consume .course-list .right .btn-box .btn-right {
    width: 30%;
    border: 1px solid #8FC31F;
    color: #8BAA1D;
    border-radius: .3rem;
  }
  .coach-class-consume{
    padding-bottom: 4.5rem;
  }
  .coach-class-consume .course-list .right .btn-box .btn-left {
    width: 30%;
    margin-right: 2%;
    background: #fff;
    color: #ea5826;
    border-radius: .3rem;
    border: 1px solid #ea5826;
  }

  .coach-class-consume .order-status > li {
    float: left;
    width: 50%;
    padding: .8rem 0;
    text-align: center;
    color: #8C8C8C;
    font-size: 2rem;
  }

  .coach-class-consume .order-status > li.active {
    color: #8BAA1D;
    border-bottom: 5px solid #8BAA1D;
  }
  .coach-class-consume .order-status{
    z-index: 999;
    position: fixed;
    background: #fff;
    width: 100%;
  }
  .coach-class-consume .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }
</style>
