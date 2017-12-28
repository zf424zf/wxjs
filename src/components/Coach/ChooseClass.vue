<template>
  <div class="chooseClass">
    <div v-transfer-dom style="position:absolute;overflow :auto;height: 700px">
      <x-dialog class="city" v-model="isshow" :dialog-style="{'height':'100%','width':'100%','max-width':'100%'}">
        <div class="container">
          <div class="city-title">
            <p class="dialog-title" style="color: #ea5826">选择上课时间</p>
            <div>
              <span class="vux-close" @click="closePop" style="width: 60px;height: 60px"></span>
            </div>
          </div>
          <div class="appointe-time">
            <div class="chosen-time">
              <div class="time-title" style="text-align: left">已约时间</div>
              <div class="time-content">
                <ul class="clearfix">
                  <li v-for="(item,index) in lastorder" style="width: 100%">
                    <div class="content" v-if="item.length > 0">
                      <span>{{item.orderdate}}</span>
                      <span>{{item.course}}</span>
                      <span>{{item.coach}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="date-box">
              <ul class="clearfix">
                <li v-for="(list,index) in week" :class="{'active' :list.select}" @click="changeWeek(list)">
                  <div class="week" v-if="list.isNow" style="margin-top: 1.5rem">今天</div>
                  <div class="date" v-if="!list.isNow" style="line-height: 1.5rem;margin-top: 1.5rem">{{list.titleDate}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="time-list">
              <ul style="max-height: 50%">
                <li v-for="(item ,index) in times" class="" :class="{'disabled':item.status == 1}"
                    @click="changeSelect(item)">
                  <div class="time" :class="{'selected':item==hasSelect}">{{item.time}}</div>
                  <div v-if="item.status == 1" class="text">不可选择</div>
                </li>
              </ul>
            </div>
            <div class="btn-box clearfix">
              <div @click="sure()" class="middle">确定</div>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import {TransferDom, XDialog} from 'vux'
  export default{
    created(){
      let oid = this.$route.query.oid;
      let self = this;
      this.$axios.get(this.ApiRoute.getcoachchedule + '?oid=' + oid, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.times = result.data.times;
          self.lastorder = result.data.lastorder;
        } else {
          if (109 == result.code) {
//                self.$router.push({path:'/Login'})
            location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
          }
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
      });
      let select = false;
      let isNow = false;
      for (let i = 0; i < 7; i++) {
        if (i == 0) {
          select = true;
          isNow = true;
          this.selectMonth = {
            date: this.getDate(i),
            titleDate: this.getDateWithOutYear(i),
            select: select,
            isNow: isNow
          }
        } else {
          select = false;
          isNow = false;
        }
        this.week.push({date: this.getDate(i), titleDate: this.getDateWithOutYear(i), select: select, isNow: isNow});
      }
    },
    data () {
      return {
        isshow: true,
        selectMonth: {},
        times: [],
        week: [],
        lastorder: [],
        hasSelect: ''
      }
    },
    directives: {
      TransferDom
    },
    components: {
      XDialog,
    },
    methods: {
      getDate(index){
        let date = new Date(); //当前日期
        let newDate = new Date();
        newDate.setDate(date.getDate() + index);//官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
        let month = (newDate.getMonth() + 1);
        if (month < 10) {
          month = 0 + '' + month
        }
        let time = newDate.getFullYear() + "-" + month + "-" + newDate.getDate();
        return time;
      },
      getDateWithOutYear(index){
        let date = new Date(); //当前日期
        let newDate = new Date();
        newDate.setDate(date.getDate() + index);//官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
        let month = (newDate.getMonth() + 1);
        if (month < 10) {
          month = 0 + '' + month
        }
        let time = month + "-" + newDate.getDate();
        return time;
      },
      sure(){
        let selectMonth = this.selectMonth;
        let selectDate = this.hasSelect;
        let oid = this.$route.query.oid;

        let self = this;
        this.$axios.get(this.ApiRoute.setuserschedule + '?oid=' + oid + '&date=' + selectMonth.date + '&hour_s=' + selectDate.time + '&type=1', {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            alert('预约成功');
//            self.$router.push({path: '/NotOverClass'})
            window.location.href = '/Coach/Schedule';
          } else {
            alert(result.msg);
          }
        }).catch(function (response) {
          // 这里是处理错误的回调
        });
      },
      closePop: function () {
        this.$router.go(-1)
      },
      changeWeek: function (list) {
        this.selectMonth = list;
        let qdate = list.date;
        let oid = this.$route.query.oid;
        let self = this;
        this.$axios.get(this.ApiRoute.getcoachchedule + '?oid=' + oid + '&date=' + qdate, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            self.times = result.data.times;
          } else {
          }
        }).catch(function (response) {
          // 这里是处理错误的回调
        });
        this.hasSelect = []
        list.select = !list.select
        let c = 0;
        for (let lists in this.week) {
          if (this.week[c].date != list.date) {
            this.week[c].select = false;
          }
          c++;
        }
      }
      ,
      changeSelect: function (item) {
          console.log(item)
        if (item.select) {
          item.select = false;
        } else {
          item.select = true;
        }
        if (item.select) {
          this.hasSelect = item;
        } else {
          this.hasSelect = '';
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/close';
  .appointe-time .time-content .content {
    margin: 1rem;
  }

  .vux-close {
    margin-top: -30%;
    margin-bottom: 8px;
    margin-left: 93%;
  }

  .dialog-title {
    height: 5%;
    font-size: 2.5rem;
  }

  .vux-close:before, .vux-close:after {
    width: 64px !important;
    top: 80px !important;
    left: -50px !important;
  }

  /* ~~ 此容器包含所有其它 div，并依百分比设定其宽度 ~~ */
  .container {
    position: fixed;
    left: 0;
    z-index: 1001;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
  }

  .appointe-time {
    width: 100%;
    background: #f9f9f9;
    position: fixed;
    left: 0;
  }

  .time-list {
    background: #fff;
    z-index: 2;
    position: relative;
    padding: 1.5rem;
  }

  .appointe-time .time-list ul {
    height: 40rem;
    overflow: auto;
  }

  .appointe-time .time-list ul li.disabled {
    /*padding-top: .6rem;*/
  }

  .appointe-time .time-list ul li {
    width: 25%;
    height: 7rem;
    border-right: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
    float: left;
  }

  .disabled {
    /*pointer-events: none;*/
    background: #eee;
    height: 5.6rem;
  }

  .appointe-time .time-list ul li:first-of-type, .appointe-time .time-list ul li:nth-of-type(2), .appointe-time .time-list ul li:nth-of-type(3), .appointe-time .time-list ul li:nth-of-type(4) {
    border-top: 1px solid #f2f2f2;
  }

  .appointe-time .time-list ul li:nth-of-type(4n+1) {
    border-left: 1px solid #f2f2f2;
  }

  .appointe-time .time-list ul li.disabled .time {
    line-height: 3rem;
    color: rgba(0, 0, 0, .3);
    height: 7rem;
  }

  .appointe-time .time-list ul li .time {
    line-height: 5rem;
    font-size: 1.8rem;
  }

  .text {
    font-size: 1.8rem;
    opacity: .3;
    -moz-opacity: .3;
    -webkit-opacity: .3;
    filter: alpha(opacity=30);
    margin-top: -3rem;
  }

  .appointe-time .time-list ul li.active {
    background: #ea5826;
    color: #fff;
    border-color: #ea5826;
  }

  .time-list li {

  }

  .appointe-time .date-box {
    padding: 0 1.5rem;
  }

  .appointe-time .date-box ul li {
    width: 6.3rem;
    float: left;
    text-align: center;
    height: 5.5rem;
    font-size: 1.8rem;
  }

  .appointe-time .date-box ul li.active {
    background: #fff;
    box-shadow: 0 0 0.4rem 0.1rem rgba(0, 0, 0, .2);
    border-radius: .2rem .2rem 0 0;
  }

  .appointe-time .date-box ul li .week {
    line-height: 1.5rem;
    color: rgba(0, 0, 0, .6);
  }

  .appointe-time .date-box ul li.active .week {
    color: #ea5826;
    line-height: 1.5rem;
  }

  .appointe-time .date-box ul li.active .date {
    line-height: 1.2rem;
    font-size: 1.8rem;
    color: #ea5826;
  }

  .appointe-time .date-box ul li:last-of-type {
    margin-right: 0;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .appointe-time .chosen-time .time-content ul li {
    width: 40%;
    float: left;
    margin-right: 5%;
    height: 3rem;
    font-size: 1.8rem;
  }

  .appointe-time .chosen-time .time-content ul li .content {
    color: #ea5826;
  }

  .appointe-time .chosen-time {
    padding: 1.5rem;
    max-height: 20rem;
    margin-bottom: 1rem;
  }

  .appointe-time .chosen-time .time-title {
    opacity: .3;
    -moz-opacity: .3;
    -webkit-opacity: .3;
    filter: alpha(opacity=30);
    font-size: 2rem;
  }

  .appointe-time .chosen-time .time-content {
  }

  .appointe-time .btn-box {
    padding: 1.5rem;
    background: #fff;
    border-top: 1px solid #f2f2f2;
  }

  .appointe-time .btn-box .left, .appointe-time .btn-box .right {
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    font-size: 1.6rem;
    font-family: PingFangSC-Medium;
  }

  .appointe-time .btn-box .left {
    width: 35%;
    border: 1px solid #ea5826;
    color: #ea5826;
    border-radius: .3rem;
  }

  .appointe-time .btn-box .right {
    width: 60%;
    margin-left: 5%;
    background: #ea5826;
    color: #fff;
    border-radius: .3rem;
  }

  .left, .right {
    width: 50%;
    height: 100%;
    float: left;
  }

  .middle {
    width: 100%;
    height: 100%;
    float: left;
  }

  .appointe-time .btn-box .middle {
    height: 6rem;
    line-height: 6rem;
    text-align: center;
    font-size: 2rem;
    font-family: PingFangSC-Medium;
    background: #ea5826;
    color: #fff;
    border-radius: .3rem;
  }

  ul .selected {
    border: .3rem #ea5826 solid;
  }
</style>

