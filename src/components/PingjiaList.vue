<template>
  <div class="pingjialist">
    <popup-header title="评价列表"></popup-header>
    <div class="lists">
      <div class="item" v-for="(pingjia,number) in lists"
           style="height: 100%;overflow:hidden;margin-top: 1rem;border-bottom: .1rem #cccccc solid">
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
            <div class="class-type">{{pingjia.coursename}}</div>
          </div>
          <div class="content-foot clear">
            <span class="content">{{pingjia.content}}</span>
          </div>
          <div class="content-photo" style="margin-top: 1rem">
            <img class="previewer-demo-img" v-for="(item, index) in pingjia.imgs" v-if="index < 3" :src="item.src" width="150"
            @click="showPJ(index,number)">
            <div v-transfer-dom>
              <previewer :list="pingjia.imgs" :ref="'previewerPJ'+number" :options="options"></previewer>
            </div>
          </div>
        </div>
        <div style=""></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {PopupHeader, Previewer,TransferDom} from 'vux'
  export default {
    data(){
      return {
        lists: {},
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
    components: {
      PopupHeader, Previewer
    }, directives: {
      TransferDom
    },methods:{
      showPJ (index, number) {
        let name = 'previewerPJ' + number
        this.$refs[name][0].show(index)
      },
    },
    created(){
      let id = this.$route.query.coid;
      let self = this;
      this.$axios.get(this.ApiRoute.getcoachevaluate + '?coid=' + id, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (100 == result.code) {
          self.lists = result.data;
          for (let z in self.lists) {
            let imgs = [];
            for (let img in self.lists[z].imgs) {
              imgs.push({src: self.lists[z].imgs[img]});
            }
            self.lists[z].imgs = imgs;
          }
        }
      }).catch(function (response) {
        console.log(response)
        // 这里是处理错误的回调
      });
    },

  }
</script>
<style>
  .pingjialist .content-photo img {
    float: left;
    margin: 1rem 1rem 0 0;
    width: 8.4rem;
    height: 8.4rem;
  }
  .pingjialist .clear:after {
    content: "";
    display: block;
    clear: both
  }
  .pingjialist .vux-popup-header {
    height: 5rem;
    font-size: 1.9rem;
    line-height: 5rem;
  }
  .pingjialist .item {
    font-size: 1.8rem;
  }

  .pingjialist .item .title {
    background: #e0e0e5;
    font-size: 1.8rem;
  }

  .pingjialist .item .titile-name {
    float: left;
    margin: 0 .5rem 0 1rem;
  }
  .pingjialist .left {
    position: relative;
  }
  .pingjialist .left, .pingjialist .right {
    width: 52%;
    height: 100%;
    float: left;
  }
  .pingjialist .content{
    width: 65%;
    height: 100%;
    float: left;
    margin-bottom: 1rem;
  }
  .pingjialist .item span {
    height: 100%;
    line-height: 3rem;
    text-align: left;
  }
  .pingjialist .stars {
    float: left;
  }
  .pingjialist .stars span {
    background-image: url(https://cdn.leoao.com/leoao-coach-mstar.png);
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 2.2rem;
    width: 2.2rem;
    height: 2.2rem;
  }

  .pingjialist .stars span, .pingjialist .tap {
    display: inline-block;
  }

  .pingjialist .stars, .pingjialist .lable {
    text-align: left;
  }
  .pingjialist .item .pingjia-num {
    float: left;
  }

  .pingjialist .headicon {
    width: 30%;
  }

  .pingjialist .headicon img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  .pingjialist .stars span, .tap {
    display: inline-block;
  }

  .pingjialist .stars, .lable {
    text-align: left;
  }

  .pingjialist .content-head {
    margin: 2rem 0 .5rem 0;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .pingjialist .content-head .name {
    float: left;
  }

  .pingjialist .content-head .time {
    float: right;
  }

  .pingjialist .content-body .class-type {
    float: right;
    color: #76a52b;
  }

  .pingjialist .content-foot {
    text-align: left;
    width: 100%;
  }

  .pingjialist .content-photo img {
    float: left;
    margin: 1rem 1rem 0 0;
    width: 8.4rem;
    height: 8.4rem;
  }
</style>
