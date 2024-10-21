"use client";
import { useState, useEffect } from "react"; 
import axios from "axios";

export default function Home() {
  const [ProductsList, setProductList] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/products`);
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
      <h1 className="font-bold text-center p-4">Products</h1>
      <ul className="m-4">
        {ProductsList.map((product) => (
          <li key={product._id}>
           {product.name} - Stock: {product.stock}
           <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${product.imageURL}`}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
