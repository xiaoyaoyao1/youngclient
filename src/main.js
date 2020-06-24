import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Print from './common/print'
import store from "./store";

Vue.use(ElementUI)
Vue.use(Print)

Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.config.productionTip = false

router.beforeEach(function(to,from,next) {
  let username = store.state.username;
  console.log(username)
  if (to.meta.requireAuth) {
    if (username != null) {
      next();
      return
    }
    next('/')
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')


