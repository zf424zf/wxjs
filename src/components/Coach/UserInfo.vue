<template>
  <div class="coach_personal_container">
    <div class="coach_header">
      <img :src="userInfo.headimg" class="left coach_headicon"/>
      <div class="coach_info left">
        <p class="coach_name">{{userInfo.name}} V{{userInfo.score}}</p>
        <div>
          <el-rate
            class="left"
            v-model="value5"
            disabled
            text-color="#8FC31F"
            text-template="{value}"
            :colors="['#8FC31F']"
          >
          </el-rate>
          <div class="left"><span class="count">{{userInfo.evaluate}}条</span></div>
        </div>
        <div class="coach_gyms">
          <select>
            <option>{{userInfo.sporthall}}</option>
          </select>
        </div>
        <div class="coach_profile">
          <span v-for="label in userInfo.label">{{label}}</span>
        </div>
      </div>
      <div class="checkoutuser" @click="checkout">切换成会员</div>
    </div>
    <div class="coach_content">
      <div class="coach_count">
        <div class="left" @click="salelist()">
          <p>{{userInfo.orderamount}}<span>元</span></p>
          <p>本月销售额</p>
        </div>
        <div class="left">
          <p>{{userInfo.ordernums}}<span>个</span></p>
          <p>本月订单数</p>
        </div>
        <div class="left" @click="courseloglist()">
          <p>{{userInfo.totalhours}}<span>节</span></p>
          <p>本月课耗</p>
        </div>
      </div>
      <div class="coach_charts">
        <div class="zhexian">
          <div class="check">
            <div class="title left">曲线图</div>
            <div class="left">
              <span :class="{'left-label':true,'active':qxsale}" @click="qxchange">销售额</span>
              <span :class="{'right-label':true,'active':!qxsale}" @click="qxchange">课耗</span>
            </div>
            <div class="right">
              <span :class="{'left-label':true,'active':qxday}" @click="qxdatechange">日</span>
              <span :class="{'right-label':true,'active':!qxday}" @click="qxdatechange">月</span>
            </div>
          </div>
          <ve-line :settings="chartSettings" :data="chartData" :legend="{show:false}" :colors="['#8FC31F']"
                   :y-axis="aYxis" :x-axis="aAxis"></ve-line>
        </div>
        <div class="zhuzhuang">
          <div class="check">
            <div class="title left">柱状图</div>
            <div class="left">
              <span :class="{'left-label':true,'active':zzsale}" @click="zzchange">销售额</span>
              <span :class="{'right-label':true,'active':!zzsale}" @click="zzchange">课耗</span>
            </div>
            <div class="right">
              <span :class="{'left-label':true,'active':zzday}" @click="zzdatechange">日</span>
              <span :class="{'right-label':true,'active':!zzday}" @click="zzdatechange">月</span>
            </div>
          </div>
          <ve-histogram :legend="{show:false}" :colors="['#8FC31F']" :data="chartData1" :y-axis="aYxis"
                        :x-axis="aAxis1"></ve-histogram>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VCharts from 'v-charts'
  import VeLine from 'v-charts/lib/line'
  import VeHistogram from 'v-charts/lib/histogram'
  import {XButton} from 'vux'
  export default{
    methods: {
      courseloglist(){
          window.location.href = '/Coach/CourseLogList'
      },
      salelist(){
        window.location.href = '/Coach/SaleList'
      },
      formatDate: function (data, columns, type, isQx) {
        if (isQx) {
          this.chartData = {
            columns: columns,
            rows: data
          }
        } else {
          this.chartData1 = {
            columns: columns,
            rows: data
          }
        }
        let countDay = [];
        for (let i in data) {
          if (type == 2) {
            countDay.push(data[i]['月份']);
          } else {
            countDay.push(data[i]['日期']);
          }
        }
        console.log(countDay)
        return countDay;
      },
      checkout: function () {
        window.location.href = '/Personal?nore=1';
      },
      qxchange: function () {
        this.qxsale = !(this.qxsale);
        if (this.qxsale) {
          let saleCountDay = [];
          if (this.qxday) {
            saleCountDay = this.formatDate(this.userInfo.saleamountbyday, ['日期', '销售额'], 1, true);
          } else {
            saleCountDay = this.formatDate(this.userInfo.saleamountbymonth, ['日期', '销售额'], 2, true);
          }
          this.setQxTable(saleCountDay);
        } else {
          let courseCountDay = [];
          if (this.qxday) {
            courseCountDay = this.formatDate(this.userInfo.courselogbyday, ['日期', '课耗'], 1, true);
          } else {
            courseCountDay = this.formatDate(this.userInfo.courselogbymonth, ['日期', '课耗'], 2, true);
          }
          this.setQxTable(courseCountDay);
        }
      },
      qxdatechange: function () {
        this.qxday = !(this.qxday);
        let countDay = [];
        if (this.qxday) {
          if (this.qxsale) {
            countDay = this.formatDate(this.userInfo.saleamountbyday, ['日期', '销售额'], 1, true);
            console.log(this.userInfo.saleamountbyday);
          } else {
            countDay = this.formatDate(this.userInfo.courselogbyday, ['日期', '课耗'], 1, true);
          }
        } else {
          if (this.qxsale) {
            countDay = this.formatDate(this.userInfo.saleamountbymonth, ['日期', '销售额'], 2, true);
          } else {
            countDay = this.formatDate(this.userInfo.courselogbymonth, ['日期', '课耗'], 2, true);
          }
        }
        this.setQxTable(countDay);
      },
      zzchange: function () {
        this.zzsale = !(this.zzsale);
        let countDay = [];
        if (this.zzsale) {
          if (this.zzday) {
            countDay = this.formatDate(this.userInfo.saleamountbyday, ['日期', '销售额'], 1, false);
          } else {
            countDay = this.formatDate(this.userInfo.saleamountbymonth, ['日期', '销售额'], 2, false);
          }
        } else {
          if (this.zzday) {
            countDay = this.formatDate(this.userInfo.courselogbyday, ['日期', '课耗'], 1, false);
          } else {
            countDay = this.formatDate(this.userInfo.courselogbymonth, ['日期', '课耗'], 2, false);
          }
        }
        this.setZzTable(countDay);
      },
      zzdatechange: function () {
        this.zzday = !(this.zzday);
        let countDay = [];
        if (this.zzday) {
          if (this.zzsale) {
            countDay = this.formatDate(this.userInfo.saleamountbyday, ['日期', '销售额'], 1, false);
          } else {
            countDay = this.formatDate(this.userInfo.courselogbyday, ['日期', '课耗'], 1, false);
          }
        } else {
          if (this.zzsale) {
            countDay = this.formatDate(this.userInfo.saleamountbymonth, ['日期', '销售额'], 2, false);
          } else {
            countDay = this.formatDate(this.userInfo.courselogbymonth, ['日期', '课耗'], 2, false);
          }
        }
        this.setZzTable(countDay);
      },
      setQxTable: function (saleCountDay) {
        this.aAxis = {
          data: saleCountDay,
          axisLabel: {fontSize: 30, fontWeight: 'bold', interval: 0},
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          }
        }
      },
      setZzTable: function (data) {
        this.aAxis1 = {
          data: data,
          axisLabel: {lineHeight: 10, fontSize: 30, fontWeight: 'bold', color: '#a3a3a3'},
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc'
            }
          }
        }
      }
    },
    created(){
      let self = this;
      let cid = this.$route.query.cid;
      this.$axios.get(this.ApiRoute.getinfobycoach + '?cid=' + cid, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (result.code == 200) {
          self.userInfo = result.data;
          self.chartData = {
            columns: ['日期', '销售额'],
            rows: self.userInfo.saleamountbyday
          }
          self.chartData1 = {
            columns: ['日期', '销售额'],
            rows: self.userInfo.saleamountbyday
          }
          let saleCountDay = [];
          for (let i in self.userInfo.saleamountbyday) {
            saleCountDay.unshift(self.userInfo.saleamountbyday[i]['日期']);
          }
          self.setQxTable(saleCountDay);
          self.setZzTable(saleCountDay)
          self.aYxis = {
            show: false
          },
            self.chartSettings = {
              label: {
                normal: {
                  show: true,
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#ccc'
                }
              }
            }
        } else {

        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });


    },
    data(){
      return {
        value5: 5,
        userInfo: {},
        chartData: {},
        chartData1: {},
        aAxis: {},
        aAxis1: {},
        aYxis: {},
        chartSettings: {},
        qxsale: true,
        qxday: true,
        zzsale: true,
        zzday: true
      }
    },
    components: {
      VCharts, VeLine, VeHistogram, XButton
    }
  }
</script>
<style>
  @import "../../../static/css/style.css";

  .coach_personal_container .checkoutuser {
    position: absolute;
    right: 0;
    margin: 2rem;
    border: .1rem #8FC31F solid;
    background-color: #8FC31F;
    color: #fff;
    width: 11rem;
    height: 3rem;
    border-radius: 2rem;
    text-align: center;
    line-height: 3rem;
    font-size: 1.8rem;
  }

  .coach_personal_container .left {
    float: left;
  }

  .coach_personal_container .el-icon-star-on {
    color: #8FC31F !important;
  }

  .coach_personal_container .right {
    float: right;
  }

  .coach_personal_container {
    text-align: left;
    /*padding-bottom: 4rem;*/
  }

  .coach_personal_container .coach_header {
    height: 18rem;
    border-bottom: .1rem #ccc solid;
  }

  .coach_personal_container .coach_headicon {
    width: 12rem;
    height: 12rem;
    border-radius: 12rem;
    margin: 1rem 2rem;
  }

  .coach_personal_container .coach_info {
    margin: 0 1rem;
    width: 60%;
  }

  .coach_personal_container .coach_name {
    font-size: 2rem;
    height: 1rem;
    font-weight: 700;
  }

  .coach_personal_container .coach_info .el-rate i {
    font-size: 2rem;
  }

  .coach_personal_container .coach_info .count {
    margin: 0 1rem;
    font-size: 1.8rem;
  }

  .coach_personal_container .coach_gyms select {
    width: 20rem;
    height: 2.5rem;
    border: none;
    font-size: 1.8rem;
    color: #8e8e93;
  }

  .coach_personal_container .coach_gyms select option {
    font-size: .65rem;
  }

  .coach_personal_container .coach_profile {
    margin-top: 1rem;
    height: 6rem;
    overflow: auto;
  }

  .coach_personal_container .coach_profile span {
    /*margin-right: 1.2rem;*/
    padding: .1rem 1rem;
    background: #eee;
    color: rgba(0, 0, 0, .5);
    font-size: 1.8rem;
    margin-bottom: 1rem;
    display: inline-block;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
  }

  .coach_personal_container .coach_content {
    background-color: rgb(251, 248, 249);
    height: 100%;
    margin-bottom: 10rem;
  }

  .coach_personal_container .coach_content .coach_count {
    height: 10rem;
    background-color: #8FC31F;
    width: 96%;
    margin: 0 1rem;
    border-radius: 2rem;
    text-align: center;
  }

  .coach_personal_container .coach_content .coach_count div {
    width: 33%;
    padding: 0 1rem 0 3rem;
  }

  .coach_personal_container .coach_content .coach_count div p:first-child {
    color: #fff;
  }

  .coach_personal_container .coach_content .coach_count div p {
    width: 100%;
    font-size: 2rem;
    color: #5a7216;
    margin: 1.2rem 0 .3rem 0;
  }

  .coach_personal_container .zhuzhuang {
    margin-bottom: 2rem;
  }

  .coach_personal_container .coach_content .coach_count div p span {
    font-size: 1.2rem;
  }

  .coach_personal_container .coach_charts .zhexian, .zhuzhuang {
    border: .2rem #cccccc solid;
    margin: 1rem 0 1rem 0;
    border-radius: 1rem;
  }

  .coach_personal_container .coach_charts .check {
    line-height: 5rem;
    height: 5rem;
    font-size: 1.8rem;
    width: 90%;
    margin-left: 5%;
    border-bottom: .2rem #ccc solid;
  }

  .coach_personal_container .coach_charts .check .title {
    font-size: 2rem;
    margin-right: 1.5rem;
  }

  .coach_personal_container .coach_charts .check span {
    line-height: 3rem;
    display: inline-block;
    border: .2rem #8FC31F solid;
    border-radius: .5rem;
    width: 7rem;
    height: 3rem;
    margin-top: 1rem;
    text-align: center;
    color: #8FC31F;
  }

  .coach_personal_container .coach_charts .check .right-label {
    margin-left: -0.5rem;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .coach_personal_container .coach_charts .check .left-label {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .coach_personal_container .coach_charts .check .active {
    background-color: #8FC31F;
    color: #fff;
  }
</style>
