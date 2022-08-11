import { Get, Delete } from './privateServices';

const PRODUCTS_ENDPOINT = process.env.API_PRODUCTS_ENDPOINT;
console.log(PRODUCTS_ENDPOINT)
const getProducts = async () => {
  const response = { error: null, data: {} };
  try {
    const { data } = await Get('http://localhost:8080/api/productos');
    response.data = data;
  } catch (error) {
    response.error = error.message;
  }
  return response;
};

const getProductsById = async (id) => {
  const response = { error: null, data: [] };
  try {
    const { data } = await Get(`http://localhost:8080/api/productos/${id}`);
    response.data = data;
  } catch (error) {
    response.error = error.message;
  }
  return response;
};

const deleteProduct = async (id) => {
  const response = { error: null, data: [] };
  try {
    const { data } = await Delete(id);
    response.data = data;
  } catch (error) {
    response.error = error.message;
  }
  return response;
}


export { getProducts, getProductsById, deleteProduct};