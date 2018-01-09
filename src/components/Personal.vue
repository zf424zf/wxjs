<template>
  <div class="page-group memberInfo">
    <div class="page">
      <div class="content">
        <div class="home_box">
          <div class="home_top" @click="go" style="">
            <div class="home-head">
              <img class="head" :src="user.headimg"/>
            </div>
            <div class="home-info">
              <p class="f24" style="font-size: 2.5rem;color: #f3f3f3;font-weight: 600">{{user.name}}</p>
              <div class="phone-number">
                <img class="phone-icon" src="../assets/卓赢健身切图_icon.手机.png"
                     style="float: left;margin-top: 1rem;width: 2rem;height: 2.5rem"/>
                <p
                  style="font-size: 2.5rem;float: left;margin-top: 20px;color: #f3f3f3;font-weight: 200;margin-left: 1rem">
                  {{user.phone}}</p>
              </div>
            </div>
            <div class="right-arrow">
              <img class="" src="../assets/卓赢健身切图_icon.个人中心.7向右箭头.png" style="float: left;margin-top: 22px"/>
            </div>
          </div>
          <div class="home_order">
            <nav class="bar bar-tab">
              <div class="tab-item external">
                <span class="icon iconfont " style="color: #76a52b">{{user.balance}}元</span>
                <span class="tab-label">钱包</span>
              </div>
              <div class="tab-item external">
                <span class="icon iconfont " style="color:#76a52b">{{user.discount}}个</span>
                <span class="tab-label">优惠</span>
              </div>
              <div class="tab-item external">
                <span class="icon iconfont " style="color:#76a52b">{{user.score}}分</span>
                <span class="tab-label">积分</span>
              </div>
            </nav>
          </div>
          <div class="home_card">
            <div class="card-content">
              <div class="list-block">
                <ul>
                  <group>
                    <cell
                      @click.native=saoma()
                      :title="'扫码签到'"
                      value-align="left"
                      :border-intent="false"><img slot="icon" style="margin-top: 19px"
                                                  src="../assets/卓赢健身切图_icon.个人中心.0扫码.png"/></cell>
                    <cell
                      :title="'我的订单'"
                      link="/PayOrder"
                      value-align="left"
                      is-link
                      :border-intent="false"><img slot="icon" style="margin-top: 19px"
                                                  src="../assets/卓赢健身切图_icon.个人中心.1订单.png"/></cell>
                    <cell
                      :title="'我的私教'"
                      value-align="left"
                      is-link
                      link="/Yueke"
                      :border-intent="false"><img slot="icon" style="margin-top: 19px"
                                                  src="../assets/卓赢健身切图_icon.个人中心.2我的教练.png"/></cell>
                    <cell
                      :title="'卓赢门店'"
                      value-align="left"
                      is-link
                      link="/Gym"
                      :border-intent="false"><img slot="icon" style="margin-top: 19px"
                                                  src="../assets/卓赢健身切图_icon.个人中心.3门店.png"/></cell>
                    <cell
                      :title="'系统设置'"
                      value-align="left"
                      is-link
                      link="/Set"
                      :border-intent="false"><img slot="icon" style="margin-top: 19px"
                                                  src="../assets/卓赢健身切图_icon.个人中心.4设置.png"/></cell>
                    <cell
                      v-if="user.iscoach == 1"
                      :title="'教练入驻'"
                      value-align="left"
                      @click.native="checkout1(user.cid)"
                      :border-intent="false"><img slot="icon" style="margin-top: 19px"
                                                  src="../assets/卓赢健身切图_icon.个人中心.5教练入驻.png"/></cell>
                    <!--<cell-->
                    <!--:title="'好友推荐'"-->
                    <!--value-align="left"-->
                    <!--is-link-->
                    <!--:border-intent="false"><img style="margin-left: -25%;margin-top: 19px"-->
                    <!--src="../assets/卓赢健身切图_icon.个人中心.6好友推荐.png"/></cell>-->
                  </group>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--个人主页结束-->
    </div>
  </div>
</template>
<script>
  import {Cell} from 'vux'
  import WXPay from '../jweixin-1.0.0'
  import Group from '../../node_modules/vux/src/components/group/index'

  export default{
    components: {
      Group,
      Cell
    },
    data () {
      return {
        uid: '',
        user: {}
      }
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
      go: function () {
//            this.$router.push({path:'/Set'});
        window.location.href = '/Set';
      },
      checkout1: function (cid) {
        window.location.href = '/Coach/Personal?cid='+cid;
      }
    },
    created(){
        let nore = this.$route.query.nore;
      let self = this;
      this.$axios.get(this.ApiRoute.getuserinfo, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.initSM()
          self.user = result.data;
          //若是教练且nore不为1 跳转到教练个人中心
          if(self.user.iscoach == 1 && nore != 1){
              location.href = '/Coach/Personal?cid='+self.user.cid;
          }
        } else {
          if (109 == result.code) {
//            self.$router.push({path:'/Login'})
            location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
//                        location.href  = "http://192.168.3.10/crmapi/Mobile/Api/getoauthinfo?reurl="+location.href;
          }
        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });
//      this.$http.get(this.ApiRoute.getuserinfo+'?number=' + this.uid).then(response => {
//        let data = JSON.parse(JSON.stringify(response.body)).response;
//        if (data.code == 200) {
//          this.user = data.data;
//          localStorage.setItem('user',JSON.stringify(this.user));
//        }
//      }, response => {
//
//      });
    }
  }
</script>
<style>
  .memberInfo .vux-cell-bd {
    margin-left: 1rem;
  }

  .memberInfo .vux-label {
    display: block;
    word-wrap: break-word;
    word-break: break-all;
    margin-top: 8px;
  }

  .memberInfo .home-info {
    width: 40%;
    margin-top: 3.5rem;
    float: left;
    position: relative;
    margin-left: 3rem;
  }

  .memberInfo .home-head {
    position: relative;
    float: left;
    margin-left: 80px;
  }

  .memberInfo .right-arrow {
    top: 90px;
    float: right;
    margin-right: 100px;
    position: relative;
  }

  .memberInfo .weui-cell {
    /*padding: 41px 21px !important;*/
    /*line-height: 1.911765;*/
    font-size: 2rem;
  }

  .memberInfo .home_other_card .icon-xitongshezhi:before {
    color: #5fcdff
  }

  .memberInfo .bar-tab {
    bottom: 0;
    width: 100%;
    height: 2.5rem;
    padding: 0;
    table-layout: fixed;
  }

  .memberInfo .weui-cells {
    opacity: 0.65;
    /*font-weight: 600;*/
    padding: 0 15px;
  }

  .memberInfo .content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background-image: url("../../static/images/person.png");
    background-repeat: no-repeat;
    -webkit-overflow-scrolling: touch;
  }

  .memberInfo .bar-tab .tab-item {
    position: relative;
    display: table-cell;
    width: 1%;
    height: 9rem;
    color: #929292;
    text-align: center;
    vertical-align: middle;
    border-right: 2px #e4e4e4 solid;
  }

  .memberInfo .home_order {
    height: 11rem;
    position: relative;
    background-color: #ffffff;
    opacity: 0.75;
    border-top: 1px #e8e8e8 solid;
    border-bottom: 1px #e8e8e8 solid;
    margin-bottom: 3rem;
  }

  .memberInfo .bar {
    position: absolute !important;
    z-index: 10;
    height: 2.2rem;
    padding-right: .5rem;
    padding-left: .5rem;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .memberInfo .bar-tab .tab-item .icon {
    top: .05rem;
    height: 1.2rem;
    font-size: 2.5rem;
    line-height: 1.2rem;
    padding-top: 0;
    padding-bottom: 0;
  }

  .memberInfo .bar .icon {
    position: relative;
    z-index: 20;
    padding: .5rem .1rem;
    font-size: 1rem;
    line-height: 1.2rem;
  }

  .memberInfo .list-block .item-input input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .memberInfo .page, .page-group {
    background: #f7f7f7
  }

  /*通用按钮css*/
  .memberInfo .bar-nav ~ .content {
    background: #f7f7f7
  }

  .memberInfo div.form_cont div.list-block {
    margin-top: 1rem;
  }

  .memberInfo label.label-checkbox input[type=checkbox]:checked + .item-media i.icon-form-checkbox, label.label-checkbox input[type=radio]:checked + .item-media i.icon-form-checkbox {
    background-color: #FF6A21
  }

  .memberInfo .list-block .item-inner:after {
    background: #e6e6e6
  }

  .memberInfo .photo-browser-caption span {
    margin-right: 8px;
    font-size: .75rem
  }

  .memberInfo div.home_top {
    width: 100%;
    height: 15rem;
    background-size: 100% 100%;
    text-align: left
  }

  .memberInfo div.home_top .head {
    border: 3px solid #fff;
    border-radius: 9.5rem;
    margin-top: 2.8rem;
    float: left;
    width: 9.5rem;
    height: 9.5rem;
  }

  .memberInfo div.home_top p {
    color: #fff;
    margin: 0;
  }

  .memberInfo .phone-icon {
    width: 10%;
  }

  .memberInfo div.home_box div.home_order .list-block .item-after a {
    font-size: .7rem;
  }

  /*订单*/
  .memberInfo div.home_order .bar {
    position: inherit;
    height: 8rem;
    padding-top: 1rem;
  }

  .memberInfo .bar-tab .tab-item .icon ~ .tab-label {
    display: block;
    font-size: 1.8rem;
    position: relative;
    top: .15rem;
    color: #354758;
  }

  .memberInfo div.home_order .list-block {
    margin: 0;
  }

  .memberInfo div.home_order .bar-tab .tab-item {
    color: #333
  }

  .memberInfo div.home_order .list-block .item-inner {
    padding-right: 0;
    padding-left: .75rem
  }

  .memberInfo div.home_order .list-block .item-after a {
    color: #999
  }

  .memberInfo div.home_card {
    margin-bottom: 5rem;
    margin-top: -21px;
  }

  .memberInfo div.home_card .list-block {
    margin-top: 1rem;
  }

  .memberInfo div.home_card .list-block .item-title {
    font-size: .7rem;
    color: #333
  }

  .memberInfo .home
  .setting-box .list-block {
    margin-top: 1rem;
  }

  .memberInfo .setting-box .list-block ul li {
    padding-left: .5rem;
    border-bottom: 1px solid #e7e7e7;
  }

  .memberInfo .setting-box .list-block ul li .item-title {
    color: #333;
  }

  .memberInfo .setting-cont input, .setting-cont select {
    width: 100%;
    background: #fff;
    border: 0;
    height: 2.4rem;
    line-height: 2.4rem;
    padding-left: .6rem;
  }

  .memberInfo .setting-cont textarea {
    width: 100%;
    background: #fff;
    border: 0;
    height: 4.8rem;
    line-height: 2rem;
    padding-left: .6rem;
  }

  .memberInfo .setting-cont p {
    font-size: .75rem;
    color: #FC2E39;
    padding-left: .6rem
  }

  .memberInfo .setting-cont a {
    width: 80%;
    margin: 0 auto;
    margin-top: 1.5rem;
  }

  .memberInfo .phone-number {
    width: 100%;
  }

  .memberInfo .list-block {
    color: #354758;
  }
</style>
