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
        :class="{ error: $v.todo.title.$error }"
        @blur="$v.todo.title.$touch()"
      />
      <template v-if="$v.todo.title.$error">
        <p v-if="!$v.todo.title.required" class="errorMessage">
          Title is required
        </p>
      </template>
      <BaseInput
        label="Description"
        v-model="todo.description"
        type="text"
        placeholder="Add a Description"
        class="field"
        :class="{ error: $v.todo.description.$error }"
        @blur="$v.todo.description.$touch()"
      />
      <template v-if="$v.todo.description.$error">
        <p v-if="!$v.todo.description.required" class="errorMessage">
          Description is required
        </p>
      </template>
      <h3>When is your todo?</h3>

      <div class="field">
        <label>Date</label>
        <Datepicker
          v-model="todo.date"
          placeholder="Select a date"
          :input-class="{ error: $v.todo.date.$error }"
          @opened="$v.todo.date.$touch()"
        />
      </div>
      <template v-if="$v.todo.date.$error">
        <p v-if="!$v.todo.date.required" class="errorMessage">
          Date is required
        </p>
      </template>
      <BaseButton
        type="submit"
        :disabled="$v.anyError"
        buttonClass="-fill-gradient"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError">Please fill out required</p>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";
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
  validations: {
    todo: {
      title: { required },
      description: { required },
      date: { required }
    }
  },
  methods: {
    createTodo() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
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
      }
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
