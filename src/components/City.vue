<template>
  <div class="index main sijiaoke">
    <div class="coachlist-head">
      <div class="module-head">
        <div class="head-left">
          <img src="../assets/卓赢健身切图_icon.地址定位.png"/>
          <router-link to="/Pop" class="city">南京市</router-link>
        </div>
        <span class="head-right">私教课</span>
      </div>
      <!--<div class="sl-line"></div>-->
      <tab>
        <tab-item selected @on-item-click="onItemClick" style="font-size: 20px">私教课</tab-item>
        <tab-item @on-item-click="onItemClick">私教馆</tab-item>
      </tab>
      <filter-bar
        top="256"
        :bar-menus="barMenus"
        @showDialog="handleShowDialog"
        @closeDialog="handleCloseDialog"
        @changeTab="handleChangeTab"
        @changeMainItem="handleChangeMainItem"
        @changeSelect="changeData">
      </filter-bar>
    </div>
    <div id="search" infinite-scroll-disabled="loading" infinite-scroll-distance="200" class="coach-list-box clearfix">
      <div v-for="(item,index) in coaches" class="coach-list clearfix">
        <div class="left">
          <img :src="item.headimg" @click="showHeadIcon(index)">
          <div v-transfer-dom>
            <previewer :list="[{src:item.headimg}]" :ref="'previewer_head_'+index" :options="options"></previewer>
          </div>
          <div class="certificate">
            <!--<span class="tap">专业认证</span>-->
          </div>
        </div>
        <div class="right">
          <div class="redirect" @click="goInfo(item.id)">
            <div class="clearfix">
              <div class="coach-name">{{item.name}}</div>
              <div class="price text-right">
                <span>￥</span>
                <span style="font-size: 2rem">{{item.lowprice}}</span>
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
              <span class="tap" v-for="label in item.label">{{label}}</span>
            </div>
            <div class="advantage" style="white-space : nowrap;overflow: hidden;">
              <p style="float: left;margin-right: .5rem" v-for="skill in item.skill">{{skill}}</p>
            </div>
          </div>
          <div class="coach-pic">
            <img style="float: left" class="previewer-demo-img" v-for="(img, key) in item.imgs" :src="img"
                 @click="show(key,index)" v-if="key < 4">
            <div v-transfer-dom>
              <previewer :list="imgs[item.id]" ref="previewer" :options="options"></previewer>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" style="padding: 2rem 5rem 8rem 5rem; color: #fff;font-size: 1.8rem">没有更多数据了，亲</div>
  </div>
</template>

<script>
  import FilterBar from 'vue-filter-bar'
  import {Previewer, TransferDom, Tab, TabItem} from 'vux'
  //  import barMenus from '@/data';
  export default {
    name: 'app',
    created(){
//        document.title = '购买';
      let self = this;
      this.$axios.get(this.ApiRoute.getcoachlist, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.coaches = result.data.coach;
          let imgArrs = {};
          for (let x in self.coaches) {
            let id = self.coaches[x].id;
            let imgs = self.coaches[x].imgs;
            let imgArr = [];
            for (let index in imgs) {
              imgArr.push({src: imgs[index]});
            }
            imgArrs[id] = imgArr;
          }
          self.imgs = imgArrs;
        } else {
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
      });
    },
    data() {
      return {
        coaches: {},
        imgs: {},
        barMenus: [{
          name: '场地',
          icon: '',
          value: 'area',
          showTabHeader: true,
          defaultIcon: '',
          selectIcon: '',
          selectIndex: 0,
          tabs: [{
            icon: '',
            name: '商圈',
            selectIndex: 0,
            detailList: [{
              name: '附近',
              icon: '',
              selectIndex: 0,
              list: [{
                name: '默认',
                value: 'all'
              }, {
                name: '500米',
                value: '500'
              }, {
                name: '1000米',
                value: '1000'
              }]
            }, {
              name: '建邺区',
              icon: '',
              selectIndex: 1,
              list: [{
                name: '全部',
                value: 'all'
              }, {
                name: '河西万达',
                value: 'hexiwanda'
              }, {
                name: '奥体中心',
                value: 'aotizhongxin'
              }]
            }, {
              name: '秦淮区',
              icon: '',
              selectIndex: 2,
              list: [{
                name: '全部',
                value: 'all'
              }, {
                name: '夫子庙',
                value: 'fuzimiao'
              }, {
                name: '新街口',
                value: 'xinjiekou'
              }]
            }]
          },
            {
              icon: '',
              name: '地铁沿线',
              selectIndex: 1,
              detailList: [{
                name: '1号线',
                icon: '',
                selectIndex: 0,
                list: [{
                  name: '新街口',
                  value: 'xinjiekou'
                }, {
                  name: '珠江路',
                  value: 'zhujianglu'
                }, {
                  name: '鼓楼',
                  value: 'gulou'
                }]
              }, {
                name: '2号线',
                icon: '',
                selectIndex: 1,
                list: [{
                  name: '集庆门大街',
                  value: 'jiqingmendajie'
                }, {
                  name: '兴隆大街',
                  value: 'xinglongdajie'
                }, {
                  name: '云锦路',
                  value: 'yunjinlu'
                }]
              }, {
                name: '10号线',
                icon: '',
                selectIndex: 2,
                list: [{
                  name: '梦都大街',
                  value: 'mengdudajie'
                },]
              }]
            }
          ]
        }, {
          name: '排序',
          icon: '',
          value: 'compositor',
          showTabHeader: false,
          defaultIcon: '',
          selectIcon: '',
          selectIndex: 0,
          tabs: [{
            icon: '',
            name: '',
            selectIndex: 0,
            detailList: [{
              name: '智能排序',
              icon: '',
              value: '0',
              selectIndex: 0
            }, {
              name: '离我最近',
              icon: '',
              value: '1',
              selectIndex: 1
            }, {
              name: '评价最好',
              icon: '',
              value: '2',
              selectIndex: 2
            }]
          }]
        }, {
          name: '筛选',
          icon: '',
          value: 'filter',
          type: 'filter',
          showTabHeader: false,
          defaultIcon: '',
          selectIcon: '',
          selectIndex: 0,
          tabs: [{
            icon: '',
            name: '价格',
            selectIndex: 0,
            detailList: [{
              name: '50以下',
              value: '0-50',
              selectIndex: -1
            }, {
              name: '50-100',
              value: '50-100',
              selectIndex: -1
            }, {
              name: '100-150',
              value: '100-150',
              selectIndex: -1
            },
              {
                name: '150-200',
                value: '150-200',
                selectIndex: -1
              }, {
                name: '200-250',
                value: '200-250',
                selectIndex: -1
              }, {
                name: '300以上',
                value: '300-350',
                selectIndex: -1
              }
            ]
          }]
        }], list: [{
          src: 'https://img.leoao.com/o_1b463i7kl1df1nkuqc04qt170kp.png?imageView2/2/w/300',
        }, {
          src: 'https://img.leoao.com/o_1b463i7kl1df1nkuqc04qt170kp.png?imageView2/2/w/300',
        },
          {
            src: 'https://img.leoao.com/o_1b463i7kl1df1nkuqc04qt170kp.png?imageView2/2/w/300'
          }, {
            src: 'https://img.leoao.com/o_1b463i7kl1df1nkuqc04qt170kp.png?imageView2/2/w/300'
          }], options: {
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
        }, showCity: false
      }

    },
    methods: {
      showHeadIcon(index){
        this.$refs['previewer_head_' + index][0].show(0);
      },
      onItemClick (index) {
        this.$router.push({path: '/Gym'})
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
      },
      show (key, index) {
        this.$refs.previewer[index].show(key)
      },
      goInfo(id){
        this.$router.push({path: '/CoachInfo?id=' + id})
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
  .sijiaoke {
    background: url("../../static/images/卓赢健身切图2_BG-3.png") repeat fixed;
    min-height: 84rem;
    background-size: cover;
    background-position-y: -9rem;
  }

  .sijiaoke .coachlist-head {
    background: url("../../static/images/卓赢健身切图2_BG-3.png") repeat fixed;
    height: 17rem;
    position: fixed;
    float: left;
    z-index: 1500;
    width: 100%;
    background-position-y: -9rem;
  }

  .sijiaoke .module-head {
    background-color: inherit;
    height: 150px;
    text-align: center;
    color: #fff;
    font-size: 2rem;
    z-index: 1499;
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #DBDCDE
  }

  .sijiaoke .vux-tab {
    height: 5rem !important;
    position: fixed !important;
    z-index: 1499;
    width: 100%;
    top: 150px;
    background-color: inherit;
  }

  .sijiaoke .vux-tab .vux-tab-item {
    line-height: 5rem !important;
    font-size: 2rem !important;
    color: #fff;
  }

  .sijiaoke .vux-tab .vux-tab-item.vux-tab-selected {
    color: #76a52b !important;
    border-bottom: 3px solid #8bc53f !important;
  }

  .sijiaoke .vux-tab-ink-bar {
    background: none !important;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .main .item-operation {
    width: 200px;
    height: 80px !important;
    margin: 25px;
    line-height: 55px !important;
    text-align: center !important;
    border: 1px solid #c5c5c5;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .main .multi-selected {
    background: #8bc53f;
    color: #76a52b !important;
    border-color: #8bc53f;
  }

  .sijiaoke .pswp {
    z-index: 99999 !important;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .main .filter-btns a {
    line-height: 6rem !important;
    color: #2c3e50 !important;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .main {
    height: 21rem !important;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .main .filter-btns {
    height: 6rem !important;
  }

  .sijiaoke .head-left {
    float: left;
    margin: 58px;
  }

  .sijiaoke .head-left a {
    text-decoration: none;
    color: #fff;
  }

  .sijiaoke .filterbar .container .row .selected {
    color: #76a52b !important;
  }

  .sijiaoke .filterbar .container .row {
    color: #fff;
  }

  .sijiaoke .filterbar .container {
    outline: none
  }

  .sijiaoke .filter-btns {
    text-align: center !important;
    line-height: 95px;
  }

  .sijiaoke .head-right {
    float: right;
    margin: 60px;
  }

  .sijiaoke .index {
    /*padding-bottom: 4.5rem;*/
  }

  .sijiaoke .main {
    background: #fff;
  }

  .sijiaoke .sl-line {
    margin: 0 1.5rem;
    height: 1px;
    background: #f2f2f2;
  }

  .sijiaoke .clearfix {
  }

  .sijiaoke .text-center {
    text-align: center;
  }

  .sijiaoke .text-left {
    text-align: left;
  }

  .sijiaoke .search-box {
    font-size: 1.4rem;
    font-family: PingFangSC-Semibold;
  }

  .sijiaoke .search-box > div {
    width: 33%;
    float: left;
    height: 3.9rem;
    line-height: 3.9rem;
  }

  .sijiaoke .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .sijiaoke .search-box > div > span {
    display: inline-block;
    padding-right: 1rem;
    max-width: 100%;
    background-image: url(https://cdn.leoao.com/leoao-coach-mdown12.png);
    background-repeat: no-repeat;
    background-size: .7rem;
    background-position: 100%;
  }

  .sijiaoke .search-box > div > span {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sijiaoke .text-center {
    text-align: center;
  }

  .sijiaoke .coach-list {
    padding: 1.5rem 0;
    margin: 0 1.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .sijiaoke .left, .sijiaoke .right {
    width: 50%;
    height: 100%;
    float: left;
  }

  .sijiaoke .coach-list .left {
    width: 23%;
    height: 100%;
    position: relative;
  }

  .sijiaoke .coach-list .right {
    width: 77%;
  }

  .sijiaoke .coach-list .left img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .sijiaoke .stars span {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 1.8rem;
    width: 1.8rem;
    height: 1.8rem;
  }

  .sijiaoke .stars span, .sijiaoke .tap {
    display: inline-block;
  }

  .sijiaoke .stars, .sijiaoke .lable {
    text-align: left;
  }

  .sijiaoke .coach-list .right .coach-name {
    width: 40%;
    float: left;
    font-size: 2rem;
    line-height: 2.4rem;
    font-family: PingFangSC-Semibold;
    text-align: left;
    /*margin-left: 1rem;*/
  }

  .sijiaoke .coach-list .right .price {
    width: 48%;
    float: right;
    line-height: 2.4rem;
    text-align:;
  }

  .sijiaoke .text-right {
    text-align: left;
  }

  .sijiaoke .price {
    color: #76a52b;
  }

  .sijiaoke .price span:first-of-type {
    font-size: 1.5rem;
    margin-right: -5px;
  }

  .sijiaoke .price span:nth-of-type(2) {
    font-size: 1.8rem;
  }

  .sijiaoke .price span:nth-of-type(3) {
    font-size: 1.5rem;
  }

  .sijiaoke .coach-list .right .lable {
    font-size: 1.2rem;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
  }

  .sijiaoke .coach-list .right .lable span {
    margin-top: .5rem;
    overflow: hidden;
  }

  .sijiaoke p {
    margin: 0;
  }

  .sijiaoke .coach-list .right .advantage {
    font-size: 1.8rem;
    text-align: left;
    opacity: .8;
    -moz-opacity: .8;
    -webkit-opacity: .8;
    filter: alpha(opacity=80);
    margin-top: 1rem;
  }

  .sijiaoke .coach-list-box {
    opacity: 0.8;
    background-color: #fff;
    position: relative;
    padding-top: 17rem;
  }

  .sijiaoke .coach-list .right .advantage, .sijiaoke .coach-list .right .coach-name {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /*margin-left: 1rem;*/
  }

  .sijiaoke .coach-list .left .certificate {
    padding-top: .5rem;
  }

  .sijiaoke .coach-list .left .certificate .tap {
    margin-top: .5rem;
    margin-right: 1rem;
  }

  .sijiaoke .tap {
    /*margin-right: 1.2rem;*/
    padding: .1rem .4rem;
    background: #b6b6bb;
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    color: rgba(0, 0, 0, .5);
    font-size: 1.8rem;
    letter-spacing: -.02rem;
  }

  .sijiaoke .coach-list .right .coach-pic ul {

  }

  .sijiaoke .coach-list .right .coach-pic ul li {
    width: 25%;
    text-align: center;
    float: left;
  }

  .sijiaoke .coach-list .right .coach-pic ul li img {
    width: 8rem;
    height: 8rem;
  }

  .sijiaoke .filterbar {
    z-index: 1499;
    font-size: 2rem;
    background-color: inherit;
  }

  .sijiaoke .row {
    height: 90px !important;
  }

  .sijiaoke .row .col {
    line-height: 90px;
  }

  .sijiaoke .tab-bar {
    height: 5rem !important;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .tab-bar a {
    line-height: 5rem !important;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .main .item {
    height: 5rem !important;
    line-height: 5rem !important;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .tab-bar .selected {
    border-bottom: 2px solid #8bc53f !important;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .main .line-style .item.selected {
    color: #76a52b !important;
    border-color: #8bc53f !important;
  }

  .sijiaoke .coach-pic img {
    margin: 10px;
    width: 7rem;
    height: 7rem;
  }

  .sijiaoke .filterbarpop-wrap .filterbarpop .main .filter-btns a:last-child {
    background: #8bc53f !important;
    color: #fff !important;
  }
</style>
