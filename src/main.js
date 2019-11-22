// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';
import VideoPlayer from 'vue-video-player';
import ('video.js/dist/video-js.css');
import ('vue-video-player/src/custom-theme.css')

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.use(VideoPlayer);

// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// require('videojs-contrib-hls/dist/videojs-contrib-hls');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
