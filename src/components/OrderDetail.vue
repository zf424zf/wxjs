<template>
  <div id="submit-order">
    <div class="orderHeader clear">
      <div class="user left">
        <img :src="orderInfo.headimg" alt="">
        <span>{{orderInfo.coach}}</span>
      </div>
      <ul class="weInfo right">
        <li class="clear">
          <h3 class="left" style="margin: 0.4rem">{{orderInfo.course}}</h3>
          <span class="lesson right"><i>￥{{orderInfo.price}}</i>/课时</span>
        </li>
        <li class="clear">
          <h4 class="left" style="margin: 0rem">{{orderInfo.sporthall}}</h4>
          <!--<span class="count right">x 8</span>-->
        </li>
        <li class="address">
          {{orderInfo.address}}
        </li>
      </ul>
    </div>
    <ul class="order">
      <li class="clear">
        <p class="left">课时数量</p>
        <span class="right" style="margin-top: 2rem">{{orderInfo.totalhours}}</span>
      </li>
      <li class="clear">
        <p class="left">课程总价</p>
        <span class="right total" style="margin-top: 1.5rem">￥{{orderInfo.amount}}</span>
      </li>
      <!--<li class="clear">-->
      <!--<p class="left">课程优惠</p>-->
      <!--<span class="right">省10元：大鹏增肌课立减10元</span>-->
      <!--</li>-->
    </ul>
    <div class="orderInfo">
      <p>
        订单编号：
        <span>{{orderInfo.number}}</span>
      </p>
      <p class="creTime">
        创建时间：
        <span>{{orderInfo.addtime}}</span>
      </p>
    </div>
    <div class="payment">
      <p>
        合计：
        <span>￥{{orderInfo.realamount}}</span>
      </p>
      <button class="confirmPay" @click="pay()">确认支付</button>
    </div>
  </div>
</template>
<script>
  import WXPay from '../jweixin-1.0.0'
  export default{
    created(){
      let qid = this.$route.query.qid;
      let self = this;
      this.$axios.get(this.ApiRoute.orderpay + '?number=' + qid, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.orderInfo = result.data.orderinfo;
          self.payInfo = result.data.paypost;
          self.wxpay();
        } else {
          if (109 == result.code) {
//            self.$router.push({path: '/Login'})
            location.href  = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl="+location.href;
          }
        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });
//      this.$http.get(this.ApiRoute.orderpay+'?number='+qid).then(response => {
//        let data = JSON.parse(JSON.stringify(response.body)).response.data;
//        this.orderInfo = data.orderinfo;
//        this.payInfo = data.paypost;
//        this.wxpay();
//      });

    },
    data(){
      return {
        orderInfo: {},
        payInfo: {}
      }
    },
    methods: {
      pay(){
        wx.chooseWXPay({
          timestamp: this.payInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: this.payInfo.nonceStr, // 支付签名随机串，不长于 32 位
          package: this.payInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: this.payInfo.paySign, // 支付签名
          success: function (res) {
            alert('支付成功')
            window.location.href = '/PayOrder?type=1';
          },
          cancel: function (res) {
            alert('支付失败')
            window.location.href = '/PayOrder?type=0';
          }
        });
      },
      wxpay(){
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
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
//          } else {
//            if(109 == result.code){
//              self.$router.push({path:'/Login'})
//            }
//          }
        }).catch(function (response) {
          console.log(response)
          // 这里是处理错误的回调
        });
//       this.$http.get('http://crmapi.24parking.com.cn/Mobile/WeiXin/getJsSign?url='+encodeURIComponent(location.href)).then(response=>{
//         let wxpConfig = response.body;
//         wx.config({
//           debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//           appId: wxpConfig.appid, // 必填，公众号的唯一标识
//           timestamp: wxpConfig.timestamp, // 必填，生成签名的时间戳
//           nonceStr: wxpConfig.noncestr, // 必填，生成签名的随机串
//           signature: wxpConfig.signature,// 必填，签名，见附录1
//           jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//         });
//       });
      }
    }
  }
</script>
<style>
  #submit-order .clear:after {
    content: "";
    display: block;
    clear: both
  }

  /* public */
  #submit-order .clear:after {
    content: '';
    display: block;
    clear: both;
  }

  #submit-order .left {
    float: left;
  }

  #submit-order .right {
    float: right;
    text-align: right;
  }

  #submit-order {
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
  }

  #submit-order .orderHeader {
    width: 100%;
    padding: 1.25rem .625rem;
    border-bottom: 1px solid #E8E8E8;
  }

  #submit-order .user {
    width: 26%;
    text-align: center;
  }

  #submit-order .user > img { /* 头像 */
    display: block;
    width: 9.5rem;
    height: 9.5rem;
    border-radius: 9.5rem;
    margin-left:2rem;
  }
  #submit-order .user > span { /* 名字 */
    padding-top: 1rem;
  }

  #submit-order .weInfo {
    width: 70%;
  }

  #submit-order .weInfo li {
    margin-bottom: 2.5rem;
  }

  #submit-order .weInfo li > h3 { /* 增肌课 */
    font-size: 2rem;
  }

  #submit-order .weInfo .lesson { /* 280 */
    color: #76a52b;
    text-align: right;
  }

  #submit-order .weInfo .lesson i {
    font-style: normal;
    font-size: 1.5rem;
    color: #76a52b;
  }

  #submit-order .weInfo li > h4 { /* 卓赢健身南京总部店 */
    color: #ADADAD;
    background: #E8E8E8;
    padding: .1rem .625rem;
  }

  #submit-order .weInfo .address {
    margin-bottom: 0;
    color: #777;
    text-align: left;
  }

  #submit-order ul.order li {
    border-bottom: 1px solid #E8E8E8;
    padding: 1rem;
  }

  #submit-order ul.order li > .total {
    color: #76a52b;
  }

  #submit-order ul.order li.calculate {
    text-align: right;
  }

  #submit-order ul.order li.calculate span {
    color: #76a52b;
  }

  #submit-order .orderInfo {
    text-align: left;
    padding: 1rem;
  }

  #submit-order .orderInfo > p,
  #submit-order .orderInfo span {
    color: #777;
  }

  #submit-order .orderInfo p.creTime { /* 创建时间 */
    margin-top: .5rem;
  }

  #submit-order .payment {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: right;
    border-top: 1px solid #E8E8E8;
    /*margin-bottom: 4rem;*/
  }

  #submit-order .payment > p {
    display: inline-block;
    margin-right: 1.5rem;
  }

  #submit-order .payment > p > span {
    color: #76a52b;
  }

  #submit-order .payment > .confirmPay {
    border: none;
    background: #8bc53f;
    color: #fff;
    padding: .8rem 1.5rem;
    font-size: 2rem;
    margin-right: 1rem;
  }
</style>
