<template>
  <div style="background-color: #DFFDFF">
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
    <br>
<div><h2>记录你的每时每刻...</h2></div>
    <div>
      <el-form :model="creation" style="height: 77px">
        <el-form-item prop="article">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="creation.article">
      </el-input>
          <el-upload
            class="upload-demo"
            action="/api/filmreview-personalcenter/creation/getPath/"
            :on-success="creationPath" list-type="picture">
            <el-button size="small" type="primary"  icon="el-icon-camera-solid"></el-button>
            <!--<div slot="tip" class="el-upload__tip"></div>-->
          </el-upload>
        </el-form-item><br/>
      <el-button class="comment" type="primary" @click="art()">发表</el-button>
      </el-form>
      <!--<el-input ref="creationAllMessage" v-model="creationAllMessage.article" type="text" placeholder="请输入内容"></el-input>-->
      <!--<el-button type="danger" icon="el-icon-search" plain @click="art(creationAllMessage.article)">发布</el-button>-->

      <div class="demo-image__lazy" style="width: 30%;float: right;margin-right: 7%;margin-top: 100px;">
      <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
      </div>
    </div><br/>
<div style="width: 63%">
  <el-container v-for="(creationAllMessage,index) in creationAllMessage" :key="creationAllMessage">
    <el-header style="height: 45px">{{creationAllMessage.userName}}
    </el-header>
    <el-container>
      <el-aside width="200px"> <img :src="creationAllMessage.creationPic" style="width:200px;height:150px;"></el-aside>
      <el-main>{{creationAllMessage.article}}
        <el-button type="danger" icon="el-icon-delete" circle style="float: right;margin-left: -3%;margin-top: -6px"@click="deleteCreation(creationAllMessage.creationId)"></el-button>
      </el-main>
    </el-container>
  </el-container>

</div>
    <br>

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
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  export default {
    components: {ElForm},
    data () {
      return {
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model
        msg:'',
        showItem:false,
        typeKey1:'电影',
        typeKey2:'动漫',
        typeKey3:'电视剧',
        urls: [
          'http://q02obletz.bkt.clouddn.com/tyhj.jpg',
          'http://q02obletz.bkt.clouddn.com/001.jpg',
          'http://q02obletz.bkt.clouddn.com/%E4%B8%9C%E4%BA%AC03.jpeg',
          'http://q02obletz.bkt.clouddn.com/tyhj.jpg',
          'http://q02obletz.bkt.clouddn.com/wzzd.jpg'
        ],
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        creation:{article:'',creationPic: '',},
        creationAllMessage: {
          creationId: '',
          creationPic: '',
          article: '',
          creationStatus: '',
          userName: '',
          userPic: '',
        }
      }
    },
    mounted(){
      this.queryUser();
      this.getCreationAllMessage();
    },
    methods:{
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
        this.$router.push("/")
      },
      deleteCreation:function (creationId) {
        var url = "/api/filmreview-personalcenter/creation/deleteUserCreation"
        axios.post(url, {creationId: creationId}).then(res => {
          this.getCreationAllMessage();
          if (res.data != null) {
            this.getCreationAllMessage();
          }
        })
      },
      getCreationAllMessage:function () {
        axios.post('/api/filmreview-personalcenter/creation/findUserCreation').then(res=>{
          // alert(res.data)
          console.log(res.data)
          this.creationAllMessage=res.data;
          })
      },
      creationPath:function (response,file,fileList) {
      this.creation.creationPic=response;
      alert(this.creation.creationPic);
    },

      art:function () {
     // this.$router.push({path:"/findlike/"+routeName})
        var url="api/filmreview-personalcenter/creation/addUserCreation"
        axios.post(url,this.creation).then(res=>{
           // alert("56546")
         // alert(res.data)
          if(res.data!=null){
            this.creation=res.data
            this.getCreationAllMessage();
            this.$router.go(0)
          }
        })
    },
      handleSelect(key, keyPath) {   // 头部handleSelect函数
        console.log(key, keyPath);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }

</script>

<style>
  .el-button--danger {
    width: 41px;
  }
  .el-form{width: 100%}
  .upload-demo{width: 63%}
  .comment {
    float: right;
    margin-right: 20%;
    margin-top: -50px
  }

  .el-button--small, .el-button--small.is-round {
    padding: 14px 28px;
    float: right;
    margin-right: -645px;
    margin-top: 13px;
  }
  .el-textarea {
    width: 50%;
  }
  .el-textarea {
    font-size: 14px;
    margin-top: -60px;
  }
  .el-upload-list--picture .el-upload-list__item {
    border-radius: 0px;
    margin-top: -67px;
    padding: 0px 0px 1px 86px;
    height: 72px;
    width: 50%;
    margin-left: 49%}

  .element.style {
    height: 35px;
  }
  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: left;
    width: 79%;
    height: 100%;
    margin-left: 19%;
    float: left;
    line-height: 20px;
    padding: 12px 20px;
    font-size: 23px;
  }
  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: center;
    margin-left: 19%;
    height: 100%;
  }
  .el-main {
    /*background-color: lightyellow;*/
    color: #333;
    text-align: left;
    margin-right: 2%;
    margin-left: 0%;
    width: 79%;
    float: left;
    line-height: 25px;
    height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }








  .el-textarea__inner {
    width: 100%;
    margin-left: 11%;
    height: 150px;
    margin-top: 50px;
    padding: 8px 10px;
  }
  .a {
    color: #42b983;
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

  .footer {
    background-color: #262426;
    padding: 56px 0;
    margin: 0 auto;
    min-width: 1200px;
    margin-top: 0px;
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
</style>

