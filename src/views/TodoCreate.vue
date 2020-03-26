<template>
  <div>
    <h1>Create Todo</h1>
    <form @submit.prevent="createTodo">
      <h3>Title & describe your todo</h3>
      <BaseInput
        label="Title"
        v-model="todo.title"
        type="text"
        placeholder="Add a Title"
        class="field"
      />
      <BaseInput
        label="Description"
        v-model="todo.description"
        type="text"
        placeholder="Add a Description"
        class="field"
      />

      <h3>When is your todo?</h3>

      <div class="field">
        <label>Date</label>
        <Datepicker v-model="todo.date" placeholder="Select a date" />
      </div>
      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
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
      NProgress.start();
      this.$store
        .dispatch("todo/createTodo", this.todo)
        .then(() => {
          this.$router.push({
            name: "todo-show",
            params: { id: this.todo.id }
          });
          this.todo = this.createFreshTodoObject();
        })
        .catch(() => {
          NProgress.done();
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
