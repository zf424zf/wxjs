<template>
  <div class="co">
    <div class="co-title">
     <span class="co-left">
       {{info.name}}
     </span>
      <span class="co-right co-price">
       ￥{{info.price}}/课时
     </span>
    </div>
    <div class="co-body">
      <group>
        <cell title="课次">
          <x-number :fillable="true" v-model="classCount" button-style="round"></x-number>
        </cell>
        <cell title="上课场馆">
          <span class="co-sh" slot="default">{{info.sporthall}}</span>
        </cell>
      </group>
    </div>
    <div class="co-foot">
      <div class="co-total" style="line-height: 5rem;margin-left: 6rem;float: left">
        <p style="font-size: 1.5rem;float: left;padding-top: 2rem;">总计</p>
        <p style="font-size: 2rem;padding-top: 1.5rem;margin-left: 3.5rem;color: #76a52b">
          ￥{{info.price * classCount}}</p>
      </div>
      <div style="float: right;width: 2rem;margin-right: 11rem;margin-top: 2.8rem"
           @click="confirmOrder(info.id,classCount)">
        <x-button class="co-pay" title="去支付"
                  style="width: 10rem;height: 5rem;color: #fff;background-color: #8bc53f;font-size: 2rem;">
          确认下单
        </x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {Group, Cell, XNumber, XButton} from 'vux'
  export default{
    components: {
      XNumber,
      Cell,
      Group,
      XButton
    },
    created(){
      let id = this.$route.query.id;
      let self = this;
      this.$axios.get(this.ApiRoute.confirmorder + '?id=' + id, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          self.info = result.data;
          self.small = parseInt(result.data.salelimit)
          self.classCount = self.small
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
//      this.$http.get(this.ApiRoute.confirmorder+'?id='+id).then(response=>{
//        let data = JSON.parse(JSON.stringify(response.body)).response.data;
//        this.info = data;
//        this.small = parseInt(data.salelimit)
//        this.classCount = this.small
//      })
    },
    data(){
      return {
        info: {},
        small: 0,
        classCount: 0
      };
    },
    methods: {
      confirmOrder(cid, count){
        if (count < this.small) {
              alert('购买课次最少为'+this.small);
          return false;
        }
        let self = this;
        this.$axios.get(this.ApiRoute.createorder + '?id=' + cid + '&totalhours=' + count, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            let qid = result.data;
//            location.href = 'http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl='+location.href
//            self.$router.push({path: '/OrderDetail/?qid=' + qid})
            window.location.href = '/OrderDetail/?qid=' + qid;
          } else {
            if (109 == result.code) {
//              self.$router.push({path:'/Login'})
              location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
            } else {
              alert('网络错误，请稍后重试')
            }
          }
        }).catch(function (response) {
          console.log(response)
          // 这里是处理错误的回调
        });
      }
    }
  }
</script>
<style>
  .co {
    text-align: left;
  }

  .co .co-right {
    text-align: right;
    float: right;
  }

  .co .co-title {
    height: 6rem;
    line-height: 6rem;
    font-size: 2rem;
    margin: 1rem;
    /*border-bottom: 1px #6e727b solid;*/
  }
  .co .vux-number-round .vux-number-selector-sub, .co .vux-number-round .vux-number-selector-plus {
    padding: 2px;
    border: 1px solid #8bc53f;
    text-align: center;
  }
  .co .co-price {
    color: #76a52b;
  }

  .co .vux-label {
    font-size: 2rem !important;
  }

  .co .vux-number-round .vux-number-selector {
    width: 5rem !important;
    height: 5rem !important;
  }

  .co .vux-number-selector svg {
    width: 3rem;
    height: 3rem;
    fill: #8bc53f;
  }

  .co .vux-number-selector {
    height: 60px !important;
    font-size: 80px !important;
    line-height: 5rem;
  }

  .co .vux-number-round .vux-number-input {
    font-size: 2rem;
    width: 5rem !important;
  }

  .co .vux-number-input {
    height: 5rem !important;
    font-size: 2rem;
  }

  .co .co-sh {
    font-size: 2rem;
  }

  .co .co-foot {
    background-color: #f7f7f7;
    height: 10rem;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    z-index: 9999;
  }

  .co .co-total {
    width: 3rem;
  }

</style>
