<template>
  <div class="schedule">
    <div id="times" class="times">
      <ul class="day clear" id="weeks">
        <li @click="changeWeek(item)" v-for="item in week" :class="{'active':item.select}"><span
          v-if="item.isNow">今天</span><span
          v-if="!item.isNow">{{item.titleDate}}</span><span v-if="item.select">{{item.weekat}}</span></li>
      </ul>
    </div>
    <div class="add" @click="add()">+</div>
    <ul class="studentInfo">
      <li class="clear" v-for="item in infos">
        <div class="user">
          <img :src="item.headimg" alt="">
          <span>{{item.username}}</span>
        </div>
        <ul class="classInfo">
          <li class="clear">
            <h3 class="left">{{item.course}} ({{item.currenthours}}/{{item.totalhours}})</h3>
            <span class="right">{{item.ordertime_s}}</span>
          </li>
          <li class="clear">
            <h4 class="left">
              <span class="icon"></span>
              {{item.sporthall}}
            </h4>
            <span class="right" v-if="item.issign == 0">教学未完成</span>
            <span class="right" v-if="item.issign == 1">教学完成</span>
            <span class="right" v-if="item.issign == 2">教学未完成</span>
          </li>
          <li class="btn">
            <button class="qr" v-if="item.issign == 0" @click="signCourse(item.id)">扫码签到</button>
            <button class="sign" v-if="item.issign == 1">已签到</button>
            <button class="sign" v-if="item.issign == 2">缺课</button>
            <button class="contact" @click="calltel(item.phone)">联系学员</button>
            <button class="cancel" @click="cancel(item)">取消课程</button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  import {TransferDom,  Confirm, Alert } from 'vux'
  export default{
    components: {
      Confirm,
    },
    created(){
        let time_now = new Date();
      let now =time_now.getFullYear() + '-' + (time_now.getMonth()+1)+'-'+time_now.getDate();
      let self = this;
      this.$axios.get(this.ApiRoute.getschedulebycoach + '?date=' + now, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          let data = result.data;
          self.infos = data;
        } else {
        }
      }).catch(function (response) {
        // 这里是处理错误的回调
      });
      let select = false;
      let isNow = false;
      for (let i = 0; i < 7; i++) {
        if (i == 0) {
          select = true;
          isNow = true;
          this.selectMonth = {
            date: this.getDate(i, true),
            titleDate: this.getDate(i),
            select: select,
            isNow: isNow,
            weekat: this.getDateFormatCN(i)
          }
        } else {
          select = false;
          isNow = false;
        }
        this.week.push({
          date: this.getDate(i, true),
          titleDate: this.getDate(i),
          select: select,
          isNow: isNow,
          weekat: this.getDateFormatCN(i)
        });
      }
      this.curOriginDate.setFullYear(new Date().getFullYear());
      this.curOriginDate.setDate(new Date().getDate());
      this.curOriginDate.setMonth(new Date().getMonth());
      this.curYear = new Date().getFullYear();

      this.getWeek(-7);
      this.getWeek(7);
    },
    mounted(){
      let weeks = document.getElementById('weeks');
      weeks.scrollLeft = 847;
      weeks.addEventListener('scroll', this.handleScroll);
    },
    data () {
      return {
        isshow: true,
        selectMonth: {},
        week: [],
        hasSelect: '',
        infos: [],
        checkWeek: 0,
        curOriginDate: new Date(),//当前title的第一个时间,
        leftLoad: true,
        rightLoad: true,
        curYear: new Date().getFullYear(),
        leftNum: -7,
        rightNum: 7,
        rightFlag : 1703,
      }
    },
    methods: {
      cancel(item){
        let self = this;
        this.$vux.confirm.show({
          title: '取消课程',
          content: '确定取消'+item.username+'的'+item.course+'？',
          onShow () {
          },
          onHide () {
          },
          onCancel () {
          },
          onConfirm () {
            self.$axios.get(self.ApiRoute.cancelcourse + '?cid=' + item.id+'&type=1', {}, {
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              },
              withCredentials: true
            }).then(function (response) {
              let result = response.data.response;
              if (200 == result.code) {
                alert(result.msg);
                window.location.href = '/Coach/Schedule'
              } else {
                if (109 == result.code) {
                  location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
                } else {
                  alert(result.msg)
                }
              }
            }).catch(function (response) {
              console.log(response)
              // 这里是处理错误的回调
            });
          }
        })
      },
      handleScroll(){
        if (document.getElementById('weeks').scrollLeft <= 251) {
          if (this.leftLoad) {
            this.leftLoad = false;
            this.leftNum += -7;
            this.getWeek(this.leftNum);
            document.getElementById('weeks').scrollLeft += 800;
            this.rightFlag += 800;
            this.leftLoad = true;
          }
        }
        if (document.getElementById('weeks').scrollLeft >= (document.getElementById('weeks').scrollWidth -850)) {
          if (this.rightLoad) {
            this.rightLoad = false;
            this.rightNum += 7
            this.getWeek(this.rightNum);
            this.rightFlag += 800;
            document.getElementById('weeks').scrollLeft =  this.rightFlag;
            this.rightLoad = true;
          }
        }
      },
      getWeek(weekNum){
        this.curOriginDate.setDate(new Date().getDate() + weekNum);
        if (weekNum > 0) {
          for (let i = 0; i < 7; i++) {
            this.week.push({
              date: this.getDate(i, true),
              titleDate: this.getDate(i),
              select: false,
              isNow: false,
              weekat: this.getDateFormatCN(i)
            });
          }
        } else {
          for (let i = 6; i >= 0; i--) {
            this.week.unshift({
              date: this.getDate(i, true),
              titleDate: this.getDate(i),
              select: false,
              isNow: false,
              weekat: this.getDateFormatCN(i)
            });
          }
        }
        this.curOriginDate.setFullYear(new Date().getFullYear());
        this.curOriginDate.setDate(new Date().getDate());
        this.curOriginDate.setMonth(new Date().getMonth());
        this.curYear = new Date().getFullYear();
//        console.log(this.week);
      },
      add(){
//        this.$router.push({path:'/Coach/StudentList'})
        window.location.href = '/Coach/StudentList';
      },
      signCourse(id){
//          this.$router.push({path:'/Coach/Sign?clid='+id})
        window.location.href = '/Coach/Sign?clid=' + id;
      },
      calltel(tel){
        window.location.href = 'tel://' + tel
      },
      getDate(index, isYear){
        let curOrigin = new Date();
        curOrigin.setDate(this.curOriginDate.getDate() + index);
        if(this.curOriginDate.getDate() > curOrigin.getDate() && (this.curOriginDate.getMonth() == 3 ||this.curOriginDate.getMonth() == 5||this.curOriginDate.getMonth() == 8||this.curOriginDate.getMonth() == 10) &&this.curOriginDate.getDate() + index >= 32){
          curOrigin.setDate(this.curOriginDate.getDate() + index+1);
        }else if(this.curOriginDate.getDate() > curOrigin.getDate() && this.curOriginDate.getMonth() == 1 && this.curOriginDate.getDate() + index >= 29){
            curOrigin.setDate(this.curOriginDate.getDate() + index + 3);
//            console.log(curOrigin);
        }
        if (curOrigin.getDate() < this.curOriginDate.getDate()) {
          curOrigin.setMonth(this.curOriginDate.getMonth() + 1);
        } else {
          curOrigin.setMonth(this.curOriginDate.getMonth());
        }
        if(this.curOriginDate.getMonth() == 0 && this.curOriginDate.getDate() < 7){
            if(curOrigin.getDate() <= 31){
              curOrigin.setFullYear(this.curOriginDate.getFullYear() - 1);
            }
        }

        if (curOrigin.getMonth() == 0 && curOrigin.getDate() == 1 && isYear) {
          this.curYear += 1;
        } else if (this.curYear < this.curOriginDate.getFullYear()) {
          this.curYear = this.curOriginDate.getFullYear();
        }
        curOrigin.setYear(this.curYear);
        let month = (curOrigin.getMonth() + 1);
        if (month < 10) {
          month = +'0' + "" + month
        }
        if (isYear) {
          return curOrigin.getFullYear() + "-" + month + "-" + curOrigin.getDate();
        }
        return month + "-" + curOrigin.getDate();
      },
      getDateWithOutYear(index){
        let date = new Date(); //当前日期
        let newDate = new Date();
        newDate.setDate(date.getDate() + index);//官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
        let month = (newDate.getMonth() + 1);
        if (month < 10) {
          month = 0 + '' + month
        }
        let time = month + "-" + newDate.getDate();
        return time;
      },
      getDateFormatCN(index){
        return "周" + "日一二三四五六".charAt((new Date().getDay() + index) % 7);
      },
      changeWeek: function (list) {
        this.selectMonth = list;
        let qdate = list.date;
        let self = this;
        this.$axios.get(this.ApiRoute.getschedulebycoach + '?date=' + qdate, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            self.infos = result.data
          } else {
          }
        }).catch(function (response) {
          // 这里是处理错误的回调
        });
        this.hasSelect = []
        list.select = !list.select
        let c = 0;
        for (let lists in this.week) {
          if (this.week[c].date != list.date) {
            this.week[c].select = false;
          }
          c++;
        }

      }
    }
  }
</script>
<style>
  @import "../../../static/css/style.css";
  /* public */
  .schedule .clear:after {
    content: '';
    display: block;
    clear: both;
  }

  .schedule .left {
    float: left;
  }

  .schedule .right {
    float: right;
  }

  .schedule {
    font-size: 1.8rem;
    padding-bottom: 4.5rem;
  }

  .schedule .times > .day {
    position: relative;
    width: 100%;
    /*height: 4.6rem;*/
    border-bottom: 1px solid #ccc;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    overflow-x: scroll;
  }

  .schedule .times {
    width: 85%;
  }

  .schedule .times > .day > li {
    /*float: left;*/
    width: 14.5%;
    padding: .8rem 0;
    color: #ccc;
    display: inline-block;
    vertical-align: middle;
  }

  .schedule .times > .day > li.active {
    padding: 0;
    border: 1px solid #ccc;
    border-bottom: none;
    color: #E95726;
  }

  .schedule .times > .day > li.active > span {
    display: block;
    font-size: 1.8rem;
  }

  .schedule > div.add {
    position: absolute;
    right: 0;
    width: auto;
    padding: 0rem 1.1rem;
    background: #ccc;
    color: #fff;
    font-size: 4rem;
    border-radius: 50%;
    float: left;
    margin-top: -4.5rem;
  }

  .schedule > .studentInfo > li {
    padding: 2.5rem 1rem;
    border-bottom: 1px solid #ccc;
  }

  .schedule > .studentInfo > li .user {
    float: left;
    width: 20%;
    margin-right: 1.8rem;
    text-align: center;
  }

  .schedule > .studentInfo > li .user img {
    display: block;
    margin-bottom: .8rem;
    width: 100%;
    border-radius: 50%;
  }

  .schedule > .studentInfo > li .classInfo {
    float: left;
    width: 75%;
  }

  .schedule > .studentInfo > li .classInfo > li {
    margin-bottom: 1.8rem;
  }

  .schedule > .studentInfo > li .classInfo h3 {
    margin: 0;
  }

  .schedule > .studentInfo > li .classInfo h3 + span {
    color: #E95726;
  }

  .schedule > .studentInfo > li .classInfo h4 {
    margin: 0;
    color: #777;
    font-weight: normal;
  }

  .schedule > .studentInfo > li .classInfo h4 > .icon {
    float: left;
    width: 1.2rem;
    height: 1.8rem;
    margin-right: .8rem;
    background: #ccc;
  }

  .schedule > .studentInfo > li .classInfo span.wait {
    color: #47C086;
  }

  .schedule > .studentInfo > li .classInfo .btn {
    margin: 0;
    padding-top: 1rem;
    text-align: right;
  }

  .schedule > .studentInfo > li .classInfo .btn > button {
    width: 10.9rem;
    height: 4.3rem;
    border-radius: 5px;
    font-size: 1.8rem;
  }

  .schedule > .studentInfo > li .classInfo .btn > button.sign {
    background: #A7A9AC;
    border: none;
    color: #fff;
  }

  .schedule > .studentInfo > li .classInfo .btn > button.qr {
    background: #8FC31F;
    color: #fff;
  }

  .schedule > .studentInfo > li .classInfo .btn > button.contact {
    background: #fff;
    border: 1px solid #8FC31F;
    color: #777;
  }
  .schedule > .studentInfo > li .classInfo .btn > button.cancel {
    background: #a3a3a3;
    border: 1px solid #8FC31F;
    color: #f3f3f3;
  }
</style>
