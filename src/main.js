import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from '@/router/router'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
