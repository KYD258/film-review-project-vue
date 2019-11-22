<template>
    <div>
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#fff"
          text-color="#333"
          font-size="20px"
          active-text-color="red">
          <el-submenu index="1" style="float: right;margin-right: 5%">
            <template slot="title">
              <router-link type="info" v-if="msg=='登录'" :to="{name:'login'}" style="color:black">{{msg}}</router-link>
              <router-link type="info" v-else :to="{name:'userUpdate'}" style="color:black"> <el-avatar :src="msg"></el-avatar></router-link>
            </template>
            <el-menu-item v-if="showItem" index="1-1">
              <router-link :to="{name:'myCollection'}" style="font-size: 16px"><a>我的收藏</a></router-link>
            </el-menu-item>
            <el-menu-item v-if="showItem" index="1-2">
              <router-link :to="{name:'mySubscription'}" style="font-size: 16px"><a>我的订阅</a></router-link>
            </el-menu-item>
            <el-menu-item v-if="showItem" index="1-3">
              <router-link :to="{name:'myCreation'}" style="font-size: 16px"><a>我的创作中心</a></router-link>
            </el-menu-item>
            <el-menu-item v-if="showItem" index="1-4">
              <router-link :to="{name:'userUpdate'}" style="font-size: 16px"><a>个人中心</a></router-link>
            </el-menu-item>
            <el-menu-item v-if="showItem" index="1-5">
              <router-link :to="{name:'order'}" style="font-size: 16px"><a>我的订单</a></router-link>
            </el-menu-item>
            <el-menu-item v-if="showItem" index="1-6"><el-link :underline="false" @click="out()">退出登录</el-link></el-menu-item>
          </el-submenu>

          <el-menu-item style="float: left;margin-left: 5%"><div id="logo">FFF影评网</div></el-menu-item>
          <el-menu-item index="4" style="float: left;margin-left: 3%"><a href="/">首页</a></el-menu-item>
          <el-submenu index="5" style="float: left">
            <template slot="title">资源</template>
            <el-menu-item index="5-1"><router-link :to="{name:'Classify',params:{typeKey:typeKey1}}">电影</router-link></el-menu-item>
            <el-menu-item index="5-2"><router-link :to="{name:'Classify',params:{typeKey:typeKey2}}">动漫</router-link></el-menu-item>
            <el-menu-item index="5-3"><router-link :to="{name:'Classify',params:{typeKey:typeKey3}}">电视剧</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="6" style="float: left">
            <router-link :to="{name:'creation'}" style="font-size: 16px"><a>创作中心</a></router-link>
          </el-menu-item>
          <el-menu-item index="7" style="float: left">
            <router-link :to="{name:'shop'}" style="font-size: 16px"><a>商城</a></router-link>
          </el-menu-item>

          <el-menu-item  style="float: right;width: 30%">
            <el-input placeholder="请输入内容"  v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="pic">
        <img src="http://q02obletz.bkt.clouddn.com/tyhj.jpg" style="width: 100%;height: 100px"/>
      </div>

      <div>
        <el-row>
          <el-col :span="8" v-for="(video, index) in video" :key="video" :offset="0">
            <el-card :body-style="{ padding: '0px' }">
              <router-link :to="{name:'videoDetail',params:{videoId:video.videoId}}">
                <img :src="video.videoPic" class="image">
              </router-link>
              <div style="padding: 14px;">
                <div>{{video.videoName}}</div>
                <div>评分 :  {{video.videoGrade}}</div>
                <div>
                  <el-button type="primary" icon="el-icon-delete" @click="deleteCollection(video.videoId)">取消收藏</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

</template>
<script>
  import axios from 'axios'
  export default {
    data() {

      return {
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model
        msg:'',
        showItem:false,
        typeKey1:'电影',
        typeKey2:'动漫',
        typeKey3:'电视剧',
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model
        currentDate: new Date(),
        video:[],
      // videos:{videoId:''}
      };
    },
    mounted(){
      this.queryUser();
      this.videoQuery()
    },
    methods: {
      queryUser:function () {
        axios.get("api/filmreview-personalcenter/user/getUserMessage").then(res=>{
          console.log(res.data)
          if(res.data==''){
            this.msg='登录'
          }else {
            this.msg=res.data.userPic;
            this.showItem=true;
          }
        })
      },
      out:function () {
        axios.get("api/user/loginOut").then(res=>{});
        location.reload();
      },
      handleSelect(key, keyPath) {   // 头部handleSelect函数
        console.log(key, keyPath);
      },
      videoQuery:function () {
        axios.get('/api/filmreview-personalcenter/collection/findCollection').then(res=>{
          alert(res.data)
          console.log(res.data)
          this.video=res.data;
        })
      },
      deleteCollection:function (videoId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url = "/api/filmreview-personalcenter/collection/deleteCollection"
          axios.post(url, {videoId: videoId}).then(res => {
            if (res.data != null) {
              this.videoQuery()
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  };
</script>

<style>
  .image {
    width: 100%;
    display: block;
    height: 250px;
  }
  .el-row {margin-left: 4%}
  .el-col-8 {
    width: 19.33333%;
  }
  .el-col-offset-2 {
    margin-left: 3%;margin-top: 20px;
  }
  .el-col-offset-2 {
    margin-left: 3%;margin-top: 20px;
  }
  .el-col-offset-0 {
    margin-left: 3%;margin-top: 20px;
  }




  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }





  .pic{width: 90%;height: 100px;margin-left: 5%;margin-right: 5%;background-color: blueviolet}




  .el-container.is-vertical {
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .el-container, .el-container.is-vertical, .el-drawer, .el-link, .el-steps--vertical {
    -webkit-box-direction: normal;
  }
  .el-container {
    margin-right: 5%;
  }
  .el-main {

    padding: 0px;
    width: 107%;
  }
  .el-header {
    background-color: white;
    color: #333;
    line-height: 60px;
    margin-left: 0%;
  }


  #app{
    margin-top: 0px;
  }
  .el-menu-item{
    font-size: 17px;
  }
  .el-submenu__title{
    font-size: 17px;
  }
  #logo{
    font-size: 30px;
  }
  a{
    text-decoration: none;
  }

  .footer {
    background-color: #262426;
    padding: 56px 0;
    margin: 0 auto;
    min-width: 1200px;
    margin-top: 82px;
    color: #ccc;
  }

  .footer a{
    color: #EF4238;
    font-size: 14px;
  }

  .credentials a{
    color: #ccc;
  }

  p {
    text-color: white;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }




  .element.style {
    width: 70%;
    transform-origin: left center;
    z-index: 2017;
    position: absolute;
    top: 255px;
    left: 266px;
  }
  .el-button {
    float: left;
    margin-left: 10%;
    margin-top: 60px;
  }
</style>
