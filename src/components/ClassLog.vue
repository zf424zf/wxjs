<template>
  <div class="timeline-demo">
    <timeline>
      <timeline-item v-for="item in detail">
        <h4 class="recent">{{item.title + "," + item.classname + item.process + ", 教练 " + item.coach }}</h4>
        <p class="recent">{{item.time}}</p>
      </timeline-item>
    </timeline>
  </div>
</template>
<script>
  import { Timeline, TimelineItem, XButton } from 'vux'

  export default{
    components: {
      Timeline,
      TimelineItem,
      XButton
    },
    data () {
      return {
        count: 3,
        total: 6,
        detail: [{
          title: '预约上课',
          classname: '增肌课',
          process: '3/8',
          coach: '大鹏',
          time: '2017-07-22'
        }, {
          title: '预约取消',
          classname: '团操课',
          process: '6/8',
          coach: '小娜',
          time: '2017-07-23'
        }, {
          title: '私教上课',
          classname: '增肌课',
          process: '4/8',
          coach: '大鹏',
          time: '2017-07-24'
        }, {
          title: '购买私教',
          classname: '塑形课',
          process: '0/8',
          coach: '西西',
          time: '2017-07-25'
        }]
      }
    }
  }
</script>
<style lang="less">
  .timeline-demo {
    p {
      color: #888;
      font-size: 0.8rem;
      text-align: left;
    }
    h4 {
      color: #666;
      font-weight: normal;
      text-align: left;
    }
    .recent {
      color: rgb(4, 190, 2)
    }
  }
</style>
