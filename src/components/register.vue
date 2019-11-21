<template>
  <div style="background:url('../static/img/timg.jpg')">
    <div style="margin: auto;width: 550px;">
      <el-card style="opacity: 0.8">
        <h3>{{msg}}</h3>
        <div style="margin-left: 40%">
          <el-upload
            class="avatar-uploader"
            action="api/user/getPath"
            :show-file-list="false"
            :on-success="UserPath"
            :before-upload="beforeAvatarUpload">
            <img v-if="User.userPic" :src="User.userPic" class="avatar">
            <i v-else class="el-icon-plus
              avatar-uploader-icon"></i>
            <div></div>
          </el-upload>
        </div>
      <el-form :label-position="labelPosition" label-width="80px" :model="User">
        <el-form-item label="用户名">
          <el-input v-model="User.userName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="User.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="User.gender"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="User.age"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="User.address"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="User.passWord"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="User.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="User.email"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="code"></el-input>
        </el-form-item>
        <div style="margin-left: 20%">
        <el-button round :plain="true" :class="{disabled: !this.canClick}" @click="getCode()">{{content}}</el-button>
        <el-button type="primary" :plain="true" @click="register()" style="margin-left: 20px">注册</el-button>
        </div>
      </el-form>
      </el-card>
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
  import ElCard from "../../node_modules/element-ui/packages/card/src/main";
  export default {

    components: {ElCard},
    data(){
      return{
        msg:'注册',
        labelPosition:'right',
        User:{
          userName:'',realName:'',gender:'',age:'',address:'',passWord:'',phone:'',
          email:'',userPic:""
        },
        code:'',
        content:'发送验证码',
        totalTime:60,
        canClick:true
      }
    },
    methods:{
      getCode:function () {
        if (!this.canClick) return  //改动的是这两行代码
        this.canClick = false
        this.content = this.totalTime + 's后重新发送'
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + 's后重新发送'
          if (this.totalTime < 0) {
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true  //这里重新开启
          }
        },1000)
        axios.get("/api/user/sendCode/"+this.User.phone).then(res=>{
          if(res.data.code=="验证码已发送！请注意接收！"){
            this.$message({
              message: '短信发送成功，请输入验证码!',
              type: 'success'
            })
          }
        })
      },
      UserPath:function (res,file) {
        this.User.userPic=res;
        alert(this.User.userPic);
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
      register:function () {
        axios.post("/api/user/userReg",{"user":this.User,"code":this.code}).then(res=>{
            alert(res.data)
          if(res.data=="注册成功"){
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.$router.push('/login')
          }else {
            this.$router.push('/login')
            this.$message.error('注册失败')
          }
        })
      }

    }
  }
</script>
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
