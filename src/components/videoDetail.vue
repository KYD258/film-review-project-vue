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
        <el-menu-item index="4" style="float: left;margin-left: 3%"><a href="/">首页</a></el-menu-item>
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

    <br>

    <!--视频信息-->

    <div class="a" style="float: left;width: 100%">
      <div style="float: left;margin-left: 20%">
        <el-image
          style="width: 250px; height: 290px"
          :src=video.videoPic>
        </el-image>
      </div>
        <div class="e">
          <el-row :gutter="20">
            <el-col :span="18">
              <div style="float: left;margin-left: 3%">电影名称 :&nbsp <span class="sp">{{video.videoName}}</span></div>
            </el-col>
            <el-col :span="18">
              <div class="detail">导演 :&nbsp <span class="sp">{{video.videoDirector}}</span></div>
            </el-col>
            <el-col :span="18">
              <div class="detail">演员 :&nbsp <span class="sp">{{video.videoRole}}</span></div>
            </el-col>
            <el-col :span="18">
              <div class="detail">制片人 :&nbsp <span class="sp">{{video.videoProducer}}</span></div>
            </el-col>
            <el-col :span="18">
              <div class="detail" ><span style="float: left">评分:&nbsp</span>
                <span class="sp" v-html='video.videoGrade==0?  "暂无评分" : video.videoGrade '></span>
                <!--<el-rate-->
                  <!--v-model="video.videoGrade"-->
                  <!--style="float: left;margin-top: 4px"-->
                  <!--disabled-->
                  <!--show-score-->
                  <!--text-color="#ff9900">-->
                <!--</el-rate>-->
              </div>
            </el-col>
            <el-col :span="18">
                <div class="detail">语言 :&nbsp <span class="sp">{{video.videoLanguage}}</span></div>
            </el-col>
            <el-col :span="18">
              <div class="detail">上映时间 :&nbsp <span class="sp">{{video.videoShowTime}}</span></div>
            </el-col>
            <el-col :span="18">
              <div class="detail">时长 :&nbsp <span class="sp">{{video.videoLength}}分钟</span></div>
            </el-col>
            <el-col :span="18">
              <div class="detail">类型 :&nbsp <span class="sp">{{video.videoType}}</span></div>
            </el-col>
          </el-row>
        </div>
    </div>
      <div style="float: left;margin-left: 20%;margin-top:1%;margin-bottom: 2%; font-size: 18px">影评 :{{video.videoReview}}</div>
    <div>
      <div style="float: left;width: 100%"><h2 style="float: left;margin-left: 20%">用户评论</h2>
        <el-button icon="el-icon-edit" type="primary" @click="dialogFormVisible = true;queryCount()" style="font-size: 16px">我要写短评</el-button>
        <el-button icon="el-icon-star-off" type="success" @click="collection()" style="font-size: 16px">加入收藏</el-button>
        <el-dialog title="评论" :visible.sync="dialogFormVisible">
          <el-form :model=" review">
            <el-form-item label="短评" :label-width="formLabelWidth" prop="reviewContent">
              <el-input  v-model=" review.reviewContent" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="评分" :label-width="formLabelWidth">
              <el-rate
                v-model="review.reviewGrade"
                allow-half="true"
                text-color="#ff9900">
              </el-rate>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save();dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>

      </div>
      <div style="padding-top: 20px"></div>
    </div>

    <br>

    <!--评论-->
    <div>
    <el-container  v-for="(getReview,index) in getReview" :key="index" style="width: 70%;margin-left: 15%">
      <!--<el-aside width="15%"><el-divider></el-divider>{{getReview.userName}}<el-divider></el-divider></el-aside>-->
      <el-container style="float: left">
        <el-main><el-divider></el-divider><span style="float: left">{{getReview.userName}}</span>
          <el-rate
            v-model="getReview.reviewGrade"
            disabled
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
          <span>{{getReview.reviewGrade*2}}</span>
          <br>
          <span style="margin-top: 10px">{{getReview.reviewContent}}</span>
          <el-divider>{{getReview.reviewCreateTime}}</el-divider></el-main>
      </el-container>
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
  import ElDivider from "../../node_modules/element-ui/packages/divider/src/main";
  import ElCol from "element-ui/packages/col/src/col";
export default {
  components: {
    ElCol,
    ElDivider},
  data () {
    return {
      activeIndex: "1",  //当前激活菜单的 index
      input3: '', //搜索的v-model
      getReview: [],
      video:[],
      dialogFormVisible: false,
      review: {
        reviewContent: '',
        videoId: '',
        reviewGrade: null
      },
      formLabelWidth: '120px',
    }
  },
  mounted() {
    this.queryVideo();
    this.queryReview();
  },
  methods:{
    handleSelect(key, keyPath) {   // 头部handleSelect函数
      console.log(key, keyPath);
    },
    queryVideo:function () {
      var url="api/filmreview-video/video/findVideoById/"+this.$route.params.videoId
      axios.get(url).then(res=>{
          this.video=res.data;

      })
    },
    queryReview:function () {
      var id=this.$route.params.videoId;
      var url ="api/filmreview-review/review/findByVideoId"
      axios.post(url,{videoId:id}).then(res=>{
        this.getReview=res.data;
      })
    },
    save:function () {
      var id=this.$route.params.videoId;
      this.review.videoId=id;
      var url="api/filmreview-review/review/save"
      axios.post(url,this.review).then(res=>{
          if(res.data!=null){
            alert("评论成功")
            location.reload();
          }else {
              alert("评论失败")
          }
      })
    },
    collection:function(){
      var id=this.$route.params.videoId;
      var url="api/filmreview-personalcenter/collection/saveCollection"
      axios.post(url,{videoId:id}).then(res=>{
        if(res.data.code==1){
          alert("收藏成功")
        }else {
            alert("收藏失败")
        }
      })
    },
    queryCount:function(){
      var id=this.$route.params.videoId;
      var url="api/filmreview-review/review/findCount"
      axios.post(url,{videoId:id}).then(res=>{
        if(res.data!=null&&res.data!="") {
          this.review=res.data;
        }
      })
    }
  }
}
</script>

<style>

a {
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


.e {
  margin-left: 500px;
  font-size: 18px;
}
  .el-card__body{
    padding: 2%;
  }

.el-col-24 {
  width: 100%;

}
  .con{
    font-size: 18px;
    float: left;
    margin-left: 50%;
  }

  .detail{
    float: left;
    margin-left: 3%;
    margin-top: 1%
  }

  /*评论*/
.el-main {
  background-color: rgba(233, 238, 243, 0);
  color: #333;
  text-align: left;
  line-height: 30px;
  width: 100%;
  float: left;
  padding: 0px;
}
  .sp{
    font-size: 18px;
  }
  .el-rate{
    float: left;
    margin-left: 2%;
    margin-top: 4px;
  }
.el-rate__text {
  font-size: 18px;
  vertical-align: middle;
}

</style>
