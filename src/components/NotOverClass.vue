<template>
  <div class="container member-notover-class">
    <div class="module-head">
      <div class="head-left">
        <img src="../assets/卓赢健身切图_icon.地址定位.png"/>
        <router-link to="/Pop" class="city">南京市</router-link>
      </div>
      <span class="head-right">私教课</span>
    </div>
    <tab bar-active-color="#ea5826">
      <tab-item selected>未完成</tab-item>
      <tab-item @click.native="onItemClick2()">已完成</tab-item>
    </tab>
    <div class="sl-line"></div>
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="course-list-box"
         style="margin-top: 270px; height:100%; overflow:auto;padding-bottom: 4rem">
      <div class="course-list clearfix" v-for="(item,key) in courses" v-if="item != null">
        <div class="left">
          <img :src="item.headimg">
          <div class="coach-name">{{item.cname}}</div>
        </div>
        <div class="right">
          <div class="clearfix">
            <div class="course-name">{{item.ctitle}}</div>
            <div class="course-status text-right">
              <!--<span class="hourglass"></span>-->
              <span class="num yiwancheng">{{item.currenthours}}/{{item.totalhours}}</span>
              <span class="status yiwancheng">等待上课</span>
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
            <img src="../assets/卓赢健身切图_icon.地址定位.png"/>
          </div>
          <div class="btn-box clearfix">
            <div class="btn-right" @click="telCoach(item.phone)">联系教练</div>
            <div class="btn-left" @click="confirmCancel=true">取消课程</div>
            <div class="btn-left first" style=" color: #fdfdfd;background: #8bc53f;" @click="saoma()">扫码签到</div>
          </div>
        </div>
        <confirm v-model="confirmCancel"
                 title="取消课程"
                 theme="ios"
                 @on-confirm="cancelCourse(item.id)"
                 @on-cancel="confirmCancel = false"
                 mask-z-index="99999"
        >
          <p style="text-align:center;font-size: 2rem;color: #76a52b">确定取消课程?</p>
        </confirm>
      </div>
    </div>
  </div>
</template>
<script>
  import WXPay from '../jweixin-1.0.0'
  import {TransferDom, Tab, TabItem, Confirm, Alert} from 'vux'
  export default {
    data () {
      return {
        courses: [],
        confirmCancel: false
      }
    },
    created(){
        console.log(1);
      let self = this;
      this.$axios.get(this.ApiRoute.getmycourse + '?type=1', {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.courses = result.data;
          self.initSM()
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
    mounted: function () {
      console.log(2);
    },
    components: {
      Tab, TabItem, Confirm, Alert,
    },
    directives: {
      TransferDom
    },
    methods: {
      initSM: function () {
        this.$axios.get('http://crmapi.24parking.com.cn/Mobile/WeiXin/getJsSign?url=' + encodeURIComponent(location.href), {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data;
          let wxpConfig = result;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxpConfig.appid, // 必填，公众号的唯一标识
            timestamp: wxpConfig.timestamp, // 必填，生成签名的时间戳
            nonceStr: wxpConfig.noncestr, // 必填，生成签名的随机串
            signature: wxpConfig.signature,// 必填，签名，见附录1
            jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }).catch(function (response) {
          console.log(response)
          // 这里是处理错误的回调
        });
      },
      saoma: function () {
        wx.scanQRCode({
          needResult: 1,
          desc: 'scanQRCode desc',
          success: function (res) {
            let url = res.resultStr
            window.location.href = url;
          },
        })
      },
      getMap: function (latitude, longitude, name) {
//        this.$router.push({path: '/Map?lat=' + latitude + '&lng=' + longitude + '&name=' + name})
        window.location.href = '/Map?lat=' + latitude + '&lng=' + longitude + '&name=' + name;
      },
      onItemClick2(){
//        this.$router.push({path: '/OverClass'})
        window.location.href = '/OverClass';
      },
      telCoach(tel){
        window.location.href = 'tel://' + tel
      },
      cancelCourse(cid){
        let self = this;
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
            if (109 == result.code) {
              location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
            } else {
                alert(result.msg)
//                console.log(self.$vux.alert)
//              self.$vux.alert.show({
//                title: '提示',
//                content: result.msg,
//                onShow () {
//                },
//                onHide () {
//                }
//              })
//              self.$alert(result.msg, '提示', {
//                confirmButtonText: '确定',
//                callback: action => {
//                  this.$message({
//                    type: 'info',
//                    message: result.msg
//                  });
//                }
//              });
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
  .member-notover-class .dingwei {
    position: absolute;
    font-size: 26px !important;
    margin-left: 5px;
  }

  .member-notover-class .yiwancheng {
    color: #2BB673;
  }

  .member-notover-class .kuangke {
    color: #f00b0d;
  }

  .member-notover-class .module-head {
    background-color: #fdfdfd;
    height: 150px;
    text-align: center;
    color: darkgrey;
    font-size: 2rem;
    /*z-index: 9999;*/
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #DBDCDE;
    z-index: 999;
  }
  .member-notover-class .head-left {
    float: left;
    margin: 58px;
  }

  .member-notover-class .head-left a {
    text-decoration: none;
  }

  .member-notover-class .weui-mask {
    z-index: 10000;
  }

  .member-notover-class .head-right {
    float: right;
    margin: 60px;
  }

  .member-notover-class .vux-tab {
    height: 5rem !important;
    position: fixed !important;
    /*z-index: 9999;*/
    width: 100%;
    top: 150px;
    z-index: 199;
  }

  .member-notover-class .vux-tab .vux-tab-item {
    line-height: 5rem !important;
    font-size: 2rem !important;
    color: #354758;
  }

  .member-notover-class .vux-tab .vux-tab-item.vux-tab-selected {
    color: #76a52b !important;
    border-bottom: 3px solid #8bc53f !important;
  }

  .member-notover-class .vux-tab-ink-bar {
    background: none !important;
  }

  .member-notover-class .index {
    margin-top: 7.5rem;
    padding-bottom: 4.5rem;
  }

  .member-notover-class .main {
    background: #fff;
  }

  .member-notover-class .weui-dialog__bd {
    height: 9rem;
    line-height: 9rem;
  }

  .member-notover-class .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }

  .member-notover-class .weui-dialog__title {
    font-size: 1.8rem;
  }

  .member-notover-class .weui-dialog__ft {
    font-size: 1.8rem;
    height: 5rem;
    line-height: 5rem;
  }

  .member-notover-class .clearfix {
  }

  .member-notover-class .weui-dialog {
    max-width: 30rem;
    z-index: 10001;
    width: 30rem;
    border-radius: 1rem;
  }

  .member-notover-class .text-center {
    text-align: center;
  }

  .member-notover-class .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .member-notover-class .text-center {
    text-align: center;
  }

  .member-notover-class .course-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .member-notover-class .left, .member-notover-class .right {
    width: 50%;
    height: 100%;
    float: left;
    text-align: left;
  }

  .member-notover-class .course-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .member-notover-class .course-list .right {
    width: 77%;
  }

  .member-notover-class .course-list .left img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .member-notover-class .course-list .left .coach-name {
    width: 80%;
    float: left;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: center;
  }

  .member-notover-class .tap {
    display: inline-block;
  }

  .member-notover-class .course-list .right .course-name {
    width: 60%;
    float: left;
    font-size: 2.5rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
  }

  .member-notover-class .course-list .right .course-status {
    width: 40%;
    float: left;
    line-height: 2.4rem;
  }

  .member-notover-class .text-right {
    text-align: right;
  }

  .member-notover-class .course-status {
    color: #2BB673;
  }

  .member-notover-class .course-status .hourglass {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .member-notover-class .course-status .num {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .member-notover-class .course-status .status {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .ready {

  }

  .normal {

  }

  .final {

  }

  .member-notover-class .course-list .right .venue-name {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
    float: left;
  }

  .member-notover-class .course-list .right .log {
    float: right;
    padding: .5rem;
  }

  .member-notover-class .course-list .right .log .alarm {
    float: right;
    color: #76a52b;
    font-size: 1.8rem;
  }

  .member-notover-class .course-list .right .log .btn-log {
    float: right;
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .member-notover-class .course-list .right .venue-name span {
    margin-top: .5rem;
  }

  .member-notover-class .course-list .right .course-name {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .member-notover-class .course-list .right .address {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .member-notover-class .member-notover-class .tap {
    margin-right: .2rem;
    padding: .1rem .4rem;
    background: #eee;
    border-radius: .3rem;
    -webkit-border-radius: .3rem;
    -moz-border-radius: .3rem;
    color: rgba(0, 0, 0, .5);
    letter-spacing: -.02rem;
  }

  .member-notover-class .course-list .right .btn-box {
    padding-top: 1rem;
    background: #fff;
    border-top: 1px solid #f2f2f2;
  }

  .member-notover-class .course-list .right .btn-box .btn-left, .course-list .right .btn-box .btn-right {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.8rem;
    font-family: PingFangSC-Medium;
    height: 100%;
    float: right;
  }

  .member-notover-class .course-list .right .btn-box .btn-right {
    width: 30%;
    border: 1px solid #8bc53f;
    color: #76a52b;
    border-radius: .3rem;
  }

  .member-notover-class .course-list .right .btn-box .btn-left {
    width: 30%;
    margin-right: 2%;
    background: #fff;
    color: #76a52b;
    border-radius: .3rem;
    border: 1px solid #8bc53f;
  }

</style>
