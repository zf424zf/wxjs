<template>
  <div class="yueke container">
    <div class="module-head">
      <!--<div class="head-left" @click="showCity == true">-->
      <div class="head-left">
        <img src="../assets/卓赢健身切图_icon.地址定位.png"/>
        <router-link to="/Pop" class="city">南京市</router-link>
      </div>
      <span class="head-right">私教课</span>
    </div>
    <div class="sl-line"></div>
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="course-list-box"
         style="margin-top: 150px;padding-bottom: 8rem">
      <div v-for="(item,index) in lists" class="course-list clearfix">
        <div class="left">
          <img :src="item['headimg']">
          <div class="coach-name">{{item['coach']}}</div>
        </div>
        <div class="right">
          <div class="clearfix">
            <div class="course-name"  >{{item['course']}}</div>
            <div :class="[{'yk-finish':item['currenthours'] == item['totalhours']},'course-status' , 'text-right']">
              <!--<span class="hourglass"></span>-->
              <span class="num">{{item['currenthours']}}/{{item['totalhours']}}</span>
              <span class="status" v-if="item['isordercourse'] ==2">可续课</span>
              <span class="status" v-if="item['isordercourse'] ==0 ">可约课</span>
              <span class="status" v-if="item['isordercourse'] ==1 ">已约课</span>
              <span class="status" style="display:none;">教练指派中</span>
            </div>
          </div>
          <div class="clearfix">
            <div class="venue-name">
              <span class="tap">{{item['sporthall']}}</span>
            </div>
            <div class="log">
              <!--<span class="btn-log"></span>-->
              <span class="alarm" v-if="item.shownoclass == 1" style="font-size: 1.8rem">7天未上课</span>
            </div>
          </div>
          <div class="address" @click="getMap(item['latitude'],item['longitude'],item['sporthall'])">
            {{item['address']}}
            <img src="../assets/卓赢健身切图_icon.地址定位.png"/>
          </div>
          <div class="btn-box clearfix">
            <div class="btn-right" @click="telCoach(item['phone'])">联系教练</div>
            <div v-if="item['isordercourse'] == 1" class="btn-left" @click="yiyueke()">已约课</div>
            <div v-if="item['isordercourse'] == 0" class="btn-left" @click="yueke(item['id'],item)">约课</div>
            <div v-if="item['isordercourse'] == 2" class="btn-left xuke" @click="xuke(item['cid'])">续课
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top:18rem" v-if="lists.length <= 0">
        <span style="font-size: 2rem">暂无课程,快去购买吧</span>
        <x-button plain type="primary" link="/CoachList" class="custom-primary-red"
                  style="margin-top:2rem;color: #76a52b;border-color:#8bc53f;width: 20rem;height: 6rem;font-size: 2.5rem;border-radius: 1rem;line-height: 6rem">
          购买
        </x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {TransferDom, Tab, TabItem, XButton} from 'vux'
  export default {
    data () {
      return {
        lists: [],
        showYueke:true
      }
    },
    created(){

      let self = this;
      this.$axios.get(this.ApiRoute.getusercourse, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.lists = result.data;
          for(let list in self.lists){
              let item = self.lists[list];
              if(item.isexperience == 0){
                  self.lists[list].showYueke = false;
              }else{
                self.lists[list].showYueke = true;
                if(self.isordercourse == 0){
                  self.showYueke = false;
                }
              }
          }
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
      XButton
    },
    directives: {
      TransferDom
    },
    methods: {
      yiyueke(){
        window.location.href = '/NotOverClass';
      },
      yueke(oid,item) {
          if(!item.showYueke && this.showYueke == false){
              alert('请先预约体验课');
              return false;
          }
//        this.$router.push({path: '/ChooseClass?oid=' + oid})
        window.location.href = '/ChooseClass?oid=' + oid;
      },
      xuke(cid){
//        this.$router.push({path: '/ConfirmOrder?id=' + cid})
        window.location.href = '/ConfirmOrder?id=' + cid;
        //todo
      },
      telCoach(tel){
        window.location.href = 'tel://' + tel
      },
      getMap: function (latitude, longitude, name) {
//        this.$router.push({path: '/Map?lat=' + latitude + '&lng=' + longitude + '&name=' + name})
        window.location.href = '/Map?lat=' + latitude + '&lng=' + longitude + '&name=' + name;
      },
    }
  }
</script>
<style>
  .yueke .module-head {
    background-color: #fdfdfd;
    height: 150px;
    text-align: center;
    color: darkgrey;
    font-size: 2rem;
    z-index: 1499;
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #DBDCDE;
  }

  .yueke .head-left {
    float: left;
    margin: 58px;
  }

  .yueke .dingwei {
    position: absolute;
    font-size: 26px !important;
    margin-left: 5px;
  }

  .yueke .head-left a {
    text-decoration: none;
  }

  .yueke .head-right {
    float: right;
    margin: 60px;
  }

  .yueke .vux-tab {
    height: 80px !important;
    position: fixed !important;
    z-index: 9999;
    width: 100%;
    top: 150px;
  }

  .yueke .vux-tab .vux-tab-item {
    line-height: 80px !important;
    font-size: 26px !important;
  }

  .yueke .vux-tab .vux-tab-item.vux-tab-selected {
    color: #ea5826 !important;
    border-bottom: 3px solid #ea5826 !important;
  }

  .yueke .vux-tab-ink-bar {
    background: #ea5826 !important;
  }

  .yueke .index {
    margin-top: 7.5rem;
    padding-bottom: 4.5rem;
  }

  .yueke .main {
    background: #fff;
  }

  .yueke .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }

  .yueke .clearfix {
  }

  .yueke .text-center {
    text-align: center;
  }

  .yueke .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .yueke .text-center {
    text-align: center;
  }

  .yueke .course-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .yueke .left, .yueke .right {
    width: 50%;
    height: 100%;
    float: left;
    text-align: left;
  }

  .yueke .course-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .yueke .course-list .right {
    width: 77%;
  }

  .yueke .course-list .left img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .yueke .course-list .left .coach-name {
    width: 80%;
    float: left;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: center;
  }

  .yueke .tap {
    display: inline-block;
  }

  .yueke .course-list .right .course-name {
    width: 60%;
    float: left;
    font-size: 2.5rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
  }

  .yueke .course-list .right .course-status {
    width: 40%;
    float: left;
    line-height: 2.4rem;
  }

  .yueke .text-right {
    text-align: right;
  }

  .yueke .course-status {
    color: #2BB673;
  }

  .yueke .course-status .hourglass {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .yueke .course-status .num {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .yueke .course-status .status {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .yueke .course-list .right .venue-name {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
    float: left;
  }

  .yueke .course-list .right .log {
    float: right;
    padding: .5rem;
  }

  .yueke .course-list .right .log .alarm {
    float: right;
    margin-right: 0.5rem;
    color: #f00b0d;
  }

  .yueke .course-list .right .log .btn-log {
    float: right;
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .yueke .course-list .right .venue-name span {
    margin-top: .5rem;
  }

  .yueke .course-list .right .course-name {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .yueke .course-list .right .address {
    padding-bottom: 1rem;
    float: left;
    font-size: 1.8rem;
    width: 100%;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .yueke .tap {
    margin-right: .2rem;
    padding: .1rem .4rem;
    background: #eee;
    border-radius: .3rem;
    -webkit-border-radius: .3rem;
    -moz-border-radius: .3rem;
    color: rgba(0, 0, 0, .5);
    letter-spacing: -.02rem;
  }

  .yueke .course-list .right .btn-box {
    padding-top: 1rem;
    background: #fff;
    border-top: 1px solid #f2f2f2;
  }

  .yueke .course-list .right .btn-box .btn-left, .course-list .right .btn-box .btn-right {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.8rem;
    font-family: PingFangSC-Medium;
    height: 100%;
    float: right;
  }

  .yueke .course-list .right .btn-box .btn-right {
    width: 30%;
    border: 1px solid #8bc53f;
    color: #76a52b;
    border-radius: .3rem;
  }

  .yueke .course-list .right .btn-box .btn-left {
    width: 30%;
    margin-right: 2%;
    background: #8bc53f;
    color: #fff;
    border-radius: .3rem;
  }

  .yueke .xuke {
    border: 1px solid #ea5826 !important;
    background: #fff !important;
    color: #ea5826 !important;
  }

  .yueke .yk-finish {
    color: rgb(142, 142, 147);
  }
</style>
