import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueProgressBar from 'vue-progressbar'


// 自定义插件

import Notification from './global-components/notification'

// end 自定义插件

const options = {
  color: '#05a6f0',
  failedColor: '#874b4b',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
  position: "fixed",
  autoFinish: true,
}

Vue.use(VueProgressBar, options)
Vue.use(Notification)


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
