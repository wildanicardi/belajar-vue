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
  getTodos(perPage, page) {
    return apiCLient.get("/todos?_limit=" + perPage + "&_page=" + page);
  },
  getTodo(id) {
    return apiCLient.get("/todos/" + id);
  },
  postTodo(todo) {
    return apiCLient.post("/todos", todo);
  }
};
