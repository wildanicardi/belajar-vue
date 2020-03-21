import Vue from "vue";
import VueRouter from "vue-router";
import TodoList from "../views/TodoList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todo-list",
    component: TodoList
  },
  {
    path: "/todo/create",
    name: "todo-create",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/TodoCreate.vue")
  },
  {
    path: "/todo/:id",
    name: "todo-show",
    component: () => import("../views/TodoShow.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
