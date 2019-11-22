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

    <br>
<div><h2>我的订单</h2></div>
    <div>

      <template>

        <el-tabs :tab-position="tabPosition" style="height: 100%;">
          <el-tab-pane label="全部订单">
            <template>
              <el-table
                :data="tableData"
                border
                style="width: 100%;">
                <el-table-column
                  fixed
                  prop="orderNum"
                  label="订单编号"
                  width="170">
                </el-table-column>
                <el-table-column
                  prop="commodityName"
                  label="商品名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="commodityPic"
                  label="商品图片"
                  width="150">
                  <template   slot-scope="tableData">
                    <img :src="tableData.row.commodityPic"  min-width="100%" height="100px" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="commodityPrice"
                  label="价格"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="描述"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="订单状态"
                  width="150">
                  <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus==1">已支付</span>
                    <span v-else>未支付</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="tableData">
                    <el-button @click="deleteOrder(tableData.row.id)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>

          </el-tab-pane>
          <el-tab-pane label="已支付订单">
            <template>
              <el-table
                :data="tableData1"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="orderNum"
                  label="订单编号"
                  width="170">
                </el-table-column>
                <el-table-column
                  prop="commodityName"
                  label="商品名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="commodityPic"
                  label="商品图片"
                  width="150">
                  <template   slot-scope="tableData1">
                    <img :src="tableData1.row.commodityPic"  min-width="100%" height="100px" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="commodityPrice"
                  label="价格"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="描述"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="订单状态"
                  width="150">
                  <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus==1">已支付</span>
                    <span v-else>未支付</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="tableData1">
                    <el-button @click="deleteOrder1(tableData1.row.id)"  type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="未支付订单">
            <template>
              <el-table
                :data="tableData2"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="orderNum"
                  label="订单编号"
                  width="170">
                </el-table-column>
                <el-table-column
                  prop="commodityName"
                  label="商品名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="commodityPic"
                  label="商品图片"
                  width="150">
                  <template   slot-scope="tableData2">
                    <img :src="tableData2.row.commodityPic"  min-width="100%" height="100px" />
                  </template>
                </el-table-column>
                <el-table-column
                  prop="commodityPrice"
                  label="价格"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="描述"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="订单状态"
                  width="150">
                  <template slot-scope="scope">
                    <span v-if="scope.row.orderStatus==1">已支付</span>
                    <span v-else>未支付</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="tableData2">
                    <el-button @click="deleteOrder2(tableData2.row.id)"  type="text" size="small">删除</el-button>
                    <el-button  type="text" size="small" @click="pay(tableData2.row.commodityId,tableData2.row.commodityName,tableData2.row.commodityPrice)">支付</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </template>

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
  export default {
    data () {
      return {
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model
        msg:'',
        showItem:false,
        typeKey1:'电影',
        typeKey2:'动漫',
        typeKey3:'电视剧',
        tabPosition: 'left',
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model
        tableData: [],
        tableData1: [],
        tableData2: [],
      }
    },
    mounted(){
      this.queryUser();
      this.getOrderAllMessage();
      this.getPayOrder();
      this.getNoPayOrder();
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
      pay:function (commodityId,commodityName,commodityPrice) {
        alert(commodityPrice+""+commodityName)
        axios.post("api/filmreview-pay/alipay/pay",{commodityId:commodityId,commodityName:commodityName,commodityPrice:commodityPrice}).then(res1=>{
          this.$router.replace({
            path: '/applyText',
            query: {html: res1.data}
          })
        })
      },
      //      订单删除
      deleteOrder:function(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url="api/filmreview-order/order/deleteOrderByOrderId"
          axios.post(url,{id:id}).then(res=> {
            if (res.data!=null) {
              this.getOrderAllMessage();
              this.getPayOrder();
              this.getNoPayOrder();
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
      },
      //      未支付订单删除
      deleteOrder2:function(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url="api/filmreview-order/order/deleteOrderByOrderId"
          axios.post(url,{id:id}).then(res=> {
            if (res.data!=null) {
              this.getNoPayOrder();
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
      },
//      已支付订单删除
      deleteOrder1:function(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var url="api/filmreview-order/order/deleteOrderByOrderId"
          axios.post(url,{id:id}).then(res=> {
            if (res.data!=null) {
              this.getPayOrder()
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
      },
      getOrderAllMessage:function () {
        //alert("1564")
        axios.post('api/filmreview-order/order/findAllOrder').then(res=>{
          //alert(res.data)
          console.log(res.data)
          this.tableData=res.data;
        })
      },
        getPayOrder:function () {
          axios.post('api/filmreview-order/order/payOrder').then(res=>{
           // alert(res.data)
            console.log(res.data)
            this.tableData1=res.data;
          })
        },
          getNoPayOrder:function () {
            axios.post('api/filmreview-order/order/noPayOrder').then(res=>{
             // alert(res.data)
              console.log(res.data)
              this.tableData2=res.data;
            })
          },
      handleSelect(key, keyPath) {   // 头部handleSelect函数
        console.log(key, keyPath);
      },
      handleClick(row) {
        console.log(row);
      }
    }
  }
</script>

<style>

  a {
    color: #42b983;
  }
/*表*/
  .el-tabs__nav-scroll{
    margin-left: 8%;
  }
  .el-tabs__content {
    margin-right: 6%;
  }
  .el-tabs--left .el-tabs__header.is-left, .el-tabs--left .el-tabs__header.is-right, .el-tabs--left .el-tabs__nav-scroll, .el-tabs--left .el-tabs__nav-wrap.is-left, .el-tabs--left .el-tabs__nav-wrap.is-right, .el-tabs--right .el-tabs__header.is-left, .el-tabs--right .el-tabs__header.is-right, .el-tabs--right .el-tabs__nav-scroll, .el-tabs--right .el-tabs__nav-wrap.is-left, .el-tabs--right .el-tabs__nav-wrap.is-right {
    height: 100%;margin-left: 6%;
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
</style>

