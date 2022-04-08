import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3334'
})

const token = JSON.parse(localStorage.getItem("@redux:token") ?? "{}");
console.log(token);


const loginApi = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export { api, loginApi };
