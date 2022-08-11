import React, { useEffect, useState } from "react";
/* import axios from "axios"; */
import Nav from "./components/Nav/Nav";
import ListProducts from "./components/ListProducts/ListProducts";
import  {getProducts}  from "./service/serviceProducts";
import AuthProvider from "./components/Context/AuthContext";

export default function App() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data, error } = await getProducts();
    data ? setProducts(data) : console.log(error);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <AuthProvider>
      <Nav />
      <ListProducts items={products}/>
    </AuthProvider>
  )
}
