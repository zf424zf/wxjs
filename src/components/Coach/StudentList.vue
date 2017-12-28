<template>
  <div class="studentlists">
    <div class="header">
      <p class="title">请选择您要约课的学员</p>
      <hr/>
      <el-input
        placeholder="请输入学员姓名或者手机号"
        icon="search"
        :on-icon-click="handleIconClick"
        size="large"
        style="height: 4rem"
        v-model="search"
      >
      </el-input>
    </div>
    <div v-if="!!lists.length">
      <ul>
        <li v-for="item in lists" class="student-item" @click="openPopUp(item)">
          <img :src="item.headimg"/>
          <div class="student-info">
            <p>{{item.name}}</p>
            <p>{{item.phone}}</p>
          </div>
          <div class="right-arrow">
            <img class="" src="../../assets/卓赢健身切图_icon.个人中心.7向右箭头.png" style="float: left;"/>
          </div>
        </li>
      </ul>
      <div id="loadMore" v-show="loadMore">正在加载</div>
      <div id="loadMoreing" v-show="loadMoreing">正在加载</div>
      <div id="noMoreData" v-show="loadMore?false:!loadMoreing">已显示全部任务</div>
    </div>
    <!--<div id="loadMoreing" v-else-if="loadMoreing">正在加载</div>&lt;!&ndash; 页面渲染时 &ndash;&gt;-->
    <div v-else class="text-center" style="padding: 2rem 5rem; color: rgba(0, 0, 0, 0.3);">没有更多数据了，亲</div>
    <div v-transfer-dom class="choosecourse">
      <popup v-model="showPopUp" :hide-on-blur="true" width="100%">
        <p class="title">请选择预约课程-{{who}}</p>
        <div class="courseList">
          <ul v-for="course in userCourseLog">
            <li style="border-bottom: .1rem #cccccc solid" @click="yueke(course.id,course)">
              <p>课程名：{{course.name}}</p>
              <p>进度：{{course.currenthours == null ? 0 : course.currenthours}}/{{course.totalhours}}</p>
            </li>
          </ul>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import {TransferDom, Popup} from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components: {
      Popup
    },
    created(){
      let self = this;
      this.$axios.get(this.ApiRoute.searchstudent, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (result.code == 200) {
          let data = result.data;
          if (data != null) {
            self.lists = data;
            for (let index in self.lists) {
              let item = self.lists[index];
              for (let i in item.courselog) {
                let course = item.courselog[i];
                if (course.isexperience == 1) {
                  self.lists[index].courselog[i].isShow = true;
                  self.hasTY[item.uid] = true
                } else {
                  self.lists[index].courselog[i].isShow = false;
                }

              }
            }
          }
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
    data(){
      return {
        lists: {},
        search: '',
        showPopUp: false,
        userCourseLog: {},
        isShow: true,
        loadMore: true,
        loadMoreing: true,
        pageid: 0,
        hasTY: {},
        curUid: 0,
        who:''
      }
    },
    mounted  () {
      window.addEventListener('scroll', this.handleScroll);
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
        this.$axios.get(this.ApiRoute.searchstudent + '?pageid=' + pageid, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (result.code == 200) {
            self.loadMoreing = false;
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
              //处理课耗
              for (let index in self.lists) {
                let item = self.lists[index];
                for (let i in item.courselog) {
                  let course = item.courselog[i];
                  if (course.isexperience == 1) {
                    self.lists[index].courselog[i].isShow = true;
                    self.hasTY[item.uid] = true
                  } else {
                    self.lists[index].courselog[i].isShow = false;
                  }
                }
              }
            }
          } else {

          }
        }).catch(function (response) {
          // 这里是处理错误的回调
        });
      },
      yueke: function (oid, course) {
        console.log(this.hasTY);
        console.log(this.curUid);
        if (this.hasTY[this.curUid]) {
          if (course.isShow) {
            window.location.href = '/Coach/ChooseClass?oid=' + oid;
          } else {
            alert('请先约体验课！')
          }
        } else {
          window.location.href = '/Coach/ChooseClass?oid=' + oid;
        }
      },
      openPopUp: function (item) {
          this.who = item.name
        this.showPopUp = true;
        this.userCourseLog = item.courselog;
        this.curUid = item.uid;
      },
      handleIconClick: function () {
        let self = this;
        this.$axios.get(this.ApiRoute.searchstudent + '?keyword=' + this.search, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (result.code == 200) {
            let data = result.data;
            self.lists = data;
          } else {

          }
        }).catch(function (response) {
          // 这里是处理错误的回调
        });
      }
    }
  }
</script>
<style>
  .choosecourse p {
    height: 2rem;
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
  }

  .choosecourse .title {
    height: 4rem;
    border-bottom: .1rem #ccc solid
  }

  .studentlists .title {
    font-size: 2rem;
    font-weight: bold;
  }

  hr {
    background-color: #ea5826;
    border-color: #ea5826;
  }

  .studentlists .el-input__inner {
    font-size: 2.3rem;
    height: 4rem !important;
  }

  .studentlists .el-input__icon {
    width: 7rem;
    font-size: 2.3rem;
    color: #ea5826;
  }

  .studentlists .el-input__inner:hover {
    border-color: #ea5826;
  }

  .studentlists .student-item {
    height: 10rem;
    width: 100%;
  }

  .studentlists .student-item img {
    float: left;
    width: 6rem;
    margin: 1rem;
    border-radius: 6rem;
    -moz-border-radius: 6rem;
    -webkit-border-radius: 6rem;
  }

  .studentlists .student-item .student-info {
    float: left;
    margin-left: 2rem;
  }

  .studentlists .student-item .student-info p {
    font-size: 1.8rem;
    margin: 1.2rem 2rem;
    text-align: left;
  }

  .studentlists .right-arrow {
    top: 2rem;
    float: right;
    margin-right: 1.5rem;
    position: relative;
  }

  .studentlists .right-arrow img {
    width: 1rem;
  }
</style>
