import axios from 'axios';

const apiCLient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: "application/json",
    'Content-Type': 'application/json'
  }
});

export default {
  getTodos() {
    return apiCLient.get('/todos');
  },
  getTodo(id) {
    return apiCLient.get('/todos/' + id);
  }
}