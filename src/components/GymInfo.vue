<template>
  <div class="index main gymInfo">
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="coach-list-box">
      <div class="coach-list clearfix">
        <div class="right" style="line-height: 60px;width: 100%">
          <div class="clearfix">
            <div class="coach-name">{{sportHall.name}}</div>
          </div>
          <div style="margin-top: 1rem;width: 100%;height: 4rem;">
            <div class="stars" style="float: left">
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
              <span class="" style="margin-right:20px"></span>
            </div>
            <span style="font-size: 1.8rem;text-align: left;float: left">{{evaluate.length}}条</span>
            <!--<span style="float:right;color: #ea5826;font-size: 1.8rem">-->
            <!--全部图片-->
            <!--</span>-->
          </div>
          <div class="coach-pic clearfix">
            <img class="previewer-demo-img" v-for="(item, index) in sportHall.imgs" :src="item" width="200"
                 @click="show1(0,index)" v-if="index < 4">
            <div v-transfer-dom>
              <previewer :list="sportHall.imgArr" ref="previewer1" :options="options"></previewer>
            </div>
          </div>
          <group>
            <img style="float: left;margin: 2.3rem 1rem;width: 2rem" src="../assets/卓赢健身切图_icon.地址定位.png">
            <cell
              :link="'/Map?lat='+sportHall.latitude+'&lng='+sportHall.longitude+'&name='+sportHall.name"
              :title="sportHall.address"
              :is-link="true"
              :border-intent="false"
              :arrow-direction=" 'left'"
              style="text-align: left;font-size: 1.8rem;margin-left: 8%;margin-top: 0"></cell>
          </group>
          <group>
            <img style="float: left;margin: 2.3rem 1rem;width: 2rem" src="../assets/卓赢健身切图_icon.电话.png">
            <cell
              :title="sportHall.phone"
              :border-intent="false"
              :arrow-direction=" 'left'"
              style="text-align: left;font-size: 1.8rem;margin-left: 8%"></cell>
          </group>
        </div>
      </div>
      <div class="clearfix " style="margin-top: 1px">
        <div
          style="background-color: #ea5826;height: 60px;line-height: 60px;font-size: 1.8rem;color: #e8e8e8;text-align: left;">
          <span style="margin-left: 1rem;font-size: 1.8rem">馆内教练</span>
          <span style="float: right;margin-right: 1rem" @click="goToJL">更多</span>
        </div>
        <div v-for="(coach,index) in coachInfo" class="coach-list clearfix">
          <div class="left">
            <img :src="coach.headimg">
            <div class="certificate">
              <span class="tap">99项专业认证</span>
            </div>
          </div>
          <div class="right">
            <div class="clearfix">
              <div class="coach-name">{{coach.name}}</div>
              <div class="price text-right">
                <span>￥</span>
                <span>{{coach.lowprice}}</span>
                <span>/课时起</span>
              </div>
            </div>
            <div class="stars">
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
            </div>
            <div class="lable">
              <span class="tap" v-for="(label,index) in coach.label">{{label}}</span>
            </div>
            <div class="advantage">
              <p style="float: left;margin-right: 1rem" v-for="skill in coach.skill">{{skill}}</p>
            </div>
          </div>
          <div class="coach-pic" style="margin-top: 2rem">
            <img class="previewer-demo-img" v-for="(item1, cindex) in coach.imgs" :src="item1" width="150"
                 @click="show2(index,cindex)" v-if="cindex < 4">
            <div v-transfer-dom>
              <previewer :list="coach.coachImgArr" ref="previewer2" :options="options"></previewer>
            </div>
          </div>
        </div>
        <div v-if="coachInfo.length < 1" class="text-center" style="padding: 2rem 5rem; color: #ea5826;">暂无数据</div>
      </div>
      <div class="clearfix " style="margin-top: 1px">
        <div
          style="background-color: #ea5826;height: 60px;line-height: 60px;font-size: 2rem;color: #e8e8e8;text-align: left;">
          <span style="margin-left: 1rem">会员评价 {{evaluate.length}}条</span>
          <!--<span style="margin-left: 65%">更多</span>-->
        </div>
        <div v-if="evaluate.length > 0" v-for="(item,index) in evaluate" class="coach-list clearfix">
          <div class="left">
            <img style="border-radius: 10%;-webkit-border-radius: 50%;"
                 :src="item.headimg">
          </div>
          <div class="right" @click="gotoinfo(item.id)" style="line-height: 40px">
            <div class="clearfix">
              <div class="coach-name">{{item.name}}</div>
              <div class="price timef text-right">
                <span>{{item.addtime}}</span>
              </div>
            </div>
            <div class="stars">
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
              <span class=""></span>
            </div>
            <div class="advantage">
              {{item.content}}
            </div>
          </div>
          <div class="coach-pic" style="width: 100%;float: left;margin-top: 2rem">
            <img class="previewer-demo-img" v-for="(list, pjindex) in item.imgs" :src="list" width="150"
                 @click="show3(index,pjindex)" v-if="pjindex < 4">
            <div v-transfer-dom>
              <previewer :list="item.imgArr" ref="previewer3" :options="options"></previewer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="evaluate.length < 1" class="text-center" style="font-size: 1.8rem;padding: 2rem 5rem; color: #ea5826;">
      暂无数据
    </div>
    <div v-if="evaluate.length > 5" class="text-center" style="font-size: 1.8rem;padding: 2rem 5rem; color: #ea5826;">
      点击查看更多
    </div>
  </div>
</template>
<script>
  import {Previewer, TransferDom, Cell} from 'vux'
  import Group from "../../node_modules/vux/src/components/group/index";
  export default {
    name: 'app',
    data() {
      return {
        coachInfo: [],
        sportHall: [],
        evaluate: [],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    methods: {
      gotoinfo(id){
        window.location.href = '/CoachInfo?id=' + id;
      },
      show1 (index, flag) {
        this.$refs.previewer1.show(flag)
      },
      show2 (index, flag) {
        this.$refs.previewer2[index].show(flag)
      }, show3 (index, flag) {
        console.log(this.$refs.previewer3);
        this.$refs.previewer3[index].show(flag)
      },
      goToJL () {
        window.location.href = '/CoachList';
//        this.$router.push({path: '/CoachList'})
      }
    },
    created(){
      let id = this.$route.query.id;
      let self = this;
      this.$axios.get(this.ApiRoute.getsporthalldetail + '?id=' + id, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;

        if (200 == result.code) {
          if (result.data.coach != null) {
            self.coachInfo = result.data.coach;
          }
          for (let x in self.coachInfo) {
            let coachArr = [];
            let coach = self.coachInfo[x];
            let image = coach.imgs;
            for (let y in image) {
              coachArr.push({src: image[y]});
            }
            self.coachInfo[x].coachImgArr = coachArr;
          }
          if (result.data.sporthall != null) {
            self.sportHall = result.data.sporthall;

          }
          let shImgArr = [];
          for (let y in self.sportHall.imgs) {
            shImgArr.push({src: self.sportHall.imgs[y]});
          }
          self.sportHall.imgArr = shImgArr;
          if (result.data.evaluate != null) {
            self.evaluate = result.data.evaluate;
          }
          self.evaluate = result.data.evaluate;
          for (let z in self.evaluate) {
            let eArr = [];
            let e = self.evaluate[z];
            let image = e.imgs;
            for (let i in image) {
              eArr.push({src: image[i]});
            }
            self.evaluate[z].imgArr = eArr;
          }
        } else {
        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });

    },
    method: {},
    components: {
      Group,
      Previewer,
      Cell
    },
    directives: {
      TransferDom
    },
  }
</script>
<style>
  .gymInfo .clearfix, .gymInfo .stars, .gymInfo .advantage {
    /*margin-left: 20px;*/
  }

  .gymInfo .vux-tab .vux-tab-item {
    line-height: 80px !important;
    font-size: 26px !important;
  }

  .gymInfo .vux-tab .vux-tab-item.vux-tab-selected {
    color: #ea5826 !important;
    border-bottom: 3px solid #ea5826 !important;
  }

  .gymInfo .filterbarpop-wrap .filterbarpop .main .item-operation {
    width: 200px;
    height: 80px !important;
    margin: 25px;
    line-height: 55px !important;
    text-align: center !important;
  }

  .gymInfo .pswp {
    z-index: 99999 !important;
  }

  .gymInfo .filterbarpop-wrap .filterbarpop .main .filter-btns a {
    line-height: 95px !important;
  }

  .gymInfo .filterbarpop-wrap .filterbarpop .main {
    height: 370px !important;
  }

  .gymInfo .filterbarpop-wrap .filterbarpop .main .filter-btns {
    height: 100px !important;
  }

  .gymInfo .head-left a {
    text-decoration: none;
  }

  .gymInfo .filterbar .container .row .selected {
    color: #ea5826 !important;
  }

  .gymInfo .filterbar .container {
    outline: none !important;
  }

  .index {
    padding-bottom: 4.5rem;
  }

  .gymInfo .main {
    background: #fff;
  }

  .gymInfo .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }

  .gymInfo .clearfix {
  }

  .gymInfo .text-center {
    text-align: center;
  }

  .gymInfo .text-left {
    text-align: left;
  }

  .gymInfo .search-box {
    font-size: 1.4rem;
    font-family: PingFangSC-Semibold;
  }

  .gymInfo .search-box > div {
    width: 33%;
    float: left;
    height: 3.9rem;
    line-height: 3.9rem;
  }

  .gymInfo .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .gymInfo .search-box > div > span {
    display: inline-block;
    padding-right: 1rem;
    max-width: 100%;
    background-image: url(https://cdn.leoao.com/leoao-coach-mdown12.png);
    background-repeat: no-repeat;
    background-size: .7rem;
    background-position: 100%;
  }

  .gymInfo .search-box > div > span {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .gymInfo .text-center {
    text-align: center;
  }

  .gymInfo .coach-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem 4rem;
    border-bottom: .1rem solid #ccc;
  }

  .gymInfo .left, .gymInfo .right {
    width: 50%;
    height: 100%;
    float: left;
  }

  .gymInfo .coach-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .gymInfo .coach-list .right {
    width: 77%;
  }

  .gymInfo .coach-list .left img {
    width: 9rem;
    height: 9rem;
    border-radius: 10%;
    -webkit-border-radius: 10%;
    -moz-border-radius: 50%;
  }

  .gymInfo .stars span {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.8rem;
    width: 1.8rem;
    height: 1.8rem;
  }

  .gymInfo .stars span, .tap {
    display: inline-block;
  }

  .gymInfo .stars, .gymInfo .lable {
    text-align: left;
  }

  .gymInfo .coach-list .right .coach-name {
    width: 50%;
    float: left;
    font-size: 2.5rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: left;
  }

  .gymInfo .coach-list .right .price {
    float: right;
    line-height: 2.4rem;
  }

  .gymInfo .text-right {
    text-align: right;
  }

  .gymInfo .price {
    color: #ea5826;
  }

  .gymInfo .time {
    color: #848484;
  }

  .gymInfo .price span:first-of-type {
    font-size: 1.8rem;
    margin-right: -5px;
  }

  .gymInfo .price span:nth-of-type(2) {
    font-size: 2.5rem;
  }

  .gymInfo .price span:nth-of-type(3) {
    font-size: 1.8rem;
  }

  .gymInfo .coach-list .right .lable {
    font-size: 1.2rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .gymInfo .coach-list .right .lable span {
    margin-top: .5rem;
  }

  .gymInfo .coach-list .right .advantage {
    font-size: 1.8rem;
    text-align: left;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
    margin-bottom: 1rem;
  }

  .gymInfo .advantage p {
    margin: 0;
  }

  .gymInfo .coach-list .right .advantage, .gymInfo .coach-list .right .coach-name {
    word-break: keep-all;
    /*overflow: hidden;*/
    text-overflow: ellipsis;
  }

  .gymInfo .coach-list .left .certificate {
    padding-top: .5rem;
  }

  .gymInfo .coach-list .left .certificate .tap {
    margin-top: .5rem;
    margin-right: 1rem;
  }

  .gymInfo .tap {
    padding: .1rem .4rem;
    background: #eee;
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    color: rgba(0, 0, 0, .5);
    font-size: 1.8rem;
    letter-spacing: -.02rem;
  }

  .gymInfo .coach-list .right .coach-pic ul {

  }

  .gymInfo .coach-list .right .coach-pic ul li {
    width: 25%;
    text-align: center;
    float: left;
  }

  .gymInfo .coach-list .right .coach-pic ul li img {
    width: 8rem;
    height: 8rem;
  }

  .gymInfo .filterbar {
    z-index: 9999;
    font-size: 32px;
  }

  .gymInfo .row {
    height: 90px !important;
  }

  .gymInfo .row .col {
    line-height: 90px;
  }

  .gymInfo .tab-bar {
    height: 60px !important;
  }

  .gymInfo .filterbarpop-wrap .filterbarpop .tab-bar a {
    line-height: 60px !important;
  }

  .gymInfo .filterbarpop-wrap .filterbarpop .main .item {
    height: 60px !important;
    line-height: 60px !important;
  }

  .gymInfo .filterbarpop-wrap .filterbarpop .tab-bar .selected {
    border-bottom: 2px solid #ea5826 !important;
  }

  .gymInfo .filterbarpop-wrap .filterbarpop .main .line-style .item.selected {
    color: #ea5826 !important;
    border-color: #ea5826 !important;
  }

  .gymInfo .coach-pic img {
    margin: .2rem;
    float: left;
    width: 10rem;
    height: 10rem;
  }

</style>
