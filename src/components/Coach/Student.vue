<template>
  <div class="coach-student container">
    <div class="student-tab sl-line">
      <ul class="order-status clear">
        <li class="active" @click="goStudent">学员信息</li>
        <li @click="goKehao">学员课耗</li>
      </ul>
    </div>
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="course-list-box"
         style="margin-top:5rem">
      <div v-if="!!lists.length">
        <div class="course-list clearfix" v-for="item in lists">
          <div class="left">
            <img :src="item.headimg">
            <div class="coach-name">{{item.username}}</div>
          </div>
          <div class="right">
            <div class="clearfix">
              <div class="course-name">{{item.course}}</div>
              <div class="yk-finish course-status text-right">
                <!--<span class="hourglass"></span>-->
                <span class="num">{{item.currenthours == null ? 0 : item.currenthours}}/{{item.totalhours}}</span>
                <span class="status" v-if="item.status == 1">可约课</span>
                <span class="status" style="display:none;">教练指派中</span>
              </div>
            </div>
            <div class="clearfix">
              <div class="venue-name">
                <span class="tap">{{item.sporthall}}</span>
              </div>
              <div class="log">
                <!--<span class="btn-log"></span>-->
                <span class="alarm" v-if="item.shownoclass == 1">7天未上课</span>
              </div>
            </div>
            <div class="address">
              {{item.address}}
              <img src="../../assets/卓赢健身切图_icon.地址定位.png"/>
            </div>
            <div class="btn-box clearfix">
              <div class="btn-right" @click="telCoach(item.phone  )">联系Ta</div>
              <div hidden class="btn-left" @click="yueke(1)">替Ta约课</div>
            </div>
          </div>
        </div>
        <div id="loadMore" v-show="loadMore">正在加载</div>
        <div id="loadMoreing" v-show="loadMoreing">正在加载</div>
        <div id="noMoreData" v-show="loadMore?false:!loadMoreing">已显示全部任务</div>
      </div>
      <div v-else class="text-center" style="padding: 2rem 5rem; color: rgba(0, 0, 0, 0.3);">没有更多数据了，亲</div>
    </div>
  </div>
</template>
<script>
  import {TransferDom, Tab, TabItem} from 'vux'
  export default {
    data () {
      return {
        lists: {},
        loadMore: true,
        loadMoreing: true,
        pageid: 0
      }
    },
    mounted  () {
      window.addEventListener('scroll', this.handleScroll);
    },
    created(){
      let self = this;
      this.$axios.get(this.ApiRoute.getstudent, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (result.code == 200) {
          let data = result.data;
          self.lists = data;
          if (data.length < 10) {
            self.loadMore = false;
            self.loadMoreing = false;
          }
        } else {

        }
      }).catch(function (response) {
        // 这里是处理错误的回调
      });
    },
    components: {},
    directives: {
      TransferDom
    },
    methods: {
      handleScroll () {
        if (this.loadMore == true && !!document.getElementById("loadMore")) {
          let bodyWidth = document.body.offsetWidth;
          let bodyHeight = window.innerHeight * (375 / bodyWidth);
          let loadMoreTop = document.getElementById("loadMore").getBoundingClientRect().top * (375 / bodyWidth);
          if (bodyHeight - loadMoreTop > 20) {//loadMore被拉出底部20px时
            // console.log("bodyHeight",bodyHeight,"loadMoreTop",loadMoreTop,"差值",bodyHeight-loadMoreTop,"页码",this.dataCurPage+1);
            this.loadMore = false;//停止运行scrollRun，否则会触发加载所有页面
            this.getData(++this.pageid);
          }
        }
      },
      getData(pageid){
        this.loadMoreing = true;
        let self = this;
        this.$axios.get(this.ApiRoute.getstudent + '?pageid=' + pageid, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (result.code == 200) {
            let data = result.data;
            if (data != null) {
              if (data.length > 0) {
                data.forEach(function (ele, i) {
                  self.lists.push(ele);// 填充页面数据
                })
                self.loadMore = true;// 显示正在加载(在屏幕底部以外)
              } else {
                self.loadMore = false;
              }
              if (result.count == self.pageid) {
                self.loadMore = false;
                self.loadMoreing = false;
              }
            }
          } else {

          }
        }).catch(function (response) {
          // 这里是处理错误的回调
        });
      },
      goKehao: function () {
//        this.$router.push({path:'/Coach/ClassConsume'})
        window.location.href = '/Coach/ClassConsume';
      },
      goStudent: function () {
//        this.$router.push({path:'/Coach/Student'})
        window.location.href = '/Coach/Student';
      },
      yueke(oid) {
//        this.$router.push({path: '/ChooseClass?oid=' + oid})
        window.location.href = '/ChooseClass?oid=' + oid;
      },
      xuke(id){
//        this.$router.push({path: '/ChooseClass?oid=2'})
        window.location.href = '/ChooseClass?oid=2';
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
  @import "../../../static/css/style.css";

  .coach-student {
    padding-bottom: 4.5rem;
  }

  .coach-student .module-head {
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

  .coach-student .head-left {
    float: left;
    margin: 40px;
  }
  .coach-student .order-status{
    z-index: 999;
    position: fixed;
    background: #fff;
    width: 100%;
  }
  .coach-student .dingwei {
    position: absolute;
    font-size: 26px !important;
    margin-left: 5px;
  }

  .coach-student .head-left a {
    text-decoration: none;
  }

  .coach-student .head-right {
    float: right;
    margin: 60px;
  }

  .coach-student .vux-tab {
    height: 80px !important;
    position: fixed !important;
    z-index: 9999;
    width: 100%;
    top: 150px;
  }

  .coach-student .vux-tab .vux-tab-item {
    line-height: 80px !important;
    font-size: 26px !important;
  }

  .coach-student .vux-tab .vux-tab-item.vux-tab-selected {
    color: #ea5826 !important;
    border-bottom: 3px solid #ea5826 !important;
  }

  .coach-student .vux-tab-ink-bar {
    background: #ea5826 !important;
  }

  .coach-student .index {
    margin-top: 7.5rem;
    padding-bottom: 4.5rem;
  }

  .coach-student .main {
    background: #fff;
  }

  .coach-student .sl-line {
    height: 1px;
    background: #f2f2f2;
  }

  .coach-student .clearfix {
  }

  .coach-student .text-center {
    text-align: center;
  }

  .coach-student .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .coach-student .text-center {
    text-align: center;
  }

  .coach-student .course-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .coach-student .left, .coach-student .right {
    width: 50%;
    height: 100%;
    float: left;
    text-align: left;
  }

  .coach-student .course-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .coach-student .course-list .right {
    width: 77%;
  }

  .coach-student .course-list .left img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .coach-student .course-list .left .coach-name {
    width: 80%;
    float: left;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: center;
  }

  .coach-student .tap {
    display: inline-block;
  }

  .coach-student .course-list .right .course-name {
    width: 60%;
    float: left;
    font-size: 2rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
  }

  .coach-student .course-list .right .course-status {
    width: 40%;
    float: left;
    line-height: 2.4rem;
  }

  .coach-student .text-right {
    text-align: right;
  }

  .coach-student .course-status {
    color: #2BB673;
  }

  .coach-student .course-status .hourglass {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .coach-student .course-status .num {
    font-size: 1.6rem;
    margin-left: .5rem;
  }

  .coach-student .course-status .status {
    font-size: 1.8rem;
    margin-left: .5rem;
  }

  .ready {

  }

  .normal {

  }

  .final {

  }

  .coach-student .course-list .right .venue-name {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
    float: left;
  }

  .coach-student .course-list .right .log {
    float: right;
    padding: .5rem;
  }

  .coach-student .course-list .right .log .alarm {
    float: right;
    margin-right: 0.5rem;
    color: #f00b0d;
    font-size: 1.8rem;
  }

  .coach-student .course-list .right .log .btn-log {
    float: right;
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-block;
  }

  .coach-student .course-list .right .venue-name span {
    margin-top: .5rem;
  }

  .coach-student .course-list .right .course-name {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .coach-student .course-list .right .address {
    padding-bottom: 1rem;
    float: left;
    font-size: 1.8rem;
    width: 100%;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .coach-student .tap {
    margin-right: .2rem;
    padding: .1rem .4rem;
    background: #eee;
    border-radius: .3rem;
    -webkit-border-radius: .3rem;
    -moz-border-radius: .3rem;
    color: rgba(0, 0, 0, .5);
    letter-spacing: -.02rem;
  }

  .coach-student .course-list .right .btn-box {
    padding-top: 1rem;
    background: #fff;
    border-top: 1px solid #f2f2f2;
  }

  .coach-student .course-list .right .btn-box .btn-left, .coach-student .course-list .right .btn-box .btn-right {
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.8rem;
    font-family: PingFangSC-Medium;
    height: 100%;
    float: right;
  }

  .coach-student .course-list .right .btn-box .btn-right {
    width: 30%;
    border: 1px solid #8FC31F;
    color: #8BAA1D;
    border-radius: .3rem;
  }

  .coach-student .course-list .right .btn-box .btn-left {
    width: 30%;
    margin-right: 2%;
    background: #8FC31F;
    color: #fff;
    border-radius: .3rem;
  }

  .coach-student .xuke {
    border: 1px solid #ea5826 !important;
    background: #fff !important;
    color: #ea5826 !important;
  }

  .coach-student .yk-finish {
    color: rgb(142, 142, 147);
  }

  .coach-student .student-tab .order-status > li {
    float: left;
    width: 50%;
    padding: .8rem 0;
    text-align: center;
    color: #8C8C8C;
    font-size: 2rem;
  }

  .coach-student .student-tab .order-status > li.active {
    color: #8FC31F;
    border-bottom: 5px solid #8FC31F;
  }
</style>
