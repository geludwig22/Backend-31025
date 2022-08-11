import axios from 'axios';

const config = {
  baseURL: process.env.API_PRODUCTS_ENDPOINT,
  headers: {
    "content-type": "application/json",
  },
};
const URL = 'http://localhost:8080/api/productos';
const instance = axios.create( config );

const Get = async (url, id = null) => {
  const response = {data:[], error: null};
  try {
    const { data } = await instance.get(`${URL}${id ? '/' + id : ''}`);
    response.data = data;
  } catch (error) {
    response.error = error;
  }
  return response;
};

const Delete = async (id) => {
  const response = {};
  try {
    const { data } = await instance.delete( `${URL}/${id}`);
    response.data = data;
  } catch (error) {
    response.error = error;
  }
  return response;
};
  export { Get, Delete };