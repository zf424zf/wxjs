<template>
  <div class="coachInfo container" style="overflow:auto">
    <div class="coach clear">
      <div class="avatar" style="">
        <img :src="coachInfo.headimg">
      </div>
      <div class="coach-info right" style="float: left;">
        <div class="info-head" style="">
          <span class="name">{{coachInfo.name}}</span>
          <span class="price">￥{{coachInfo.lowprice}}/课时</span>
        </div>
        <div class="info-body">
          <div class="stars">
            <span class=""></span>
            <span class=""></span>
            <span class=""></span>
            <span class=""></span>
            <span class=""></span>
          </div>
          <span class="star-num">{{evaluate.length}}条</span>
        </div>
        <div class="info-foot">
          <div class="lable">
            <span v-for="label in coachInfo.label" class="tap">{{label}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="part"></div>
    <div class="album">
      <div class="album-head clear">
        <span class="title">相册</span>
        <!--<span class="all">全部图片</span>-->
      </div>
      <div class="album-body" style="height: 12rem;">
        <img style="float: left" class="previewer-demo-img" v-for="(item, index) in coachInfo.imgs" :src="item"
             width="150"
             @click="show(index)" v-if="index < 4">
        <div v-transfer-dom>
          <previewer :list="lists" ref="previewerX" :options="options"></previewer>
        </div>
      </div>
    </div>
    <hr style="width: 100%"/>
    <div class="profile" style="min-height: 12rem">
      <div class="title clear">
        擅长
      </div>
      <div class="label">
        <span v-for="skill in coachInfo.skill" class="tap1">{{skill}}</span>
      </div>
      <div class="suggest">
        <span>{{coachInfo.description}}</span>
      </div>
    </div>
    <div class="fuwu-title part clear">
      <span>服务场地</span>
    </div>
    <div v-for="address in coachInfo.shids" class="place clear" @click="getMap(address)">
      <div class="icon">
        <img src="../assets/address.png"/>
      </div>
      <div class="address">
        <div class="address-head">
          <p>{{address.name}}</p>
        </div>
        <div class="address-body">
          <p>{{address.address}}</p>
        </div>
      </div>
    </div>
    <div class="kecheng-title part clear">
      <div style="float: left;margin-left: 1.2rem">所授课程</div>
      <div style="float: left;margin-left: .5rem">{{courseInfo.length}}种</div>
    </div>
    <div class="class clear">
      <div class="classlists">
        <div v-model="courseInfo" v-for="(course,index) in courseInfo" v-if="index < viewCount" class="list">
          <div class="class-img left">
            <img :src="course.img">
          </div>
          <div class="class-info right">
            <div class="course-info left" @click="showCourse(course)">
              <span class="name">{{course.name}}</span>
              <span class="num">{{course.salelimit}}课时起售</span>
              <span class="price">￥{{course.price}} /课时</span>
            </div>
            <div class="right checks">
              <span class="fn-right" :class="{'check':index === checkClass,'uncheck':index !== checkClass }"
                    v-on:click="checks(index,course.id)"></span>
            </div>
          </div>
          <hr style="width: 100%">
        </div>
        <span
          v-if="courseInfo.length > 3 && showAllSpan"
          @click="showAllCourse()"
          style="height: 4rem;display: inline-block;margin: 1rem 1rem 1rem 16rem;width:16rem;text-align: center;line-height: 4rem">查看全部课程</span>
      </div>
    </div>
    <div class="pingjia">
      <div class="title clear">
        <span class="titile-name">会员评价</span>
        <span class="pingjia-num">{{evaluate.length}}条</span>
      </div>

      <div class="lists">
        <div class="item clear" v-for="(pingjia,number) in evaluate" v-if="number < 5"
             style="height: 24rem;margin-top: 1rem;border-bottom: .1rem #cccccc solid">
          <div class="headicon left">
            <img :src="pingjia.headimg">
          </div>
          <div class="content">
            <div class="content-head clear">
              <div class="name">{{pingjia.name}}</div>
              <div class="time">{{pingjia.addtime}}</div>
            </div>
            <div class="content-body clear">
              <div class="stars">
                <span class="" v-for="i in parseInt(pingjia.score / 2) "></span>
              </div>
              <div class="class-type">增肌课</div>
            </div>
            <div class="content-foot clear">
              <span class="content">{{pingjia.content}}</span>
            </div>
            <div class="content-photo" style="margin-top: 1rem">
              <img class="previewer-demo-img" v-for="(item, index) in pingjia.imgs" v-if="index < 3" :src="item.src"
                   width="150"
                   @click="showPJ(index,number)">
              <div v-transfer-dom>
                <previewer :list="pingjia.imgs" :ref="'previewerPJ'+number" :options="options"></previewer>
              </div>
            </div>
          </div>
          <div style=""></div>
        </div>
        <div v-if="evaluate.length <1" class="text-center" style="padding: 2rem 5rem; color: rgba(0, 0, 0, 0.3);">
          没有更多数据了，亲
        </div>
        <span
          v-if="evaluate.length >0"
          style="height: 4rem; display: inline-block; width: 16rem; text-align: center; line-height: 4rem;margin-bottom: 2rem"
          @click="goPJList(coachInfo.id)">查看更多评价</span>
      </div>
    </div>
    <div v-if="coachInfo.active == 1" @click="buy" class="buy"
         style="width: 100%;height: 4.5rem;position: fixed;left:0;bottom:0;z-index: 1499;background-color:#fff;border-top: 1px #f7f7f7 solid">
      <x-button style="background: #8bc53f;width: 30%;height: 4rem;font-size: 2rem;color: #fff">立即购买</x-button>
    </div>
    <div v-transfer-dom>
      <popup v-model="showCourseInfo"
             :popup-style="{top:0,height:'60rem',width:'90%','margin-left':'2.3rem','margin-top':'10rem'}"
             class="courseInfoP">
        <div class="popup1">
          <div class="course_info_head">
            <div class="course_imgs">
              <img :src="viewCourse.img" style="width: 11rem;height: 11rem"/>
              <p class="course_name"
                 style="font-size: 2.5rem;color: #ea5826;margin-top: 7rem;margin-left: 1rem;float: left">
                {{viewCourse.name}}
              </p>
            </div>
            <div class="clear" style="border-bottom: .2rem #d4d4d4 solid"></div>
            <div style="width: 100%">
              <p class="title" style="font-size: 2rem;font-weight: bold">课程价格：</p>
              <span style="font-size: 1.8rem;">{{viewCourse.price}}/课时</span>
              <p class="title" style="font-size: 2rem;font-weight: bold">起订节数：</p>
              <span style="font-size: 1.8rem;">{{viewCourse.salelimit}}节</span>
              <p class="title" style="font-size:2rem;font-weight: bold">课程介绍：</p>
              <span style="font-size: 1.8rem;width: 100%;min-height: 5rem">{{viewCourse.content}}</span>
            </div>
          </div>
          <div class="close-btn">
            <span class="vux-close" style="" @click="closePop"></span>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import {Previewer, TransferDom, ColorPicker, Popup, Group, LoadMore} from 'vux'
  import XButton from "../../node_modules/vux/src/components/x-button/index";
  export default{
    created(){
      let id = this.$route.query.id;
      let self = this;
      this.$axios.get(this.ApiRoute.getcoachinfo + '?id=' + id, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;

        if (200 == result.code) {
          self.coachInfo = result.data
          self.courseInfo = result.data['course'];
          self.evaluate = result.data['evaluate'];
          for (let x in self.courseInfo) {
            self.courseInfo[x].isChecked = false;
          }
          for (let y in self.coachInfo.imgs) {
            self.lists.push({src: self.coachInfo.imgs[y]});
          }
          for (let z in self.evaluate) {
            let imgs = [];
            for (let img in self.evaluate[z].imgs) {
              imgs.push({src: self.evaluate[z].imgs[img]});
            }
            self.evaluate[z].imgs = imgs;
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
        coachInfo: [],
        courseInfo: [],
        evaluate: [],
        evaluateImgs: [],
        lists: [],
        checkClass: '',
        checkId: '',
        color1: '#8bc53f',
        colors1: ['#8bc53f'],
        viewCount: 3,
        showAllSpan: true,
        showCourseInfo: false,
        viewCourse: {},
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
    }, components: {
      XButton,
      Previewer, ColorPicker, Popup, Group, LoadMore
    }, directives: {
      TransferDom
    }, methods: {
      showCourse: function (course) {
        this.showCourseInfo = true;
        this.viewCourse = course;
      },
      goPJList: function (coid) {
        window.location.href = '/PingjiaList?coid=' + coid
      },
      closePop: function () {
        this.showCourseInfo = false;
      },
      showAllCourse: function () {
        this.viewCount = this.courseInfo.length
        this.showAllSpan = false;
      },
      getMap: function (address) {
//        this.$router.push({path: '/Map?lat=' + address.latitude + '&lng=' + address.longitude + '&name=' + address.name})
        window.location.href = '/Map?lat=' + address.latitude + '&lng=' + address.longitude + '&name=' + address.name;
      },
      checks: function (index, courseId) {
        this.checkClass = index;
        this.checkId = courseId;
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
        console.log(v);
      },
      show (index) {
        this.$refs.previewerX.show(index)
      },
      showPJ (index, number) {
        let name = 'previewerPJ' + number
        this.$refs[name][0].show(index)
      },
      buy(){
        let id = this.checkId;
        if (id == '' || id == 0) {
          alert('请先选择课程');
          return false;
        }
//        this.$router.push({path: '/ConfirmOrder?id=' + id})
        window.location.href = '/ConfirmOrder?id=' + id
      }
    },
  }
</script>
<style>
  .courseInfoP .close-btn {
    bottom: 0;
    position: relative;
    margin: 12rem 0 0 20rem;
  }

  .courseInfoP .course_name {
    margin: 0;
  }

  .courseInfoP .course_imgs {
    height: 12rem;
  }

  .courseInfoP .course_imgs img {
    float: left;
    margin: .1rem;
    width: 10.3rem;
  }

  .coachInfo {
    /*margin-bottom: 8rem;*/
  }

  .courseInfoP {
    z-index: 2500 !important;
  }

  .coachInfo .clear:after {
    content: "";
    display: block;
    clear: both
  }

  .coachInfo .part {
    height: .5rem;
    border-top: 1px #e0e0e5 solid;
    border-bottom: 1px #e0e0e5 solid;
    background-color: #dcdce1;
  }

  .coachInfo .content {
    height: 100%;
    float: left;
    margin-bottom: 1rem;
    width: 66%;
  }

  .coachInfo .avatar {
    top: 2rem;
    float: left;
    width: 16rem;
    height: 100%;
    margin: 2rem 0;
  }

  .vux-close:before, .vux-close:after {
    width: 3rem;
    height: .15rem;
  }

  .coachInfo .left, .coachInfo .right {
    width: 52%;
    height: 100%;
    float: left;
  }

  .coachInfo .left {
    position: relative;
  }

  .coachInfo .coach-info {
    width: 60%;
    /*margin-left: -5rem;*/
  }

  .coachInfo .avatar img {
    width: 14rem;
    height: 14rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .coachInfo .stars {
    float: left;
  }

  .coachInfo .star-num {
    float: left;
    padding-left: 1rem;
    font-size: 1.8rem;
  }

  .coachInfo .stars span {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 2rem;
    width: 2rem;
    height: 2rem;
  }

  .coachInfo .stars span, .coachInfo .tap {
    display: inline-block;
  }

  .coachInfo .stars, .coachInfo .lable {
    text-align: left;
  }

  .coachInfo .info-head {
    font-size: 2.5rem;
    margin: 3rem 0 1rem;
    text-align: left
  }

  .coachInfo .info-head .name {
    font-weight: 700;
  }

  .coachInfo .info-head .price {
    float: right;
    margin-right: 1rem;
    color: #76a52b;
  }

  .coachInfo .info-foot {
    margin-top: 1rem;
    float: inherit;
  }

  .coachInfo .info-foot .lable {
    text-align: left;
  }

  .coachInfo .tap {
    margin-bottom: 1rem;
    margin-right: 1.2rem;
    padding: .1rem .4rem;
    background: #eee;
    border-radius: 1rem;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    color: rgba(0, 0, 0, .5);
    font-size: 1.8rem;
    letter-spacing: -.02rem;
  }

  /**
  xiangce
   */
  .coachInfo .album-head {
    font-size: 2rem;
  }

  .coachInfo .album-head .title {
    float: left;
    margin: 1.2rem 2rem;
  }

  .coachInfo .album-head .all {
    float: right;
    margin: 1.2rem;
  }

  .coachInfo .album-body img {
    margin: .3rem;
    width: 11rem;
    height: 11rem;
  }

  /**
  擅长
   */
  .coachInfo .profile .title {
    float: left;
    font-size: 2rem;
    margin: 1.2rem;
    text-align: left;
    width: 90%;
  }

  .coachInfo .profile .label {
    text-align: left;
  }

  .coachInfo .profile .label .tap1 {
    margin: .3rem 1.2rem;
    padding: .1rem .4rem;
    background: #ffffff;
    border: .2rem #eee solid;
    color: rgba(0, 0, 0, .5);
    font-size: 1.8rem;
    letter-spacing: -.02rem;
    display: inline-block;
  }

  .coachInfo .profile .suggest {
    margin: 1.8rem;
    text-align: left;
    line-height: 1.8rem;
    font-size: 1.8rem;
  }

  /**
  服务
   */
  .coachInfo .fuwu-title {
    height: 3rem;
    line-height: 3rem;
    font-size: 2rem;
    text-align: left;
  }

  .coachInfo .fuwu-title span {
    margin: 1.8rem;
  }

  .coachInfo .address {
    float: left;
  }

  .coachInfo .address p {
    text-align: left;
  }

  .coachInfo .address .address-head p {
    font-size: 2rem;
    font-weight: 600;
  }

  .coachInfo .address-body {
    margin-top: -1.5rem;
    font-size: 1.8rem;
  }

  .coachInfo .place .icon {
    float: left;
    margin: 3rem 1rem 0 1.2rem;
  }

  .coachInfo .place .icon img {
    width: 3rem;
    height: 3rem;
  }

  /**
  课程title
   */
  .coachInfo .kecheng-title {
    height: 3rem;
    line-height: 3rem;
    font-size: 2rem;
    text-align: left;
  }

  .coachInfo .class {
    text-align: left;
    font-size: 1.8rem;
  }

  .coachInfo .classlists .list {
    margin: 1.8rem 0 0 2rem;
  }

  .coachInfo .class-img {
    width: 30%;
  }

  .coachInfo .class-img img {
    width: 11rem;
    height: 11rem;
  }

  .coachInfo .class-info .left {
    width: 50%;
  }

  .coachInfo .class-info span {
    display: inline-block;
    width: 100%;
    float: left;
  }

  .coachInfo .class-info .name, .class-info .price {
    font-size: 2rem;
  }

  .coachInfo .checks span {
    width: inherit;
    margin-left: 5rem;
  }

  .coachInfo .class-info .name {
    color: #000;
    font-weight: 600;
  }

  .coachInfo .class-info .price {
    color: #76a52b;
  }

  .coachInfo .class-info {
    width: 70%;
    margin-bottom: 1rem;
  }

  .coachInfo .fn-right {
    float: right;
  }

  .coachInfo .uncheck {
    background-image: url(https://cdn.leoao.com/leoao-coach-muncheck.png);
  }

  .coachInfo .check, .uncheck {
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    background-repeat: no-repeat;
    background-size: 2.5rem 2.5rem;
  }

  .coachInfo .fn-right {
  }

  .coachInfo .vux-color-item {
    width: 4rem !important;
    height: 4rem !important;
    border-radius: 4rem !important;
    margin: 4rem 0 0 8rem !important;
  }

  .coachInfo .weui-icon-success-no-circle {
    font-size: 3rem !important;
    color: #76a52b;
  }

  .coachInfo .checks {
    width: 43%;
    float: right;
    margin-top: 4rem;
  }

  .coachInfo .check {
    background-image: url("../../static/images/choose.png");
  }

  /**
  pingjia
   */
  .coachInfo .pingjia {
    font-size: 1.8rem;
    margin-bottom: 6rem;
  }

  .coachInfo .pingjia .title {
    background: #e0e0e5;
    font-size:2rem;
  }

  .coachInfo .pingjia .titile-name {
    float: left;
    margin: 0 .5rem 0 1rem;
  }

  .coachInfo .pingjia span {
    height: 3rem;
    line-height: 3rem;
    text-align: left;
  }

  .coachInfo .pingjia .pingjia-num {
    float: left;
  }

  .coachInfo .headicon {
    width: 30%;
  }

  .headicon img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .coachInfo .stars span, .tap {
    display: inline-block;
  }

  .coachInfo .stars, .lable {
    text-align: left;
  }

  .coachInfo .content-head {
    margin: 2rem 0 .5rem 0;
    font-size: 1.8rem;
    font-weight: 500;
  }
  .coachInfo .item{
    height: 100%!important;
  }
  .coachInfo .content-head .name {
    float: left;
    max-width: 11rem;
    max-height: 2.5rem;
    overflow: hidden;
  }

  .coachInfo .content-head .time {
    float: right;
  }

  .coachInfo .content-body .class-type {
    float: right;
    color: #76a52b;
  }

  .coachInfo .content-foot {
    text-align: left;
    width: 100%;
  }

  .coachInfo .content-photo img {
    float: left;
    margin: 1rem 1rem 0 0;
    width: 8.4rem;
    height: 8.4rem;
  }
</style>

