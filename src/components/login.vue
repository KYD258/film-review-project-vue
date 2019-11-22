<template>
  <div>
      <el-container style="background:url('../static/img/20151021171838_LdKWy.jpeg')">
        <!--<el-card>-->
        <!--<el-header>Header</el-header>-->
        <!--</el-card>-->
        <el-main>
          <el-card style="background:url('../static/img/20151021171838_LdKWy.jpeg');opacity: 0.8;width: 100%" >
          <div id="tabpane" >

            <el-card style="opacity: 0.8">
            <div>

              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane  name="sec" ></el-tab-pane>
                <el-tab-pane label="短信登录/注册" name="first">
                  <el-form :model="ruleFormCode" status-icon :rules="rules1" ref="ruleFormCode" label-width="100px" class="demo-ruleForm" style="margin-right: 15%">
                    <el-form-item label="手机号" prop="phone">
                      <el-input type="text" v-model="ruleFormCode.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                      <el-input type="text" v-model="ruleFormCode.code" autocomplete="off">
                      </el-input>
                      <span v-show="show" @click="getCode">获取验证码</span>
                      <span v-show="!show" class="count">{{count}} s</span>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleFormCode')">提交</el-button>
                      <el-button @click="resetForm('ruleFormCode')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane  name="for" ></el-tab-pane>
                <el-tab-pane label="密码登录" name="second">
                  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-right: 15%">
                    <el-form-item label="手机号" prop="phone">
                      <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="passWord">
                      <el-input type="password" v-model="ruleForm.passWord" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm1('ruleForm')">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
              <div style="line-height: 70px">
                <div>第三方登录:</div>
                <div>
                  <a href="https://github.com/login/oauth/authorize?client_id=533c85f004bb60a76651&scope=user,public_repo" target="_top" title="GIT登录" >GitHub</a>
                  <a href="https://openauth.alipaydev.com/oauth2/appToAppAuth.htm?app_id=2016101200671908&redirect_uri=http%3A%2F%2Flocalhost%3A8001%2FloginByAli"  target="_top" title="支付宝登录">支付宝</a>
                </div>
                <router-link type="info" :to="{name:'register'}" style="color:black"><div style="font-size: xx-small"> 点我注册！！！</div></router-link>
            </div>
            </el-card>
          </div>
          </el-card>
        </el-main>
      </el-container>
  </div>
</template>

<style>
  .el-header {
    background-color: rgba(141, 65, 225, 0);
    color: rgba(141, 65, 225, 0.04);
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: rgba(141, 65, 225, 0);
    color: rgba(141, 65, 225, 0);
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  #tabpane {
    width: 30%;
    height: 80%;
    float: right;
    margin-right: 10%;

  }
</style>
<script>
  import axios from 'axios'
  import ElCard from "../../node_modules/element-ui/packages/card/src/main";
  export default{
    components: {ElCard},

    data(){
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        }else if(!reg.test(this.ruleForm.phone)){
          callback(new Error('手机号格式不正确'));
        } else {
          if (this.ruleForm.phone !== '') {
//            this.$refs.ruleForm.validateField('Phone1');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePhone1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        }else if(!reg.test(this.ruleFormCode.phone)){
          callback(new Error('手机号格式不正确'));
        } else {
          if (this.ruleFormCode.phone !== '') {
//            this.$refs.ruleFormCode.validateField('Phone');
          }
          callback();
        }
      };
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };
      return {
        show: true,
        count: '',
        timer: null,
        activeName: 'first',
        ruleForm: {
          phone: '',
          passWord: '',
        },
        ruleFormCode: {
          phone: '',
          code: '',
        },
        rules: {
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          passWord: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        rules1: {
          phone: [
            { validator: validatePhone1, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            axios.post("api/user/loginByPhone",{"code":this.ruleFormCode.code,"phone":this.ruleFormCode.phone}).then(res=>{
                alert(res.data)
              if(res.data=="登陆成功！"){
                    this.$router.push("/index")
              }

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            axios.post("api/user/loginByPassword",{"phone":this.ruleForm.phone,"passWord":this.ruleForm.passWord}).then(res=>{
              alert(res.data)
              if(res.data=="success"){
                this.$router.push("/")
              }

            })


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getCode(){
          axios.get("api/user/sendCode").then(res=>{
              alert(res.data)
          })
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      }
    }
  }

</script>
<style scoped>

</style>
