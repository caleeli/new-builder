import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueDragDrop from 'vue-drag-drop';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Controls from './components/controls';
import Vuelidate from 'vuelidate';
import VueVuelidateJsonschema from 'vue-vuelidate-jsonschema';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

// Install drag and drop
Vue.use(VueDragDrop);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Controls)
// Install fa icons
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Install validations
Vue.use(VueVuelidateJsonschema)
Vue.use(Vuelidate);

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
localize("en", en);
// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
