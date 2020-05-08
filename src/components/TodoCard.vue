<template>
  <router-link
    class="todo-link"
    :to="{ name: 'todo-show', params: { id: todo.id } }"
  >
    <div class="todo-card -shadow">
      <span class="eyebrow">@{{ todo.date | date }}</span>
      <h4 class="title">{{ todo.title }}</h4>
      <BaseIcon name="users">{{ todo.data.length }} data</BaseIcon>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    todo: Object
  }
};
</script>

<style scoped>
.todo-card {
  width: 25em;
  margin: 1em auto 1em auto;
  padding: 2em;
  border: solid 1px #2c3e50;
  cursor: pointer;
  transition: all 0.2s linear;
}
.todo-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.todo-card > .title {
  margin: 0;
}
.todo-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
