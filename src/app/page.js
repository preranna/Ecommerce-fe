/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Home() {
  const [ProductsList, setProductList] = useState([]);
  const [loginToken] = useLocalStorage('loginToken', null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${ process.env.NEXT_PUBLIC_SERVER_BASE_URL }/products`);
      setProductList(response.data);
    } catch (err) {
      console.error(err);
      alert("Some error occurred while fetching data");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = async (product) => {
    console.log('adding to cart', product);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/order/add-to-cart`, {
        productId: product._id,
      }, {
        headers: {
          Authorization: `Bearer ${ loginToken.token }`
        }
      });
    } catch (error) {
      alert('some error occured while adding to cart')
    }
  };

  return (
    <div>
      <h1 className="font-bold text-center p-4">Products</h1>
      <ul className="m-4 flex flex-wrap gap-4">
        {ProductsList.map((product) => (
          <li key={product._id} className="border p-2 rounded" >
            <img
              src={`${ process.env.NEXT_PUBLIC_SERVER_BASE_URL }/${ product.imageUrl }`}
              className="w-40 aspect-square object-contain mb-2 mx-auto"
              alt={product.name}
            />
            <div className="text-center">
              <h4 className="text-xl font-semibold">{product.name}</h4>
              <p>Rs. {product.price}</p>
              <div className="flex gap-1 justify-between" >
                <button className="py-1 px-2 bg-gray-400 text-white rounded">buy now</button>
                <button className="py-1 px-2 bg-blue-500 text-white rounded" onClick={() => handleAddToCart(product)}>add to cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}