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
          <el-menu-item index="1-1">
            <router-link :to="{name:'myCollection'}" style="font-size: 16px"><a>我的收藏</a></router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link :to="{name:'mySubscription'}" style="font-size: 16px"><a>我的订阅</a></router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <router-link :to="{name:'myCreation'}" style="font-size: 16px"><a>我的创作中心</a></router-link>
          </el-menu-item>
          <el-menu-item index="1-4">
            <router-link :to="{name:'userUpdate'}" style="font-size: 16px"><a>个人中心</a></router-link>
          </el-menu-item>
          <el-menu-item index="1-5">注销登陆</el-menu-item>
        </el-submenu>
        <el-menu-item index="2" style="float: right">
          <router-link :to="{name:'order'}" style="font-size: 16px"><a>订单管理</a></router-link>
        </el-menu-item>
        <el-menu-item style="float: left;margin-left: 5%"><div id="logo">FFF影评网</div></el-menu-item>
        <el-menu-item index="4" style="float: left;margin-left: 3%"><a href="/">首页</a></el-menu-item>
        <el-submenu index="5" style="float: left">
          <template slot="title">资源</template>
          <el-menu-item index="5-1">电影</el-menu-item>
          <el-menu-item index="5-2">动漫</el-menu-item>
          <el-menu-item index="5-3">电视剧</el-menu-item>
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

    <div style="height: 200px">
      <el-image :src="src" style="height: 100%;width: 76%"></el-image>
    </div>

    <br>
    <div class="body1" style="width: 1500px;float: left">
        <template>
          <el-carousel trigger="click" :interval="5000" arrow="always" style="width: 640px;float: left;margin-left: 12%;margin-top: 1%">
            <el-carousel-item v-for="item in 4" :key="item">
            </el-carousel-item>
          </el-carousel>
        </template>
      <div style="float: right;margin-right: 16%">
        <span style="margin-right:15%;font-size: 20px">站长推荐</span>
        <el-table
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            prop="name"
            label="电影"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="评分">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <br>

    <div class="body2" style="width: 1500px;float: left;margin-top: 2%">
      <div style="float: left;width: 100%">
      <div style="float: left;margin-left: 12%;font-size: 22px">最近热门</div>
          <el-pagination
            style="float: left"
            background
            layout="prev,next"
            :page-size="this.videoParams.size"
            :current-page="this.videoParams.page"
            v-on:current-change="videoChangePage"
            :total="videoTotal">
          </el-pagination>
        <div style="margin-left: 49%;font-size: 20px">电影排行</div>
        <br>

      </div>
      <br>
      <el-row style="margin-left: 12%">
        <el-col :span="3" v-for="(video,index) in video" :key="video.videoId" :offset="0">
          <!--<router-link :to="{name:'videoDetail'}">-->
          <el-card :body-style="{ padding: '0px' }" style="width: 90%">
            <router-link :to="{name:'videoDetail',params:{videoId:video.videoId}}">
              <img :src="video.videoPic" class="image">
            </router-link>
            <div style="padding: 10px;">
              <div style="margin-top: 4%">{{video.videoName}}</div>
              <div style="margin-top: 4%">评分 :  {{video.videoGrade}}</div>
            </div>
            <br>
          </el-card>

        </el-col>

        <div style="float: right;margin-right: 18%">
          <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              prop="name"
              label="电影"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="评分">
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <br><br>
      <div style="float: left;width: 100%">
        <div style="float: left;margin-left: 12%;font-size: 22px">最新上映</div>
        <el-pagination
          style="float: left"
          background
          layout="prev,next"
          :page-size="this.video1Params.size"
          :current-page="this.video1Params.page"
          v-on:current-change="video1ChangePage"
          :total="video1Total">
        </el-pagination>
        <div style="margin-left: 49%;font-size: 20px">新番排行</div>
        <br>
      </div>
      <br>
      <el-row style="margin-left: 12%">
        <el-col :span="3" v-for="(video1,index) in video1" :key="video1.videoId" :offset="0">
          <el-card :body-style="{ padding: '0px' }" style="width: 90%">
            <router-link :to="{name:'videoDetail',params:{videoId:video1.videoId}}">
              <img :src="video1.videoPic" class="image">
            </router-link>
            <div style="padding: 10px;">
              <div style="margin-top: 4%">{{video1.videoName}}</div>
              <div style="margin-top: 4%">评分 :  {{video1.videoGrade}}</div>
            </div>
            <br>
          </el-card>
        </el-col>
        <div style="float: right;margin-right: 18%">
          <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              prop="name"
              label="电影"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="评分">
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <br><br>
      <div style="float: left;width: 100%">
        <div style="float: left;margin-left: 12%;font-size: 22px">评分最高</div>
        <el-pagination
          style="float: left"
          background
          layout="prev,next"
          :page-size="this.video2Params.size"
          :current-page="this.video2Params.page"
          v-on:current-change="video2ChangePage"
          :total="video2Total">
        </el-pagination>
        <div style="margin-left: 49%;font-size: 20px">电视剧排行</div>
        <br>
      </div>
      <br>
      <el-row style="margin-left: 12%">
        <el-col :span="3" v-for="(video2,index) in video2" :key="video2.videoId" :offset="0">
          <el-card :body-style="{ padding: '0px' }" style="width: 90%">
            <router-link :to="{name:'videoDetail',params:{videoId:video2.videoId}}">
              <img :src="video2.videoPic" class="image">
            </router-link>
            <div style="padding: 10px;">
              <div style="margin-top: 4%">{{video2.videoName}}</div>
              <div style="margin-top: 4%">评分 :  {{video2.videoGrade}}</div>
            </div>
            <br>
          </el-card>
        </el-col>
        <div style="float: right;margin-right: 18%">
          <el-table
            :data="tableData"
            style="width: 100%;">
            <el-table-column
              prop="name"
              label="电影"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="评分">
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <br><br>
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
  import ElHeader from "../../node_modules/element-ui/packages/header/src/main";
  export default {
    components: {ElHeader},
    data() {
      return {
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model
        src:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4155496476,3511395253&fm=26&gp=0.jpg",
        video:[],
        video1:[],
        video2:[],
        videoTotal:0,
        video1Total:0,
        video2Total:0,
        videoParams:{size:4,page:1},
        video1Params:{size:4,page:1},
        video2Params:{size:4,page:1},
        tableData: [{
          name: '王小虎',
          address: '9.8'
        }, {
          name: '王小虎',
          address: '9.5'
        }, {
          name: '王小虎',
          address: '9.4'
        }, {
          name: '王小虎',
          address: '9.4'
        }]
      };
    },
    mounted(){
      this.query();
      this.query1();
      this.query2();
    },
    methods: {
      handleSelect(key, keyPath) {   // 头部handleSelect函数
        console.log(key, keyPath);
      },
      query(){
        var url ="api/filmreview-video/video/findVideo/"+this.videoParams.page+"/"+this. videoParams.size;
        axios.get(url).then(res=>{
          this.video=res.data.videoList;
          this.videoTotal=res.data.videoTotal;
        })
      },
      query1(){
        var url ="api/filmreview-video/video/getDataByShowTime/"+this.video1Params.page+"/"+this.video1Params.size;
        axios.get(url).then(res=>{
          this.video1=res.data.videoList;
          this.video1Total=res.data.videoTotal;
        })
      },
      query2(){
        var url ="api/filmreview-video/video/getDataByVideoGander/"+this.video2Params.page+"/"+this.video2Params.size;
        axios.get(url).then(res=>{
          this.video2=res.data.videoList;
          this.video2Total=res.data.videoTotal;
        })
      },
      videoChangePage:function (page) {
        this.videoParams.page = page;
        this.query();
      },
      video1ChangePage:function (page) {
        this.video1Params.page = page;
        this.query1();
      },
      video2ChangePage:function (page) {
        this.video2Params.page = page;
        this.query2();
      }
    }
  }
</script>

<style>

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

  /*轮播图*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: seashell;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: whitesmoke;
  }

  /*卡片*/
  /*调整图片及卡片大小*/

  .image {
    width: 100%;
    height: 200px;
  }

</style>
