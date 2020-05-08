<template>
  <div>
    <h1>Todo List from {{ user.user.name }}</h1>
    <TodoCard v-for="todo in todo.todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import TodoCard from "@/components/TodoCard.vue";
import { mapState} from "vuex";
import store from "@/store/index";
function getPageTodos(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store
    .dispatch("todo/fetchTodos", {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage;
      next();
    });
}
export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    TodoCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageTodos(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageTodos(routeTo, next);
  },
  computed: {
    ...mapState(["todo", "user"])
  },
};
</script>

<style></style>
