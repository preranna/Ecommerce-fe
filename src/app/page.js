"use client";
import { useState, useEffect } from "react"; 
import axios from "axios";

export default function Home() {
  const [ProductsList, setProductList] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:15000/products");
      setProductList(response.data);
    } catch (err) {
      console.error(err);
      alert("Some error occurred while fetching data");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-center">Products</h1>
      <ul>
        {ProductsList.map((product) => (
          <li key={product.id}>
           {product.name} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
