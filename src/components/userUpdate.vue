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
        <el-menu-item index="3" style="float: right">消息中心</el-menu-item>
        <el-menu-item style="float: left;margin-left: 5%"><div id="logo">FFF影评网</div></el-menu-item>
        <el-menu-item index="4" style="float: left;margin-left: 3%"><a href="/">首页</a></el-menu-item>
        <el-menu-item index="5" style="float: left">电影</el-menu-item>
        <el-menu-item index="6" style="float: left">
          <router-link :to="{name:'creation'}" style="font-size: 16px"><a>创作中心</a></router-link>
        </el-menu-item>
        <el-menu-item index="7" style="float: left">
          <router-link :to="{name:'shop'}" style="font-size: 16px"><a>商城</a></router-link>
        </el-menu-item>

        <el-menu-item  style="float: right;width: 25%">
          <el-input placeholder="请输入内容"  v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-menu-item>
      </el-menu>
    </div>

    <div style="margin: auto;width: 550px;">
      <el-form :label-position="labelPosition" label-width="80px" :model="tbUser">
        <el-upload
          class="avatar-uploader"
          action="api/trave-user-login/getPath"
          :show-file-list="false"
          :on-success="tbUserPath"
          :before-upload="beforeAvatarUpload">
          <img v-if="tbUser.pic" :src="tbUser.pic" class="avatar">
          <i v-else class="el-icon-plus
          avatar-uploader-icon"></i>
        </el-upload>
        <input v-model="tbUser.userId" hidden/>
        <el-form-item label="用户名">
          <el-input v-model="tbUser.loginName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="tbUser.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="tbUser.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="tbUser.age"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="tbUser.address"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="tbUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="tbUser.email"></el-input>
        </el-form-item>
        <el-button type="primary" :plain="true" @click="tbUserUpdate()" style="margin-left: 20px">确认修改</el-button>
      </el-form>
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
<style>
  .disabled{
    background-color: #ddd;
    border-color: #ddd;
    color:#57a3f3;
    cursor: not-allowed;
  }
</style>
<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        activeIndex:"1",  //当前激活菜单的 index
        input3: '', //搜索的v-model

        msg:'用户注册页面',
        labelPosition:'right',
        tbUser:{userId:'',oginName:'',realName:'',sex:'',age:'',address:'',password:'',phone:'',
          email:'',pic:''},
      }
    },
    mounted(){
      axios.get('/api/trave-user-login/getMsg').then(res=>{
        this.tbUser=res.data;
      })
    },
    methods:{
      handleSelect(key, keyPath) {   // 头部handleSelect函数
        console.log(key, keyPath);
      },
        tbUserUpdate:function () {
        this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/api/trave-user-login/tbUserUpdate',this.tbUser).then(res=> {
            if (res.data.code==1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      },
      tbUserPath:function (res,file) {
        this.tbUser.pic=res;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
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
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
