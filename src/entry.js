//import styles
import { variables } from '@/assets/styles/variables.js'
// import '@/assets/styles/colors.css'
// import '@/assets/styles/common.css'
// import '@/assets/styles/variables.css'

// Import vue components
import * as components from '@/lib-components/index';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core'
// library.add(fas, far)

// import modalWrapper plugin
import { wrap, unwrap } from '@/plugins/modalWrapper.js'
// install function executed by Vue.use()
import { contrastDirective } from './directives/contrast.js'
console.log(contrastDirective)
const install = function installTomikTvlLibrary(Vue) {
  if (install.installed) return;
  install.installed = true;

  // setting global css custom properties
  Object.keys(variables).forEach(key => {
    document.documentElement.style.setProperty(key, variables[key])
  })
  // modalWrapper
  Vue.prototype.$wrap = wrap
  Vue.prototype.$unwrap = unwrap
  // setting global css rules by a style element
  const styl = document.createElement('style')
  document.head.appendChild(styl)
  styl.sheet.insertRule('body { background: #fff; font-size: 1.6rem; line-height: 1.3; margin: 0; width: 100vw; height: 100vh; font-family: var(--font-family-text); color: #333; }')
  styl.sheet.insertRule(':root { font-size: 62.5%; }')
  styl.sheet.insertRule('button { border: none; background-color: transparent; padding: 0; cursor: pointer;  @media screen and (-ms-high-contrast: active) { border: 2px solid currentcolor; }}')
  styl.sheet.insertRule('*, *::before, *::after { box-sizing: border-box; }')
  styl.sheet.insertRule('h1, h2, h3, h4, h5, h6 { font-family: var(--font-family-headers); margin: 0 0 0 0.65em; }')
  styl.sheet.insertRule('h1 {font-size: 4.0rem; }')
  styl.sheet.insertRule('h2 {font-size: 3.2rem; }')
  styl.sheet.insertRule('h3 {font-size: 2.4rem; }')
  styl.sheet.insertRule('h4 {font-size: 2.0rem; }')
  styl.sheet.insertRule('h5 {font-size: 1.8rem; }')
  styl.sheet.insertRule('h6 {font-size: 1.6rem; }')
  styl.sheet.insertRule('a, a:hover { text-decoration: none; }')

  // global registration custom directives
  Vue.directive('contrast', contrastDirective)
  // global registration vue components
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component)
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
