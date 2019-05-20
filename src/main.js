import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/ja.js";
import "element-ui/lib/theme-chalk/index.css";
import firebase from "firebase";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/vs2015.css";
require("code-prettify/styles/sunburst.css");

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(VueHighlightJS);

var firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
