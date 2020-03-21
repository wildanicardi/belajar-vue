<template>
  <div>
    <h1>Create Todo</h1>
    <form @submit.prevent="createTodo">
      <h3>Title & describe your todo</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="todo.title"
          type="text"
          placeholder="Add an todo title"
        />
      </div>

      <div class="field">
        <label>Description</label>
        <input
          v-model="todo.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>When is your todo?</h3>

      <div class="field">
        <label>Date</label>
        <Datepicker v-model="todo.date" placeholder="Select a date" />
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
export default {
  components: {
    Datepicker
  },
  computed: {},
  data() {
    return {
      todo: this.createFreshTodoObject()
    };
  },
  methods: {
    createTodo() {
      this.$store
        .dispatch("todo/createTodo", this.todo)
        .then(() => {
          this.$router.push({
            name: "todo-show",
            params: { id: this.todo.id }
          });
          this.todo = this.createFreshTodoObject();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    createFreshTodoObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 100000000);

      return {
        id: id,
        user: user,
        title: "",
        description: "",
        date: "",
        data: []
      };
    }
  }
};
</script>

<style>
.field {
  margin-bottom: 24px;
}
</style>
