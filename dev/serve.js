import Vue from 'vue';
import Dev from './serve.vue';
import plugin from '@/entry'

Vue.config.productionTip = false;
Vue.use(plugin)
new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
