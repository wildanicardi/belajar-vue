<template>
  <div>
    <h1>Todo List</h1>
    <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import TodoCard from "@/components/TodoCard.vue";
import TodoService from "@/services/TodoService.js";
export default {
  components: {
    TodoCard
  },
  data() {
    return {
      todos: []
    };
  },
  created() {
    TodoService.getTodos()
      .then(res => {
        this.todos = res.data;
      })
      .catch(err => {
        console.log("There was an error" + err.response);
      });
  }
};
</script>

<style></style>
