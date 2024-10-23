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

  const handleBuyNow = async (productId) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/order/buy-now`,{
      productId
    });
    alert('Product bought successfully');
  }

  return (
    <div>
      <h1 className="font-bold text-center p-4">Products</h1>
      <div className="m-4 flex flex-wrap gap-2">
        {ProductsList.map((product) => (
          <div key={product._id} className="flex flex-col border rounded p-2" >   
           <img src={`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${product.imageURL}`} className="w-72 aspect-square object-contain"/>
           <h3 className="text-2xl">
           {product.name} 
           </h3>
           <span className="text-xl">NPR. {product.price}</span>
           <button className="bg-gray-300" onClick ={() => handleBuyNow(product._id)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
