import axios from "axios";

const apiCLient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
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
