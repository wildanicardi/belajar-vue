<template>
  <div>
    <h1>Todo List from {{ user.user.name }}</h1>
    <TodoCard v-for="todo in todo.todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import TodoCard from "@/components/TodoCard.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    TodoCard,
  },
  created() {
    this.fetchTodos();
  },
  computed: {
    ...mapState(["todo", "user"]),
  },
  methods: {
    ...mapActions({
      fetchTodos: "todo/fetchTodos",
    }),
  },
};
</script>

<style></style>
