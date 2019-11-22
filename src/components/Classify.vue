<template>
  <div class="note" style="height: 100%; width: 100%">
    <el-container>
      <el-header style="background-color: cornflowerblue; height: 100px">

      </el-header>
      <el-main style="">
       <div style="float: left; width: 80%">
         <div style=" height: 120px ; width: 70%; margin: auto">
           <ul class="menu1">
             <li class="li" @click="findVideoByType()"><el-link type="info">全部类型</el-link></li>
             <li class="li" @click="findVideoByType('冒险')"><el-link type="info">冒险</el-link></li>
             <li class="li" @click="findVideoByType('动作')"><el-link type="info">动作</el-link></li>
             <li class="li" @click="findVideoByType('剧情')"><el-link type="info">剧情</el-link></li>
             <li class="li" @click="findVideoByType('热血')"><el-link type="info">热血</el-link></li>
             <li class="li" @click="findVideoByType('神话')"><el-link type="info">神话</el-link></li>
             <li class="li" @click="findVideoByType('游戏')"><el-link type="info">游戏</el-link></li>
             <li class="li" @click="findVideoByType('吸血鬼')"><el-link type="info">吸血鬼</el-link></li>
             <li class="li" @click="findVideoByType('爱情')"><el-link type="info">爱情</el-link></li>
             <li class="li" @click="findVideoByType('悬疑')"><el-link type="info">悬疑</el-link></li>
             <li class="li" @click="findVideoByType('历史')"><el-link type="info">历史</el-link></li>
             <li class="li" @click="findVideoByType('奇幻')"><el-link type="info">奇幻</el-link></li>
             <li class="li" @click="findVideoByType('喜剧')"><el-link type="info">喜剧</el-link></li>
             <li class="li" @click="findVideoByType('惊悚')"><el-link type="info">惊悚</el-link></li>
           </ul>
         </div>
         <div style=" height: 100px;margin-top: 15px">

         </div>
         <div style="width: 80%;margin: auto">
          <div>
            <el-row>
              <el-col :span="8" v-for="(video1, index) in video1" :key="index" style="width: 25%; margin-top: 25px">
                <div>
                  <el-card :body-style="{ padding: '0px' }" style="width: 70%">
                    <router-link :to="{name:'VideoPlay',params:{videoId:video1.videoId}}">
                      <img :src="video1.videoPic" class="image" style="height: 200px">
                    </router-link>
                  </el-card>
                </div>
                <div style="margin-top: 10px; width: 40%">
                  <span class="name">{{video1.videoName}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
         </div>
       </div>
        <div style="background-color: black;float: left;width: 20%;height: 300px"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import axios from 'axios';
  export default{
      name:'Classify',
      data(){
          return{
            menuCode:' ',
            menuParams:{page:1,size:8},
            video1:[],
          }
      },
    mounted(){
     this.findVideoByType();
    },
    methods:{
      toIndex:function () {
        alert("toIndex");
      },

      findVideoByType:function (typeKey) {

        this.menuCode = typeKey;
        if(typeKey == null){
            var url = '/api/filmreview-search/videoSearch/findVideoByClassify?page='+this.menuParams.page+"&size="+this.menuParams.size+"&keys=动漫";
            axios.post(url).then(res =>{
              this.video1 = res.data.videoList;
              console.log(this.video1);
            });
        }else{
          alert(typeKey);
          var url = '/api/filmreview-search/videoSearch/findVideoByType?page='+this.menuParams.page+"&size="+this.menuParams.size+"&classifyKey=动漫"+"&typeKey="+typeKey;
          axios.post(url).then(res =>{
            console.log(res.data);
            this.video1 = null;
            this.video1 = res.data.videoList;
          });
        }
      }
    }
  }
</script>
<style scoped>
  .note{
    position: absolute;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    overflow-y: auto;
  }
</style>
<style>
  .li{
    list-style: none;
    float: left;
    width: 15%;
    margin-top: 15px;
  }
  .image {
    width: 100%;
    display: block;
  }
  .name{
    font-size: 14px;
  }
</style>
