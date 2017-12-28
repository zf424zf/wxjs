<template>
  <div id="order-management">
    <ul class="order-status clear">
      <li class="active" @click="notFinishOrder()">未完成</li>
      <li @click="finishOrder()">已完成</li>
    </ul>
    <ul class="order-content" v-for="item in orderInfo">
      <li>
        <div class="order-info clear">
          <p class="left">
            订单号：
            <span>{{item.number}}</span>
          </p>
          <span class="left">{{item.addtime}}</span>
        </div>
        <div class="order-header clear">
          <div class="user">
            <img :src="item.headimg" alt="">
            <span>{{item.username}}</span>
          </div>
          <ul class="we-info">
            <li class="clear">
              <h3 class="left">{{item.course}}</h3>
              <span class="right">等待学员付款</span>
            </li>
            <li class="firmName">{{item.sporthall}}</li>
            <li class="address">
              {{item.address}}
              <span class="icon"></span>
            </li>
            <li class="classHour">
              <span><i>￥{{item.price}}</i>/课时</span>
              <span><i>x {{item.totalhours}}</i>课时</span>
            </li>
          </ul>
        </div>
        <ul class="order-count">
          <li class="clear">
            <p class="left">课程总价</p>
            <span class="right">￥{{item.amount}}</span>
          </li>
          <li class="btn">
            <button @click="telCoach(item['phone'])">联系Ta</button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        orderInfo: {}
      };
    },
    methods: {
      telCoach(tel){
        window.location.href = 'tel://' + tel
      },
      notFinishOrder(){
//        this.$router.push({path: '/Coach/Order'})
        window.location.href = '/Coach/Order'

      },
      finishOrder(){
//        this.$router.push({path: '/Coach/FinishOrder'})
        window.location.href = '/Coach/FinishOrder'
      }
    }
    ,
    created()
    {
      let self = this;
      this.$axios.get(this.ApiRoute.getcoachorder + '?type=0', {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (result.code == 200) {
          let data = result.data;
          self.orderInfo = data;
        } else {

        }
      }).catch(function (response) {
        // 这里是处理错误的回调
      });
    }
  }
</script>
<style>
  @import "../../../static/css/style.css";
  /* public */
  .clear:after {
    content: '';
    display: block;
    clear: both;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  #order-management {
    width: 100%;
    height: 100%;
    color: #333;
    font-size: 1.8rem;
    padding-bottom: 4.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  #order-management .order-status {
    border-bottom: 1px solid #ccc;
  }

  #order-management .order-status > li {
    float: left;
    width: 50%;
    padding: .8rem 0;
    text-align: center;
    color: #8C8C8C;
    font-size: 2rem;
  }

  #order-management .order-status > li.active {
    color: #8FC31F;
    border-bottom: 5px solid #8FC31F;
  }

  #order-management .order-content .order-info {
    padding: .5rem 0;
    border-bottom: 1px solid #ccc;
    color: #8C8C8C;
    font-size: 1.8rem;
  }

  #order-management .order-content .order-info > p {
    width: 50%;
    margin: 0;
  }

  #order-management .order-content .order-info > span {
    width: 50%;
    text-align: right;
  }

  #order-management .order-content .order-header {
    border-bottom: 1px solid #ccc;
    padding: 2rem 0;
  }

  #order-management .order-content .order-header .user {
    float: left;
    width: 20%;
    margin-right: 1.8rem;
    text-align: center;
  }

  #order-management .order-content .order-header .user > img {
    display: block;
    width: 100%;
    margin-bottom: .8rem;
    border-radius: 50%;
  }

  #order-management .order-content .order-header .we-info {
    float: right;
    width: 70%;
  }

  #order-management .order-content .order-header .we-info > li {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  #order-management .order-content .order-header .we-info > li > h3 {
    margin: 0;
    font-size: 2rem;
  }

  #order-management .order-content .order-header .we-info > li > h3 + span {
    font-size: 1.8rem;
    color: #E95726;
  }

  #order-management .order-content .order-header .we-info > li.firmName {
    width: 18rem;
    background: #E8E8E8;
    color: #707173;
    padding: .1rem .625rem;
  }

  #order-management .order-content .order-header .we-info > li.address > span {
    display: inline-block;
    width: 1.2rem;
    height: 1.8rem;
    margin-left: .8rem;
    background: #ccc;
  }

  #order-management .order-content .order-header .we-info > li.classHour {
    margin: 0;
    color: #8C8C8C;
    text-align: right;
  }

  #order-management .order-content .order-header .we-info > li.classHour > span {
    margin-left: 2rem;
  }

  #order-management .order-content .order-count > li {
    padding: 1.2rem 0;
    border-bottom: 1px solid #ccc;
  }

  #order-management .order-content .order-count > li > p {
    margin: 0;
  }

  #order-management .order-content .order-count > li.calculate {
    text-align: right;
  }

  #order-management .order-content .order-count > li.calculate > p {
    display: inline-block;
  }

  #order-management .order-content .order-count > li.calculate > p + span > i {
    color: #E95726;
    font-style: normal;
  }

  #order-management .order-content .order-count > li.btn {
    margin: 0;
    text-align: right;
  }

  #order-management .order-content .order-count > li.btn > button {
    width: 12rem;
    height: 4.3rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    font-size: 2rem;
    color: #8c8c8c;
  }

  .order-header ul .address {
    text-align: left;
  }
</style>
