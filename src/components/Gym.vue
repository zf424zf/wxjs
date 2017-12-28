<template>
  <div class="index main member-gym">
    <div class="gym-head">
      <div class="module-head1">
        <div class="head-left">
          <img src="../assets/卓赢健身切图_icon.地址定位.png"/>
          <router-link to="/Pop" class="city">南京市</router-link>
        </div>
        <span class="head-right">私教课</span>
      </div>
      <!--<div class="sl-line"></div>-->
      <tab>
        <tab-item @on-item-click="onItemClick">私教课</tab-item>
        <tab-item selected @on-item-click="onItemClick">私教馆</tab-item>
      </tab>
    </div>
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="coach-list-box">
      <div v-for="item in gymList" class="coach-list clearfix">
        <div class="left">
          <img :src="item.logo">
        </div>
        <div class="right" style="line-height: 60px;">
          <div @click="goDetail(item)">
            <div class="clearfix">
              <div class="coach-name">{{item.name}}</div>
            </div>
            <div class="stars">
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
            </div>
            <div class="advantage" style="line-height: 1.8rem;max-width: 650px;word-break: normal;text-align: left;">
              {{item.address}}
            </div>
          </div>

        </div>
        <div class="coach-pic">
          <img class="previewer-demo-img" v-for="(item,index) in item.imgs" :src="item" width="200"
               @click="show(index)" v-if="index < 4">
          <div v-transfer-dom>
            <previewer :list="item.imgArr" ref="previewer" :options="options"></previewer>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center" style="padding: 2rem 5rem 8rem; color: #fff;font-size: 1.8rem">没有更多数据了，亲</div>
  </div>
</template>

<script>
  import FilterBar from 'vue-filter-bar'
  import {Previewer, TransferDom, Tab, TabItem} from 'vux'
  //  import barMenus from '@/data';
  export default {
    name: 'app',
    created(){
      let self = this;
      this.$axios.get(this.ApiRoute.getsporthall, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.gymList = result.data;
          for (let x in self.gymList) {
            let item = self.gymList[x];
            let imgArr = [];
            for (let y in item.imgs) {
              let image = item.imgs[y];
              imgArr.push({src: image})
            }
            item['imgArr'] = imgArr;
          }
        } else {
        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });
    },
    data() {
      return {
        gymList: [],
        list: [],
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }, showCity: false
      }

    },
    methods: {
      goDetail(item){
//          this.$router.push({path: '/GymInfo?id='+item.id})
        window.location.href = '/GymInfo?id=' + item.id
      },
      onItemClick (index) {
//        this.$router.push({path: '/CoachList'})
        window.location.href = '/CoachList'
      },
      handleShowDialog(v) {
        // console.log(v);
      },
      handleCloseDialog(v) {
        // console.log(v);
      },
      handleChangeTab(v) {
        // console.log(v);
      },
      handleChangeMainItem(v) {
        // console.log(v)
      },
      changeData(v) {
        console.log(v);
      },
      show (index) {
        this.$refs.previewer[index].show(index)
      }
    },
    components: {
      'filter-bar': FilterBar,
      Previewer, Tab, TabItem
    },
    directives: {
      TransferDom
    },
  }
</script>
<style>
  .member-gym {
    background: url("../../static/images/卓赢健身切图2_BG-3.png") repeat fixed;
    min-height: 84rem;
  }

  .member-gym .gym-head {
    background: url(../../static/images/卓赢健身切图2_BG-3.png) repeat fixed;
    height: 12rem;
    position: fixed;
    float: left;
    z-index: 1500;
    width: 100%;
  }

  .member-gym .coach-list-box {
    opacity: 0.8;
    background-color: #fff;
    position: relative;
    padding-top: 13rem;
  }

  .member-gym .module-head1 {
    height: 150px;
    text-align: center;
    color: #fff;
    font-size: 2rem;
    z-index: 1499;
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #DBDCDE
  }

  .member-gym .vux-tab {
    height: 5rem !important;
    position: fixed !important;
    z-index: 1499;
    width: 100%;
    top: 150px;
    background-color: inherit;
  }

  .member-gym .clearfix, .member-gym .stars, .member-gym .advantage {
    margin-left: 20px;
  }

  .member-gym .vux-tab .vux-tab-item {
    line-height: 5rem !important;
    font-size: 2rem !important;
    color: #fff;
  }

  .member-gym .vux-tab .vux-tab-item.vux-tab-selected {
    color: #ea5826 !important;
    border-bottom: 3px solid #ea5826 !important;
  }

  .member-gym .vux-tab-ink-bar {
    background: none !important;
  }

  .member-gym .filterbarpop-wrap .filterbarpop .main .item-operation {
    width: 200px;
    height: 80px !important;
    margin: 25px;
    line-height: 55px !important;
    text-align: center !important;
  }

  .member-gym .pswp {
    z-index: 99999 !important;
  }

  .member-gym .filterbarpop-wrap .filterbarpop .main .filter-btns a {
    line-height: 95px !important;
  }

  .member-gym .filterbarpop-wrap .filterbarpop .main {
    height: 370px !important;
  }

  .member-gym .filterbarpop-wrap .filterbarpop .main .filter-btns {
    height: 100px !important;
  }

  .member-gym .head-left {
    float: left;
    margin: 58px;
  }

  .member-gym .head-left a {
    text-decoration: none;
    color: #fff;
  }

  .member-gym .filterbar .container .row .selected {
    color: #ea5826 !important;
  }

  .member-gym .filterbar .container {
    outline: none !important;
  }

  .member-gym .filter-btns {
    text-align: center !important;
    line-height: 95px;
  }

  .member-gym .head-right {
    float: right;
    margin: 60px;
  }

  .index {
    padding-bottom: 4.5rem;
  }

  .main {
    /*background: #fff;*/
  }

  .member-gym .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }

  .member-gym .clearfix {
  }

  .member-gym .text-center {
    text-align: center;
  }

  .member-gym .text-left {
    text-align: left;
  }

  .member-gym .search-box {
    font-size: 1.4rem;
    font-family: PingFangSC-Semibold;
  }

  .member-gym .search-box > div {
    width: 33%;
    float: left;
    height: 3.9rem;
    line-height: 3.9rem;
  }

  .member-gym .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .member-gym .search-box > div > span {
    display: inline-block;
    padding-right: 1rem;
    max-width: 100%;
    background-image: url(https://cdn.leoao.com/leoao-coach-mdown12.png);
    background-repeat: no-repeat;
    background-size: .7rem;
    background-position: 100%;
  }

  .member-gym .search-box > div > span {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .member-gym .text-center {
    text-align: center;
  }

  .member-gym .coach-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .member-gym .left, .member-gym .right {
    width: 50%;
    height: 100%;
    float: left;
  }

  .member-gym .coach-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .member-gym .coach-list .right {
    width: 77%;
  }

  .member-gym .coach-list .left img {
    width: 9rem;
    height: 9rem;
    border-radius: 10%;
    -webkit-border-radius: 10%;
    -moz-border-radius: 50%;
  }

  .member-gym .stars span {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.8rem;
    width: 1.8rem;
    height: 1.8rem;
  }

  .member-gym .stars span, .tap {
    display: inline-block;
  }

  .member-gym .stars, .lable {
    text-align: left;
    margin: 1rem 1rem 0;
  }

  .member-gym .coach-list .right .coach-name {
    width: 60%;
    float: left;
    font-size: 2rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: left;
  }

  .member-gym .coach-list .right .price {
    width: 40%;
    float: left;
    line-height: 2.4rem;
  }

  .member-gym .text-right {
    text-align: right;
  }

  .member-gym .price {
    color: #ea5826;
  }

  .member-gym .price span:first-of-type {
    font-size: 1.1rem;
    margin-right: -5px;
  }

  .member-gym .price span:nth-of-type(2) {
    font-size: 1.6rem;
  }

  .member-gym .price span:nth-of-type(3) {
    font-size: 1.1rem;
  }

  .member-gym .coach-list .right .lable {
    padding-bottom: 1rem;
    font-size: 1.2rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .member-gym .coach-list .right .lable span {
    margin-top: .5rem;
  }

  .member-gym .coach-list .right .advantage {
    padding-bottom: 1rem;
    font-size: 1.8rem;
    text-align: left;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .member-gym .coach-list-box {
    background-color: #fff;
    opacity: 0.8;
  }

  .member-gym .coach-list .right .advantage, .coach-list .right .coach-name {
    word-break: keep-all;
    /*overflow: hidden;*/
    text-overflow: ellipsis;
  }

  .member-gym .coach-list .left .certificate {
    padding-top: .5rem;
  }

  .member-gym .coach-list .left .certificate .tap {
    margin-top: .5rem;
    margin-right: 1rem;
  }

  .member-gym .tap {
    margin-right: 1.2rem;
    padding: .1rem .4rem;
    background: #eee;
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    color: rgba(0, 0, 0, .5);
    font-size: 1.2rem;
    letter-spacing: -.02rem;
  }

  .member-gym .coach-pic {
    text-align: left;
    width: 100%;
    float: left;
    margin-top: 1rem;
  }

  .member-gym .coach-list .right .coach-pic ul {

  }

  .member-gym .coach-list .right .coach-pic ul li {
    width: 25%;
    text-align: center;
    float: left;
  }

  .member-gym .coach-list .right .coach-pic ul li img {
    width: 8rem;
    height: 8rem;
  }

  .member-gym .filterbar {
    z-index: 9999;
    font-size: 32px;
  }

  .member-gym .row {
    height: 90px !important;
  }

  .member-gym .row .col {
    line-height: 90px;
  }

  .member-gym .tab-bar {
    height: 60px !important;
  }

  .member-gym .filterbarpop-wrap .filterbarpop .tab-bar a {
    line-height: 60px !important;
  }

  .member-gym .filterbarpop-wrap .filterbarpop .main .item {
    height: 60px !important;
    line-height: 60px !important;
  }

  .member-gym .filterbarpop-wrap .filterbarpop .tab-bar .selected {
    border-bottom: 2px solid #ea5826 !important;
  }

  .member-gym .filterbarpop-wrap .filterbarpop .main .line-style .item.selected {
    color: #ea5826 !important;
    border-color: #ea5826 !important;
  }

  .member-gym .coach-pic img {
    margin-left: 1rem;
    height: 10rem;
    width: 10rem;
  }
</style>
