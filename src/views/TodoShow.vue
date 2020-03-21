<template>
  <div>
    <div class="todo-header">
      <span class="eyebrow">@{{ todo.date }}</span>
      <h1 class="title">{{ todo.title }}</h1>
      <h2>todo details</h2>
      <p>{{ todo.description }}</p>

      <h2>
        Data
        <span class="badge -fill-gradient">{{
          todo.data ? todo.data.length : 0
        }}</span>
      </h2>
      <ul class="list-group">
        <li v-for="(data, index) in todo.data" :key="index" class="list-item">
          <b>{{ data.name }}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["id"],
  created() {
    this.fetchTodo(this.id);
  },
  computed: mapState({
    todo: state => state.todo.todo
  }),
  methods: mapActions("todo", ["fetchTodo"])
};
</script>

<style>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.todo-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
