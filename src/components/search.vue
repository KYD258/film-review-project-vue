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
          <template slot="title">admin</template>
          <el-menu-item index="1-1">我的收藏</el-menu-item>
          <el-menu-item index="1-2">我的订阅</el-menu-item>
          <el-menu-item index="1-3">个人中心</el-menu-item>
          <el-menu-item index="1-4">注销登陆</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" style="float: right">订单管理</el-menu-item>
        <el-menu-item index="3" style="float: right">消息中心</el-menu-item>
        <el-menu-item style="float: left;margin-left: 5%"><div id="logo">FFF影评网</div></el-menu-item>
        <el-menu-item index="4" style="float: left;margin-left: 3%">首页</el-menu-item>
        <el-menu-item index="5" style="float: left">电影</el-menu-item>
        <el-menu-item index="6" style="float: left">创作中心</el-menu-item>
        <el-menu-item index="7" style="float: left">商城</el-menu-item>

        <el-menu-item  style="float: right;width: 25%">
          <el-input placeholder="请输入内容"  v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-menu-item>
      </el-menu>
    </div>
    <div>
    </div>

    <div>
      <el-container>
        <el-aside width="100px"></el-aside>
        <el-container>
          <el-header>
            <div style="font-size: large;color: cadetblue;float: left;margin-top: 10px">相关搜索内容: </div>
          </el-header>
          <el-main>
            <div>
              <el-container style="height: 150px" v-for="(video,index) in video" :key="video" >
                <el-aside width="120px" id="side1">
               <router-link :to="{name:'VideoPlay',params:{videoId:video.videoId}}"><img :src="video.videoPic" width="100%" height="145px" /></router-link>
               </el-aside>
                 <el-main id="main1">
                      <br/>
                      <div style="float: left"><span style="font-size: small;font-weight: 700">片名：{{video.videoName}}</span></div>
                      <br/><br/>
                      <div style="float: left"><span style="font-size: small;font-weight: 700">导演：{{video.videoDirector}}</span></div>
                      <br/><br/>
                      <div style="float: left"><span style="font-size: small;font-weight: 700">主演：{{video.videoRole}}</span></div>
                 </el-main>
               <el-aside width="100px" id="side2">
                 <div style="margin-top: 100px">
                 <router-link :to="{name:'VideoPlay',params:{videoId:video.videoId}}"> <el-button style="width: 90px;height: 30px" plain><span style="font-size: small;font-weight: 800">点击观看</span></el-button></router-link>
                 </div>
                </el-aside>
              </el-container>
            </div>
          </el-main>
        </el-container>
        <el-aside width="500px"></el-aside>
      </el-container>
    </div>

    <div class="footer" style="float: left;width: 100%">
      <p class="friendly-links">
        关于FFF :
        <a href="http://ir.maoyan.com/s/index.php#pageScroll0" target="_blank">关于我们</a>
        <span></span>
        <a href="http://ir.maoyan.com/s/index.php#pageScroll1" target="_blank">管理团队</a>
        <span></span>
        <a href="http://ir.maoyan.com/s/index.php#pageScroll2" target="_blank">投资者关系</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        友情链接 :
        <a href="http://www.meituan.com" data-query="utm_source=wwwmaoyan" target="_blank">美团网</a>
        <span></span>
        <a href="http://www.gewara.com" data-query="utm_source=wwwmaoyan">格瓦拉</a>
        <span></span>
        <a href="http://i.meituan.com/client" data-query="utm_source=wwwmaoyan" target="_blank">美团下载</a>
        <span></span>
        <a href="https://www.huanxi.com" data-query="utm_source=maoyan_pc" target="_blank">欢喜首映</a>
      </p>
      <p class="friendly-links">
        商务合作邮箱：v@maoyan.com
        客服电话：10105335
        违法和不良信息举报电话：4006018900
      </p>
      <p class="friendly-links">
        用户投诉邮箱：tousujubao@meituan.com
        舞弊线索举报邮箱：wubijubao@maoyan.com
      </p>
      <p class="friendly-links  credentials">
        <a href="/about/licence/1" target="_blank">中华人民共和国增值电信业务经营许可证 京B2-20190350</a>
        <span></span>
        <a href="/about/licence/4" target="_blank">营业性演出许可证 京演（机构）（2019）4094号</a>
      </p>
      <p class="friendly-links  credentials">
        <a href="/about/licence/3" target="_blank">广播电视节目制作经营许可证 （京）字第08478号</a>
        <span></span>
        <a href="/about/licence/2" target="_blank">网络文化经营许可证 京网文（2019）3837-369号 </a>
      </p>
      <p class="friendly-links  credentials">
        <a href="/rules/agreement" target="_blank">FFF用户服务协议 </a>
        <span></span>
        <a href="/rules/rule" target="_blank">FFF平台交易规则总则 </a>
        <span></span>
        <a href="/rules/privacy" target="_blank">隐私政策 </a>
      </p>
      <p class="friendly-links  credentials">
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010102003232" target="_blank">京公网安备
          11010102003232号</a>
      </p>
      <p>FFF文化传媒有限公司</p>
      <p>
        &copy;2016
        FFF电影 maoyan.com</p>
      <div class="certificate">
        <a href="http://sq.ccm.gov.cn:80/ccnt/sczr/service/business/emark/toDetail/350CF8BCA8416C4FE0530140A8C0957E"
           target="_blank">
          <img src="http://p0.meituan.net/moviemachine/e54374ccf134d1f7b2c5b075a74fca525326.png" />
        </a>
        <a href="/about/licence/5" target="_blank">
          <img src="http://p1.meituan.net/moviemachine/805f605d5cf1b1a02a4e3a5e29df003b8376.png" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import ElHeader from "../../node_modules/element-ui/packages/header/src/main";
  import ElAside from "../../node_modules/element-ui/packages/aside/src/main";
  import ElContainer from "../../node_modules/element-ui/packages/container/src/main";

  export default{
    components: {
      ElContainer,
      ElAside,
      ElHeader},
      data(){
          return{
            activeIndex:"1",  //当前激活菜单的 index
            input3: '', //搜索的v-model
            src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4155496476,3511395253&fm=26&gp=0.jpg",
            video:{}

          }
      },
    methods:{
      handleSelect(key, keyPath) {   // 头部handleSelect函数
        console.log(key, keyPath);
      },

    },
    mounted(){
      var keyword=this.$route.params.key;
      var url = '/api/filmreview-search/videoSearch/selectVideoByPage?page=1&size=3&keys='+keyword;
      axios.post(url).then(res=>{
        if(res.data!=null){
          console.log(res.data)
          this.video=res.data

        }
      })

    }
  }
</script>
<style>
  .el-header, .el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    /*line-height: 60px;*/
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
  }
  /*头部*/
  #app{
    margin-top: 0px;
  }
  .el-menu-item{
    font-size: 16px;
  }
  .el-submenu__title{
    font-size: 16px;
  }
  #logo{
    font-size: 30px;
  }

  /*尾部*/
  a{
    text-decoration: none;
  }


</style>
