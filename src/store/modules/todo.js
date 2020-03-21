import TodoService from "@/services/TodoService.js";
export const namespaced = true;
export const state = {
  categories: ["vue js", "angular js", "react js"],
  todos: [],
  todo: {}
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
  fetchTodos({ commit, dispatch }, { perPage, page }) {
    return TodoService.getTodos(perPage, page)
      .then(res => {
        commit("SET_TODOS", res.data);
      })
      .catch(err => {
        const notification = {
          type: "error",
          message: "There was a problem" + err.message
        };
        dispatch("notification/add", notification, {
          root: true
        });
      });
  },
  fetchTodo({ commit, getters, dispatch }, id) {
    var todo = getters.getTodoById(id);
    if (todo) {
      commit("SET_TODO", todo);
    } else {
      TodoService.getTodo(id)
        .then(res => {
          commit("SET_TODO", res.data);
        })
        .catch(err => {
          const notification = {
            type: "error",
            message: "There was a problem" + err.message
          };
          dispatch("notification/add", notification, {
            root: true
          });
        });
    }
  }
};
export const getters = {
  getTodoById: state => id => {
    return state.todos.find(todo => todo.id === id);
  }
};
