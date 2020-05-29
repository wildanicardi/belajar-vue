import axios from "axios";
export const namespaced = true;
export const state = {
  user: {
    id: 1,
    name: "wildan"
  },
  users: null
};
export const mutations = {
  ADD_USER(state, payload) {
    state.users.push(payload);
  },
  SET_USER(state, payload) {
    state.users = payload;
    localStorage.setItem("user", JSON.stringify(payload));
    axios.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
  }
};
export const actions = {
  register({
    commit
  }, payload) {
    return axios
      .post("http://localhost:3000/register", payload)
      .then(({
        data
      }) => {
        commit("SET_USER", data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  login({
    commit
  }, payload) {
    return axios
      .post("http://localhost:3000/login", payload)
      .then(({
        data
      }) => {
        commit("SET_USER", data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
export const getters = {
  loggedIn(state) {
    return !!state.user;
  }
}