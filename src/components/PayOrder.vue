<template>
  <div class="member-order">
    <div class="order-title">
      <tab>
        <tab-item :selected="this.$route.query.type != 1" @on-item-click="changeItem(0)" style="font-size: 20px">未支付
        </tab-item>
        <tab-item @on-item-click="changeItem(1)" :selected="this.$route.query.type == 1">已支付</tab-item>
      </tab>
    </div>
    <div class="order-body">
      <div class="order-item" v-for="(item,index) in orderList">
        <div class="order-title clearfix">
          <div class="order-time left">
            <span>{{item['addtime']}}</span>
          </div>
          <div class="order-status right">
            <span @click="zhifu(item.number)" v-if="item.status==0"
                  style="text-align: center;float: right;border: .1rem #ff6600 solid;height: 3rem;display: inline-block;width: 8rem;color: #ff6600">去支付</span>
            <span v-if="item.status==1">已支付</span>
            <span v-if="item.status==2">已取消</span>
            <span v-if="item.status==3">退款</span>
            <span v-if="item.status==4">完成</span>
          </div>
        </div>
        <div class="item-body clearfix">
          <div class="course-img left" style="width: 20%;text-align: left;margin-top: 1.5rem">
            <img class="course-image" :src="item['courseimg']" width="100px" height="100px"/>
          </div>
          <div class="course-content right" style="text-align: left;width: 70%;">
            <div style="text-align: left;float:left;font-weight: bold;margin-top: 2rem;width:14rem">{{item['course']}}
            </div>
            <div style="text-align: right;float:right;margin-top: 2rem;width:13rem">￥{{item['price']}}/课时</div>
            <div style="text-align: right; bold;width:10rem;float: right;margin-left: 2rem">
              课时数:{{item['totalhours']}}
            </div>
          </div>
        </div>
        <div class="order-foot">
          <div class="count left">
            总计1件商品
          </div>
          <div class="total right">
            总计：<span style="color: #f00b0d">￥{{item['realamount']}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux'
  export default {
    data () {
      return {
        orderList: {},
        type: 0
      }
    },
    created(){
      let self = this
      let type = this.$route.query.type;
      if (type != 1) {
        type = 0;
      } else {
        type = 1;
      }
      this.$axios.get(this.ApiRoute.getuserorder + '?type=' + type, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (result.code == 200) {
          self.orderList = result.data;
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
//      this.$http.get(this.ApiRoute.getuserorder+'?type=0').then(response => {
//        let data = JSON.parse(JSON.stringify(response.body)).response;
//        this.orderList = data.data;
//      });

    },
    components: {
      Tab,
      TabItem,
    },

    methods: {
      zhifu: function (qid) {
        window.location.href = '/OrderDetail/?qid=' + qid;
//        this.$router.push({path: '/OrderDetail/?qid=' + qid})
//        location.href = 'http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl='+location.href;
      },
      changeItem: function (type) {
        let self = this
        this.$axios.get(this.ApiRoute.getuserorder + '?type=' + type, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (result.code == 200) {
            self.orderList = result.data;
            self.type = type;
          } else {
            if (109 == result.code) {
//              self.$router.push({path:'/Login'})
              location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
            }
          }
        }).catch(function (response) {
          // 这里是处理错误的回调
        });
//        this.$http.get(this.ApiRoute.getuserorder+'?type='+type).then(response => {
//          let data = JSON.parse(JSON.stringify(response.body)).response;
//          this.orderList = data.data;
//        });
      }
    }
  }
</script>
<style>
  .member-order .total {
    text-align: center;
  }

  .member-order .vux-tab {
    height: 5rem !important;
  }

  .member-order .vux-tab-item {
    font-size: 2rem !important;
    line-height: 5rem !important;
    color: #354758;
  }

  .member-order vux-tab .vux-tab-item.vux-tab-selected {
    font-size: 1.5rem !important;
    line-height: 5rem !important;
    color: #ea5826 !important;
    border-bottom: 3px solid #ea5826 !important;
  }

  .member-order .vux-tab-ink-bar {
    background-color: #ea5826 !important;
  }

  .member-order .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .member-order .left {
    float: left;
  }

  .member-order .right {
    float: right;
  }

  .member-order .order-time, .member-order .order-status {
    margin: 2rem;
    font-size: 1.8rem;
  }

  .member-order .order-item {
    margin: 2rem;
    border: 1px #8e8e93 solid;
    height: 23rem;
  }

  .member-order .item-body {
    border-top: 1px #8e8e93 solid;
    border-bottom: 1px #8e8e93 solid;
    height: 8rem;
    margin: 0 2rem 3rem;
    font-size: 1.8rem;
  }

  .member-order .order-foot {
    height: 2rem;
    margin: 2rem;
    font-size: 1.8rem;
  }

  .member-order .vux-tab .vux-tab-item.vux-tab-selected {
    color: #345758;
    background-color: inherit;
  }
</style>
