<template>
  <div>
    <h1>Todo List from {{ user.user.name }}</h1>
    <TodoCard v-for="todo in todo.todos" :key="todo.id" :todo="todo" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'todo-list', query: { page: page - 1 } }"
        rel="prev"
        >Preview Page</router-link
      >|
    </template>
    <router-link
      :to="{ name: 'todo-list', query: { page: page + 1 } }"
      rel="next"
      >Next Page</router-link
    >|
  </div>
</template>

<script>
import TodoCard from "@/components/TodoCard.vue";
import { mapState } from "vuex";
export default {
  components: {
    TodoCard
  },

  created() {
    this.perPage = 3;
    this.$store.dispatch("todo/fetchTodos", {
      perPage: this.perPage,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["todo", "user"])
  }
};
</script>

<style></style>
