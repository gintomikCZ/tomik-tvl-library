//import styles
import '@/assets/styles/colors.css'
import '@/assets/styles/common.css'
import '@/assets/styles/variables.css'

// Import vue components
import * as components from '@/lib-components/index';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far)
console.log(components)
// install function executed by Vue.use()
const install = function installTomikTvlLibrary(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('FontAwesomeIcon', FontAwesomeIcon)
  console.log(components)
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Create module definition for Vue.use()
const plugin = {
  install
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ('false' === process.env.ES_BUILD) {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
}
// Default export is library as a whole, registered via Vue.use()
export default plugin;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
