<template>
  <div class="note" style="height: 100%; width: 100%">
    <!--<h1>{{msg}}</h1>-->
    <el-container>
      <el-header style="height: 100px">
        <div style="height: 20%"></div>
      </el-header>
      <el-main>
        <div style="height: 100%">
          <el-tabs :tab-position="tabPosition" style="height: 100%;">
            <el-tab-pane label="首页">定时任务补偿</el-tab-pane>
            <el-tab-pane label="用户管理">
              <div>
                <el-tabs v-model="userActive">
                  <el-tab-pane label="查找" name="first">
                    <div style="width: 20%;">
                      <el-input placeholder="请输入内容" v-model="userKey" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="findUserByKey()"></el-button>
                      </el-input>
                    </div>
                    <div style="margin-top: 2%">
                      <el-table :data="user2" stripe style="width: 100%">
                        <el-table-column prop="userId" label="编号"></el-table-column>
                        <el-table-column prop="userPic" label="头像"></el-table-column>
                        <el-table-column prop="userName"  label="用户名"></el-table-column>
                        <el-table-column prop="realName" label="真实姓名"></el-table-column>
                        <el-table-column prop="age" label="年龄"></el-table-column>
                        <el-table-column prop="gender" label="性别"></el-table-column>
                        <el-table-column prop="phone" label="电话号码"></el-table-column>
                        <el-table-column prop="email" label="邮箱"></el-table-column>
                        <el-table-column prop="userStatus" label="状态"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                        <el-table-column prop="roleId" label="角色"></el-table-column>
                        <el-table-column fixed="right" label="操作">
                          <template slot-scope="scope">
                            <el-button icon="el-icon-delete" circle @click="deleteUserById(user2.row.userId)" type="danger" size="small"></el-button>
                            <el-button icon="el-icon-edit" circle @click="toUserUpdate(user2.row.userId)" type="warning" size="small">编辑</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="this.userParams.size"
                        :current-page="this.userParams.page"
                        v-on:current-change="userChangePage"
                        :total="userTotal">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="添加" name="second">
                    <div>
                      <el-form :label-position="labelPosition" label-width="60%" :model="user1">
                        <el-form-item label="用户名" style="width: 60%; ">
                          <el-input v-model="user1.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" style="width: 60%; ">
                          <el-input v-model="user1.password"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" style="width: 60%; ">
                          <el-input v-model="user1.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="角色" style="width: 60%; ">
                          <el-input v-model="user1.roleId"></el-input>
                        </el-form-item>
                        <el-form-item label="用户状态" style="width: 60%; ">
                          <el-input v-model="user1.userStatus"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 60%">
                          <el-button type="primary" style="width: 50%" @click="userAdd()">提交</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="修改" name="three">
                    <div>
                      <el-form :label-position="labelPosition" label-width="60%" :model="user1">
                        <el-form-item label="用户名" style="width: 60%; ">
                          <el-input v-model="user1.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" style="width: 60%; ">
                          <el-input v-model="user1.password"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" style="width: 60%; ">
                          <el-input v-model="user1.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="角色" style="width: 60%; ">
                          <el-input v-model="user1.roleId"></el-input>
                        </el-form-item>
                        <el-form-item label="用户状态" style="width: 60%; ">
                          <el-input v-model="user1.userStatus"></el-input>
                        </el-form-item>
                        <el-form-item style="width: 60%">
                          <el-button type="primary" style="width: 50%" @click="userUpdate()">提交</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品管理">
              <div>
                <el-tabs v-model="commodityActive">
                  <el-tab-pane label="查找" name="first">
                    <div style="width: 20%;">
                      <el-input placeholder="请输入内容" v-model="commodityKey" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="findCommodityByKey()"></el-button>
                      </el-input>
                    </div>
                    <div style="margin-top: 2%">
                      <el-table :data="commodity2" stripe style="width: 100%">
                        <el-table-column prop="commodityId" label="商品编号"></el-table-column>
                        <!--<el-table-column prop="commodityPic" label="商品图"></el-table-column>-->
                        <el-table-column prop="commodityPic"  label="商品图">
                          <template slot-scope="commodity2">
                            <img :src="commodity2.row.commodityPic" width="60" height="40" class="commodityPic"/>
                          </template>
                        </el-table-column>
                        <el-table-column prop="commodityName"  label="商品名称"></el-table-column>
                        <el-table-column prop="description" label="商品描述"></el-table-column>
                        <el-table-column prop="commodityPrice" label="商品价格"></el-table-column>
                        <el-table-column prop="commodityNum" label="商品库存"></el-table-column>
                        <el-table-column prop="addTime" label="上架时间"></el-table-column>
                        <el-table-column prop="outTime" label="下架时间"></el-table-column>
                        <el-table-column prop="address" fixed="right" label="操作">
                          <template slot-scope="commodity2">
                            <el-button icon="el-icon-delete" circle @click="deleteCommodity(commodity2.row.commodityId)" type="danger" size="small"></el-button>
                            <el-button icon="el-icon-edit" circle type="warning" size="small" @click="toCommodityUpdate(commodity2.row.commodityId)"></el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="this.commodityParams.size"
                        :current-page="this.commodityParams.page"
                        v-on:current-change="commodityChangePage"
                        :total="commodityTotal">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="添加" name="second">
                    <div style="float: left; width: 30%;">
                      <el-upload class="upload-demo" action="/api/filmreview-commodity/commodity/getCommodityPicPath" :on-success="commodityPicUpload1" list-type="picture">
                        <el-button size="small" type="primary">点击上传图片</el-button>
                      </el-upload>
                    </div>
                    <div style="float: right;width: 30%;margin-right: 35%">
                      <el-form :label-position="labelPosition" :model="commodity3">
                        <el-form-item >
                          <el-input  placeholder="请输入商品名称"v-model="commodity3.commodityName"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input placeholder="请输入商品描述" v-model="commodity3.description"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="请输入商品价格"  v-model="commodity3.commodityPrice"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input placeholder="请输入商品库存" v-model="commodity3.commodityNum"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-date-picker v-model="commodity3.addTime" align="right" type="date" placeholder="选择上架日期"
                                          :picker-options="pickerOptions2" style="width: 100%; " format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                          <el-date-picker v-model="commodity3.outTime" align="right" type="date" placeholder="选择下架日期"
                                          :picker-options="pickerOptions1" style="width: 100%; " format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" style="width: 50%" @click="commodityAdd()">提交</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane name="three">
                    <div style="float: left; width: 30%;">
                      <el-upload class="upload-demo" action="/api/filmreview-commodity/commodity/getCommodityPicPath" :on-success="commodityPicUpload2" list-type="picture">
                        <el-button size="small" type="primary">点击上传修改图片</el-button>
                      </el-upload>
                    </div>
                    <div style="float: right;width: 30%;margin-right: 35%">
                      <el-form :label-position="labelPosition">
                        <el-form-item prop="description">
                          <el-input placeholder="商品名称"  v-model="commodity1.commodityName"></el-input>
                        </el-form-item>
                        <el-form-item prop="description">
                          <el-input placeholder="商品描述" v-model="commodity1.description"></el-input>
                        </el-form-item>
                        <el-form-item prop="commodityPrice">
                          <el-input placeholder="商品价格" v-model="commodity1.commodityPrice"></el-input>
                        </el-form-item>
                        <el-form-item prop="commodityNum">
                          <el-input placeholder="商品库存" v-model="commodity1.commodityNum"></el-input>
                        </el-form-item>
                        <el-form-item prop="outTime">
                          <el-date-picker v-model="commodity1.outTime" type="date" placeholder="选择下架日期"
                                          format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width: 100%; "></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" style="width: 50%" @click="commodityUpdate()">提交</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane label="视频资源管理">
              <div>
                <el-tabs v-model="videoActive">
                  <el-tab-pane label="查找" name="first">
                    <div style="width: 20%;">
                      <el-input placeholder="请输入内容" v-model="videoKey" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="findVideoByKey()"></el-button>
                      </el-input>
                    </div>
                    <div style="margin-top: 2%">
                      <el-table :data="video2" stripe style="width: 100%">
                        <el-table-column prop="videoId" label="视频编号"></el-table-column>
                        <el-table-column prop="videoPic"  label="视频图">
                          <template slot-scope="video2">
                            <img :src="video2.row.videoPic" width="60" height="40" class="videoPic"/>
                          </template>
                        </el-table-column>
                        <el-table-column prop="videoName" label="视频名称"></el-table-column>
                        <el-table-column prop="classify" label="视频分类"></el-table-column>
                        <el-table-column prop="videoDirector" label="导演"></el-table-column>
                        <el-table-column prop="videoRole" label="主演"></el-table-column>
                        <el-table-column prop="videoProducer" label="出品方"></el-table-column>
                        <el-table-column prop="videoReview" label="影评"></el-table-column>
                        <el-table-column prop="videoGrade" label="评分"></el-table-column>
                        <el-table-column prop="videoLanguage" label="语言"></el-table-column>
                        <el-table-column prop="videoShowTime" label="上映时间" width="100"></el-table-column>
                        <el-table-column prop="videoLength" label="时长"></el-table-column>
                        <el-table-column prop="videoType" label="类型"></el-table-column>
                        <el-table-column prop="visible" label="是否会员看"></el-table-column>
                        <el-table-column prop="showIndex" label="是否首页展示"></el-table-column>
                        <el-table-column prop="collectionOrsubscription" label="允许收藏或订阅"></el-table-column>
                        <el-table-column prop="videoStatus" label="视频状态"></el-table-column>
                        <el-table-column prop="videoUrl" label="视频地址"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
                        <el-table-column prop="address" fixed="right" label="操作" width="100">
                          <template slot-scope="video2">
                            <el-button icon="el-icon-delete" circle @click="deleteVideo(video2.row.videoId)" type="danger" size="small"></el-button>
                            <el-button icon="el-icon-edit" circle type="warning" size="small" @click="toVideoUpdate(video2.row.videoId)"></el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="this.videoParams.size"
                        :current-page="this.videoParams.page"
                        v-on:current-change="videoChangePage"
                        :total="videoTotal">
                      </el-pagination>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="添加" name="second">
                    <div style="float: left; width: 30%;">
                      <div style="height: 200px">
                        <el-upload class="upload-demo" action="/api/filmreview-video/video/getVideoPicPath" :on-success="videoPicUpload" list-type="picture">
                          <el-button size="small" type="primary">点击上传图片</el-button>
                        </el-upload>
                      </div>
                      <div>
                        <el-upload class="upload-demo" action="/api/filmreview-video/video/getVideoPath" :on-success="videoUpload" list-type="picture">
                          <el-button size="small" type="primary">点击上传视频</el-button>
                        </el-upload>
                      </div>
                    </div>
                    <div style="float: right;width: 30%;margin-right: 35%">
                      <el-form :label-position="labelPosition"  :model="video3">
                        <el-form-item >
                          <el-input placeholder="视频名称" v-model="video3.videoName"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频分类" v-model="video3.classify"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频描述" v-model="video3.videoDirector"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频语言" v-model="video3.videoLanguage"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频类型" v-model="video3.videoType"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频时长" v-model="video3.videoLength"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="出品方" v-model="video3.videoProducer"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="主演" v-model="video3.videoRole"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-date-picker v-model="video3.videoShowTime" align="right" type="date" placeholder="选择上映日期"
                                          :picker-options="pickerOptions3" style="width: 100%; " format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="收藏或订阅" v-model="video3.collectionOrsubscription"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="是否会员看" v-model="video3.visible"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频状态" v-model="video3.videoStatus"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" style="width: 50%" @click="videoAdd()">提交</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane name="three">
                    <div style="float: left; width: 30%;">
                      <el-upload class="upload-demo" action="/api/filmreview-video/video/getVideoPicPath" :on-success="videoPicUpload2" list-type="picture">
                        <el-button size="small" type="primary">点击上传修改图片</el-button>
                      </el-upload>
                    </div>
                    <div style="float: right;width: 30%;margin-right: 35%">
                      <el-form :label-position="labelPosition" :model="video1">
                        <el-form-item>
                          <el-input placeholder="视频名称" v-model="video1.videoName"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input placeholder="视频类型" v-model="video1.classify"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频描述" v-model="video1.videoDirector"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频语言" v-model="video1.videoLanguage"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频类型" v-model="video1.videoType"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="视频时长" v-model="video1.videoLength"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="出品方" v-model="video1.videoProducer"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-input placeholder="主演" v-model="video1.videoRole"></el-input>
                        </el-form-item>
                        <el-form-item >
                          <el-date-picker v-model="video1.videoShowTime" align="right" type="date" placeholder="选择上映日期"
                                          :picker-options="pickerOptions3" style="width: 100%; " format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                          <el-input placeholder="收藏或订阅" v-model="video1.collectionOrsubscription"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input placeholder="是否会员看" v-model="video1.visible"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input placeholder="视频状态" v-model="video1.videoStatus"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button type="primary" style="width: 50%" @click="videoUpdate()">提交</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane label="订单管理" name="four">

            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../node_modules/element-ui/packages/input/src/input";
  import axios from 'axios';
  export default{
    components: {
      ElInput,
      ElFormItem,
      ElForm},
    data(){
          return{
              msg:"adminIndex",
              userActive:'first',
              commodityActive:'first',
              videoActive:'first',
              tabPosition: 'left',
              labelPosition:'left',

            user1:{userId:'',userName:'',realName:'',password:'',age:'',gender:'',userPic:'',phone:'',email:'',userStatus:'',address:'',roleId:''},
            user2:[],
            userKey:'',
            userTotal:0,
            userParams:{page:1,size:4},

            commodity1:{commodityId:'',commodityName:'',commodityPic:'',description:'',commodityPrice:'',commodityNum:'',addTime:'',outTime:'',commodityInfo1:''},
            commodity3:{commodityId:'',commodityName:'',commodityPic:'',description:'',commodityPrice:'',commodityNum:'',addTime:'',outTime:'',commodityInfo1:''},
            commodity2:[],
            commodityFile:'',
            commodityKey:'',
            commodityTotal:0,
            commodityParams:{size:4,page:1},

            video1:{videoId:'',videoName:'',videoDirector:'',videoRole:'',videoProducer:'',videoReview:'',videoGrade:'',videoLanguage:'',videoShowTime:'',videoLength:'',videoType:'',visible:'',videoPic:'',showIndex:'',createTime:'',collectionOrsubscription:'',videoStatus:'',videoUrl:'',classify:''},
            video3:{videoId:'',videoName:'',videoDirector:'',videoRole:'',videoProducer:'',videoReview:'',videoGrade:'',videoLanguage:'',videoShowTime:'',videoLength:'',videoType:'',visible:'',videoPic:'',showIndex:'',createTime:'',collectionOrsubscription:'',videoStatus:'',videoUrl:'',classify:''},
            video2:[],
            videoKey:'',
            videoTotal:0,
            videoParams:{size:4,page:1},

            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() < Date.now();
              },
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }]
            },
            pickerOptions2: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }]
            },
            pickerOptions3: {
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }]
            },

          }
      },
    mounted(){
      this.userQuery();
      this.commodityQuery();
      this.videoQuery();
    },
    methods:{
      toUserUpdate:function (userId) {
        this.userActive = 'three';
        alert("到修改页面" + userId);
      },
      userQuery:function () {
//        alert("查询用户");
      },
      findUserByKey:function () {
        alert("根据条件用户查询");
      },
      deleteUserById:function (userId) {
        alert("删除用户" + userId);
      },
      userAdd:function () {
        alert("添加用户");
      },
      userUpdate:function () {
        alert("修改用户");
      },
      userChangePage:function (page) {
        this.userParams.page = page;
        this.userQuery();
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
                 this.commodity2 = res.data.commodityList;
                 this.commodityTotal = res.data.total;
             }
          });
      },
      toCommodityUpdate:function (commodityId) {
        this.commodityActive = 'three';
        var url = "/api/filmreview-commodity/commodity/findCommodityById/"+commodityId;
        axios.get(url).then(res =>{
          this.commodity1 = res.data;
        });
      },
      findCommodityByKey:function () {
        var url = "/api/filmreview-search/search/searchCommodity?keys="+this.commodityKey+"/&page="+this.commodityParams.page+"&size="+this.commodityParams.size
        axios.get(url).then(res =>{
            if(res.data != null){
                console(res.data.commodityList);
              this.commodity1 = res.data.commodityList;
              this.commodityTotal = res.data.total;
            }
        });
      },
      commodityPicUpload1:function (res) {
        this.commodity3.commodityPic = res
      },
      commodityAdd:function () {
          var url = "/api/filmreview-commodity/commodity/saveCommodity";
          axios.post(url,this.commodity3).then(res =>{
            if(res.data.code == 1){
                this.commodityActive = 'first';
                this.$message({
                  message:'添加成功',
                  type:'success'
                });
                this.commodityQuery();
            }else {
              this.$message.error("添加失败");
            }
          });
        alert("添加商品");
      },
      deleteCommodity:function (commodityId) {
          alert(commodityId);
          var url = "/api/filmreview-commodity/commodity/deleteCommodity?id="+commodityId;
          axios.post(url).then(res =>{
            if(res.data.code == 1){
              this.$message({
                message:'删除成功',
                type:'success'
              });
              this.commodityQuery();
            }else {
              this.$message.error("删除失败");
            }
          });
        alert("删除商品")
      },
      commodityPicUpload2:function (res) {
        this.commodity1.commodityPic = res;
      },
      commodityUpdate:function () {
          var url = "api/filmreview-commodity/commodity/updateCommodity";
          console.log(this.commodity1);
          axios.post(url,this.commodity1).then(res =>{
              alert(res.data.code)
             if(res.data.code == 1){
               this.$message({
                 message:'修改成功',
                 type:'success'
               });
               this.commodityQuery();
               this.commodityActive = 'first';
             }else {
               this.$message.error("修改失败");
             }
          });
      },

      videoQuery:function () {
          var url = "api/filmreview-video/video/findVideo/"+this.videoParams.page+"/"+this.videoParams.size;
          axios.get(url).then(res =>{
             if(res.data != null){
                 this.video2 = res.data.videoList;
                 this.videoTotal = res.data.videoTotal;
             }
          });
      },
      videoChangePage:function (page) {
        this.videoParams.page = page;
        this.videoQuery();
      },
      toVideoUpdate:function (videoId) {
        this.videoActive = 'three';
        var url = "api/filmreview-video/video/findVideoById/"+videoId;
        axios.get(url).then(res =>{
            if (res.data != null){
                this.video1 = res.data;
            }
        })
        alert("到修改页面" + videoId);
      },
      findVideoByKey:function () {
          var url = "/api/filmreview-search/videoSearch/selectVideoByPage?page="+this.videoParams.page+"&size="+this.videoParams.size+"&keys="+this.videoKey;
          axios.get(url).then(res =>{
             if(res.data != null){
//                 this.video2 = '',
                 this.video2 = res.data.videoList;
                 this.total = res.data.videoTotal;
             }
          });
        alert("根据key查询video");
      },
      videoPicUpload:function (res) {
        alert(res);
        this.video3.videoPic = res;
      },
      videoPicUpload2:function (res) {
        this.video1.videoPic = res;
      },
      videoUpload:function (res) {
          alert(res);
        this.video3.videoUrl = res;
      },
      videoAdd:function () {
          var url = "/api/filmreview-video/video/saveVideo";
          axios.post(url,this.video3).then(res =>{
              if(res.data.code == 1){
                  this.$message({
                    message:'添加成功',
                    type:'success'
                  });
                this.videoQuery();
                this.videoActive = 'first';
              }else {
                  this.$message.error('添加失败');
              }
          });
        alert("添加video");
      },
      deleteVideo:function (videoId) {
          var url = "/api/filmreview-video/video/deleteVideo?id="+videoId;
          axios.post(url).then(res =>{
             if(res.data.code == 1){
               this.$message({
                 message:'删除成功',
                 type:'success'
               })
               this.videoQuery();
             }else {
                 this.$message.error('删除失败');
             }
          });
        alert("删除video")
      },
      videoUpdate:function () {
        var url = "/api/filmreview-video/video/updateVideo";
        axios.post(url,this.video1).then(res =>{
          if(res.data.code == 1){
            this.$message({
              message:'修改成功',
              type:'success'
            });
            this.videoQuery();
            this.videoActive = 'first';
          }else {
            this.$message.error("修改失败");
          }
        });
      },


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
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    /*line-height: 20%;*/
    height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 80%;*/
    height: 80%;
  }
</style>
