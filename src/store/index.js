import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js";
import * as todo from "@/store/modules/todo.js";
import * as notification from "@/store/modules/notification.js";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    todo,
    notification
  }
});
