import Vue from "vue";
import VueRouter from "vue-router";
import TodoList from "../views/TodoList.vue";
import Home from "../views/Home.vue";
import NProgress from "nprogress";
import store from "@/store/index";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: Home,
    props: true
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: TodoList,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterUser.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/todos/create",
    name: "todo-create",
    component: () => import("../views/TodoCreate.vue")
  },
  {
    path: "/todos/:id",
    name: "todo-show",
    component: () => import("../views/TodoShow.vue"),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch("todo/fetchTodo", routeTo.params.id)
        .then(todo => {
          routeTo.params.todo = todo;
          next();
        })
        .catch(err => {
          if (err.response && err.response.status == 404) {
            next({
              name: "404",
              params: {
                resource: "todo"
              }
            });
          } else {
            next({
              name: "network-issue"
            });
          }
        });
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/NotFound.vue"),
    props: true
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: () => import("../views/NetworkIssue.vue")
  },
  {
    path: "*",
    redirect: {
      name: "404",
      params: {
        resource: "todo"
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  const loggedIn = localStorage.getItem('user');
  if (routeTo.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/');
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;