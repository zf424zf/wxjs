<template>
  <div>
    <div v-transfer-dom>
      <x-dialog class="city" v-model="isshow" :dialog-style="{'height':'100%','width':'100%','max-width':'100%'}">
        <div class="city-title">
          <p class="dialog-title">选择城市</p>
          <div>
            <span class="vux-close" @click="closePop" style="width: 60px;height: 60px"></span>
          </div>
        </div>
        <div class="city-body">
          <div class="title">
            <span>江苏省>南京市(当前城市)</span>
            <img style="float: right;margin-top: 30px;margin-right: 5%" src="../assets/卓赢健身切图_icon.地址定位.png"/>
          </div>
          <group v-for="item in city">
            <cell
                  :title="item.name"
                  is-link
                  :border-intent="false"
                  :arrow-direction="showContent.name == item.name && showContent.flag == true ? 'up' : 'down'"
                  @click.native="shrink(item.name)" style="text-align: left;font-size: 36px;margin-left: 5%"></cell>
            <template v-for="c in item.city" v-if="showContent.name == item.name && showContent.flag == true ">
              <cell-box :border-intent="false" class="sub-item" :is-link="true"><div style="width: 100%;text-align: left" @click="back1()">{{c.name}}</div></cell-box>
            </template>
          </group>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import {TransferDom, XDialog ,Cell ,CellBox , Group} from 'vux'
  export default{
    data () {
      return {
        isshow: true,
        showContent:{name:'',flag:''},
        city: []
      }
    },
    directives: {
      TransferDom
    },
    components: {
      Group,
      XDialog,
      Cell,
      CellBox
    },
    created(){
      this.$http.get(this.ApiRoute.getarea).then(response => {
        this.city = JSON.parse(JSON.stringify(response.body)).response.data;
      }, response => {
        // error callback
      });
    },
    methods: {
      back1:function () {
//          console.log(123);
        this.$router.go(-1)
      },
      closePop: function () {
        this.$router.go(-1)
      },
      shrink:function(value){
        if(this.showContent.name != value){
          this.showContent.name = value;
          this.showContent.flag = true;
        }else{
          if(!this.showContent.flag){
            this.showContent.flag = true;
          }else{
            this.showContent.flag = false;
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/close';
  @font-face {
    font-family: 'iconfont';
    src: url('../../static/font/iconfont.eot');
    src: url('../../static/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../static/font/iconfont.woff') format('woff'),
    url('../../static/font/iconfont.ttf') format('truetype'),
    url('../../static/font/iconfont.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 60px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .city {
    .vux-close {
      margin-top: -30%;
      margin-bottom: 8px;
      margin-left: 93%;
    }
    .dialog-title {
      height: 5%;
      font-size: 48px;
    }
    .vux-close:before, .vux-close:after {
      width: 64px !important;
      top: 80px !important;
      left: -50px !important;
    }
  }
  .city-body{
    border: 1px solid #8e8e93;
  }
  .city-body .title{
    height: 100px;
    line-height: 100px;
  }
  .city-body .title span{
    font-size: 42px;
    float: left;
    margin-left: 5%;
  }
  .city-body .title i{
    float: right;
    margin-right: 5%;
  }

  .sub-item{
    height: 120px !important;
    font-size: 32px !important;
    margin-left: 7%;
  }

</style>
