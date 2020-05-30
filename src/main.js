import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "nprogress/nprogress.css";
import Vuelidate from "vuelidate";
import DateFilter from "./filters/date";
import axios from 'axios';

Vue.filter("date", DateFilter);

Vue.use(Vuelidate);

const requireComponent = require.context(
  // The relative path of the components folder
  "./components",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
      .split("/")
      .pop()
      .replace(/\.\w+$/, "")
    )
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

new Vue({
  router,
  store,
  created() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit('user/SET_USER', userData);
    }
    axios.interceptors.response.user(
      response => response,
      error => {
        if (error.response.staus === 401) {
          this.$store.dispatch('user/logout');
        }
        return Promise.reject(error);
      }
    )

  },
  render: h => h(App)
}).$mount("#app");