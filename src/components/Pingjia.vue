<template>
  <div class="pingjia-container">
    <div class="pjheader">
      <img :src="coach.headimg"/>
      <div style="float: left;text-align: left;font-size: 3rem;margin: 1rem">
        <span style="font-weight: bold">{{coach.cname}}</span>
        <span style="font-weight: bold">{{coach.ctitle}}</span>
        <div class="storename">
          {{coach.sporthall}}
        </div>
      </div>
    </div>
    <div style="height: 10rem;margin-top: 2rem">
      <div class="block" style="width: 100%;text-align: left">
        <span style="float: left;font-size: 2.5rem;padding-right: 3rem;margin-left: 1rem"
              class="demonstration">打星</span>
        <el-rate
          v-model="value2"
          :allow-half="true"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
        >
        </el-rate>
      </div>
    </div>
    <div style="margin-bottom: 3rem">
      <el-input type="textarea" v-model="desc" placeholder="教练教的如何？环境怎么样？服务满意吗？" style="font-size: 2rem"></el-input>
    </div>
    <div>
      <div style="margin: 1rem;text-align: left">
        <el-upload
          :action="this.ApiRoute.uploadimage"
          list-type="picture-card"
          :multiple="true"
          :auto-upload="true"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          name="images"
         :data="{uid:uid}"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="full">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
    <div style="">
      <x-button @click.native="submit1" class="submitpj" type="primary">发表评价</x-button>
    </div>
  </div>
</template>
<script>
  import {XButton} from 'vux'
  export default {
    components: {
      XButton,
    },
    created(){
      let coachId = this.$route.query.cid;
      let self = this;
      this.$axios.get(this.ApiRoute.getmycourse + '?type=2&cid=' + coachId, {}, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      }).then(function (response) {
        let result = response.data.response;
        if (200 == result.code) {
          let data = result.data
          self.uid = result.uid;
          if (data.length > 0) {
            self.coach = data[data.length - 1];
//            console.log(self.coach)
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
        coach: null,
        value2: 5,
        desc: '',
        dialogImageUrl: '',
        dialogVisible: false,
        imageIds: [],
        uid: ''
      };
    },
    methods: {
      handleRemove(file, fileList) {
        let id = file.response.response.data;
        for (let i in this.imageIds) {
          if (id == this.imageIds[i]) {
            this.imageIds.splice(i, 1);
            break;
          }
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response, file, fileList){
        if (response.response.code == 200) {
          this.imageIds.push(response.response.data);
        }
      },
      submit1(){
        let images = this.imageIds.join(',');
        let self = this;
        this.$axios.get(this.ApiRoute.userevaluate + '?content=' + this.desc + '&score=' + (this.value2 * 2) + '&imgs=' + images + '&cid=' + this.coach.coid + '&courselogid=' + this.coach.id, {}, {
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          },
          withCredentials: true
        }).then(function (response) {
          let result = response.data.response;
          if (200 == result.code) {
            alert('评论成功');
//            self.$router.push({path: '/OverClass'})
            window.location.href = 'OverClass';
          } else {
            if (109 == result.code) {
//              self.$router.push({path:'/Login'})
              location.href = "http://crmapi.24parking.com.cn/Mobile/Api/getoauthinfo?reurl=" + location.href;
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
  .pingjia-container {
  }

  .pingjia-container .submitpj {
    width: 100%;
    height: 5rem !important;
    color: #f3f3f3 !important;
    background-color: #ff6600 !important;
    font-size: 2rem;
  }

  .pingjia-container .block {
    border: .1rem #ccc solid;
    font-size: 2.5rem;
    line-height: 6rem;
    padding: 2rem 0;
    height: 10rem;
  }

  .pingjia-container .pjheader {
    width: 100%;
    height: 14rem;
    border: .1rem #ccc solid;
  }

  .pingjia-container .storename {
    border: .1rem #ccc solid;
    background-color: #ccc;
    font-size: 2rem;
    margin-top: 1rem;
    text-align: center;
  }

  .pingjia-container .pjheader img {
    float: left;
    width: 10rem;
    height: 10rem;
    border-radius: 10rem;
    margin: 1rem;
  }

  .pingjia-container .el-rate__icon {
    font-size: 2.5rem !important;
  }

  .pingjia-container .el-upload--picture-card {
    width: 12rem;
    height: 12rem;
    line-height: 12rem;
    margin: 1rem;
  }

  .pingjia-container .el-rate {
    line-height: 7rem;
  }

  .pingjia-container .el-textarea__inner {
    height: 18rem;
    font-size: 1.8rem;
  }

  .pingjia-container .el-upload-list--picture-card .el-upload-list__item {
    width: 12rem;
    height: 12rem;
    margin: 1rem;
  }

  .pingjia-container .el-button, .el-textarea__inner {
    font-size: 1.8rem;
    box-sizing: border-box;
  }

  .pingjia-container .el-button--primary {
    background-color: #ea5826;
    border-color: #ea5826;
  }
</style>
