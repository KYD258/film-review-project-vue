<template>
  <div class="note" style="background-color: black">
    <div style="width: 60%; height: 400px; margin: auto; margin-top: 100px">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
      >
      </video-player>
    </div>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player';
  export default{
      name:"VideoPlay",
      data(){
          return{
            playerOptions:{
                autoplay:false,
                muted:false,
                loop:false,
                preload:'auto',
                language:'zh-CN',
                aspectRatio:'16:9',
                fluid:true,
                sources:[{
                    type:'video/mp4',
                    src:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'//视频地址
                }],
                poster:'',//封面地址
                width:document.documentElement.clientWidth,
                notSupportedMessage:'此视频暂时无法播放，请稍后再试',
            }

          }
      },
    components:{
      videoPlayer
    },
    mounted(){

    },
    methods:{
//      computed:{
//          player(){
//              return this.$refs.videoPlayer.player
//          },
//      }
    }
  }
</script>
<style type="text/css" scoped>
  .container{
    background-color: #efefef;
    min-height: 100%;
  }
  .note {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    overflow-y: auto
  }
</style>
