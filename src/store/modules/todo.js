import TodoService from "@/services/TodoService.js";
export const namespaced = true;
export const state = {
  categories: ["vue js", "angular js", "react js"],
  todos: [],
  todo: {},
  perPage: 3
};
export const mutations = {
  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  SET_TODO(state, todo) {
    state.todo = todo;
  }
};
export const actions = {
  createTodo({ commit }, todo) {
    return TodoService.postTodo(todo).then(() => {
      commit("ADD_TODO", todo);
    });
  },
  async fetchTodos({ commit, dispatch, state }, { page }) {
    try {
      const { data } = await TodoService.getTodos(state.perPage, page);
      commit("SET_TODOS", data.todos.todos);
    } catch (error) {
      const notification = {
        type: "error",
        message: "There was a problem" + error.message
      };
      dispatch("notification/add", notification, {
        root: true
      });
    }
  },
  fetchTodo({ commit, getters, state }, id) {
    if (id == state.todo.id) {
      return state.todo;
    }
    var todo = getters.getTodoById(id);
    if (todo) {
      commit("SET_TODO", todo);
      return todo;
    } else {
      return TodoService.getTodo(id).then(res => {
        commit("SET_TODO", res.data);
        return res.data;
      });
    }
  }
};
export const getters = {
  getTodoById: state => id => {
    return state.todos.find(todo => todo.id === id);
  }
};
