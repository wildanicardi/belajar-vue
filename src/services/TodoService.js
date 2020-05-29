import axios from "axios";
import NProgress from "nprogress";

const apiCLient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 1000
});
apiCLient.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

apiCLient.interceptors.response.use(config => {
  NProgress.done();
  return config;
});
export default {
  getTodos() {
    return apiCLient.get("/dashboard");
  },
  getTodo(id) {
    return apiCLient.get("/dashboard/" + id);
  },
  postTodo(todo) {
    return apiCLient.post("/dashboard", todo);
  }
};
