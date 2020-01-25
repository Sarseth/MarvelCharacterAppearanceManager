import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000";
export const eventBus = new Vue();
Vue.use(VueSimpleAlert);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
