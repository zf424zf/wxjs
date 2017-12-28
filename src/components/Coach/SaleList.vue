<template>
  <div class="container sale-list">
    <ul class="order-status clear">
      <li @click="curMonth()" :class="{active:type != 1}">本月销售</li>
      <li @click="all()" :class="{active:type == 1}">全部销售</li>
    </ul>
    <div style="padding-top: 5rem" class="choose-time" v-if="this.type == 0">
      <group>
        <datetime v-model="selectMonth" :start-date="'2017-10-01'" @on-change="change" clear-text="today"  format="YYYY-MM"  @on-confirm="sure1()" >
          <x-button>切换时间:{{selectMonth}}</x-button>
        </datetime>
      </group>
    </div>
    <div :class="{content:true,down:this.type == 1}">
      <div class="list" v-for="order in orders">
        <div class="info">
          <img class="headicon" :src="order.headimg"/>
          <p class="username">{{order.name}}</p>
        </div>
        <div class="profile">
          <div>
            <span class="course-name">{{order.cname}}</span>
          </div>
          <div class="num">
            <span class="course-num">课次 : {{order.totalhours}}节</span>
          </div>
          <div style="width: 100%">
            <span class="course-time">{{order.addtime}}</span>
            <span class="course-price">销售额:￥{{order.realamount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Datetime, Group,XButton} from 'vux'
  export default {
    components: {
      Datetime,
      Group,
      XButton
    },
    data(){
      return {
        type: 0,
        orders:[],
        selectMonth:''
      }
    },
    created(){
      this.type = this.$route.query.type == 1 ? 1 : 0;
      let self = this;
      this.$axios.get(this.ApiRoute.getcoachsale, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.orders = result.data;
        } else {
        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });
    },
    methods:{
      change(){
        let self = this;
        this.$axios.get(this.ApiRoute.getcoachsale+'?type='+this.type+'&date='+this.selectMonth, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            self.orders = result.data;
          } else {
          }
        }).catch(function (response) {
          console.log(response)
          // 这里是处理错误的回调
        });
      },
      curMonth(){
          this.type = 0;
        let self = this;
        this.$axios.get(this.ApiRoute.getcoachsale+'?type='+this.type+'&date='+this.selectMonth, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            self.orders = result.data;
          } else {
          }
        }).catch(function (response) {
          console.log(response)
          // 这里是处理错误的回调
        });
      },
      all(){
        this.type = 1;
        let self = this;
        this.$axios.get(this.ApiRoute.getcoachsale+'?type='+this.type+'&date='+this.selectMonth, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            self.orders = result.data;
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
  .sale-list .down {
    margin-top: 5rem;

  }
  .sale-list {
    color: #2c3e50;
  }
  .sale-list .choose-time .weui-btn{
    font-size: 1.8rem;
  }
  .dp-header .dp-item.dp-right,.dp-header .dp-item{
    color: #8BAA1D!important;
  }
  .dp-header .dp-item{
    font-size: 1.8rem !important;
    height: 3rem!important;
    line-height: 3rem!important;
  }
  .scroller-item{
    font-size: 1.8rem!important;
  }

  /*
  tab切换
  */
  .sale-list .order-status > li {
    float: left;
    width: 50%;
    padding: .8rem 0;
    text-align: center;
    color: #8C8C8C;
    font-size: 2rem;
  }

  .sale-list .order-status > li.active {
    color: #8BAA1D;
    border-bottom: 5px solid #8BAA1D;
  }

  .sale-list .order-status {
    z-index: 999;
    position: fixed;
    background: #fff;
    width: 100%;
  }

  /**
  列表主体
     */
  .sale-list .content {
    position: absolute;
    width: 100%;
    margin-bottom: 5rem;
  }

  .sale-list .content .list {
    width: 100%;
    height: 12rem;
    border-bottom: .1rem #cccccc solid;
    margin-bottom: 1rem;
  }

  .sale-list .content .info {
    float: left;
    width: 25%;
  }

  .sale-list .content .info .headicon {
    width: 8rem;
    height: 8rem;
    -webkit-border-radius:8rem;
    -moz-border-radius:8rem;
    border-radius:8rem;
  }

  .sale-list .content .info .username {
    font-size: 1.8rem;
    margin: 0;
    max-width: 11rem;
    max-height: 2.5rem;
    overflow: hidden;
  }

  .sale-list .content .profile {
    float: left;
    font-size: 1.8rem;
    width: 73%;
    text-align: left;
  }

  .sale-list .content .profile>div{
    margin-top: 1rem;
  }
  .sale-list .content .profile .course-name {
    font-size: 2.5rem;
  }

  .sale-list .content .profile .course-time {
    float: left;
    display: inline-block;
  }

  .sale-list .content .profile .course-price {
    float: right;
    margin-right: 1rem;
  }
</style>
