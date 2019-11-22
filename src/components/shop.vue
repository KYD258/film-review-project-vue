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

    <!--<div class="pic">-->
      <!--<img src="http://q02obletz.bkt.clouddn.com/tyhj.jpg" style="width: 100%;height: 100px"/>-->
    <!--</div>-->
<div>
  <template>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(commodity, index) in commodity" :key="index">
        <h3> <img :src="commodity.commodityPic" class="image" style="height: 300px"></h3>
      </el-carousel-item>
    </el-carousel>
  </template>

</div>
    <div>
      <el-row>
        <el-col :span="8" v-for="(commodity, index) in commodity" :key="index" :offset="0">
          <el-card :body-style="{ padding: '0px' }">
            <!--<router-link :to="{name:'videoDetail',params:{videoId:video.videoId}}">-->
              <img :src="commodity.commodityPic" class="image">
            <!--</router-link>-->
            <div style="padding: 14px;">
              <div>{{commodity.commodityName}}</div>
              <div>价格 : {{commodity.commodityPrice}}</div>
              <div>
                <el-button type="primary"  @click="pay(commodity.commodityId,commodity.commodityName,commodity.commodityPrice)">支付</el-button>
                <el-button type="text" @click="getUserMessage()">收货地址</el-button>

                <el-dialog title="请填写正确哦,我不负责的呦!" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="收货地址" :label-width="formLabelWidth">
                      <el-input v-model="user.address" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="userAddress()">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="this.commodityParams.size"
      :current-page="this.commodityParams.page"
      v-on:current-change="commodityChangePage"
      :total="commodityTotal">
    </el-pagination>

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
        user:{userId:'',userName:'',realName:'',passWord:'',age:'',gender:'',userPic:'',phone:'',
          email:'',userStatus:'',address:''},
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model
        currentDate: new Date(),
        commodity:[],
        commodityTotal:0,
        commodityParams:{size:6,page:1},
        // videos:{videoId:''}
      };
    },
    mounted(){
      this.queryUser();
      this.commodityQuery();
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
      pay:function (commodityId,commodityName,commodityPrice) {
        alert(commodityPrice+""+commodityName)
        axios.get('/api/filmreview-personalcenter/user/getUserMessage/').then(res => {
        if (res.data != null&&res.data!=""){
            //alert(res.data+"123")
            console.log(res.data)
              this.user = res.data;
          axios.post("api/filmreview-pay/alipay/pay",{commodityId:commodityId,commodityName:commodityName,commodityPrice:commodityPrice}).then(res1=>{
            this.$router.replace({
              path: '/applyText',
              query: {html: res1.data}
            })
          })
            }else {+
              alert("请登录后操作")
              this.$router.push("/login")
            }

          })


      },
      getUserMessage:function () {
        axios.get('/api/filmreview-personalcenter/user/getUserMessage/').then(res => {
       // alert(res.data+"123")
          console.log(res.data)
        if(res.data != null&&res.data!="") {
            this.user = res.data;
          this.dialogFormVisible = true;
          }else {
          alert("请登录后操作")
          this.$router.push("/login")
        }
        })
      },
      out:function () {
        axios.get("api/user/loginOut").then(res=>{});
        location.reload();
        this.$router.push("/")
      },

      userAddress:function () {
      this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/api/filmreview-personalcenter/user/updateUserMessage/',this.user).then(res=> {
          if (res.data.code==1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }
        })
        this.$router.go(0)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
      handleSelect(key, keyPath) {   // 头部handleSelect函数
        console.log(key, keyPath);
      },
      commodityChangePage:function (page) {
        this.commodityParams.page = page;
        this.commodityQuery();
      },
      commodityQuery:function () {
        var url = "/api/filmreview-commodity/commodity/getCommodityData/"+this.commodityParams.page+"/"+this.commodityParams.size;
        axios.get(url).then(res =>{
          if (res.data != null){
            console.log(res.data.commodityList)
            this.commodity = res.data.commodityList;
            this.commodityTotal = res.data.total;
          }
        });
      },
    }
  };
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
<style>
  .el-row {
    margin-left: 10%;
  }
  .image {
    width: 100%;
    display: block;
    height: 250px;
  }
  .el-row {margin-left: 4%}
  .el-col-8 {
    width: 25.33333%;
  }
  .el-col-offset-2 {
    margin-left: 3%;margin-top: 20px;
  }
  .el-col-offset-2 {
    margin-left: 3%;margin-top: 20px;
  }
  .el-col-offset-0 {
    margin-left: 5%;margin-top: 20px;
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
    margin-left: 38%;
    margin-top: 38px;
  }
  .el-pagination {
    margin-top: 30px;
  }
</style>
