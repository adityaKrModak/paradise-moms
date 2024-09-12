"use client";
import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

import Image from "next/image";
import shopBanner from "@/assets/shapBanner.svg";
import CartItem from "@/components/ShoppingCart/CartItem";
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

function page() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Organic Apples", price: 3.99, quantity: 0 },
    { id: 2, name: "Fresh Spinach", price: 2.49, quantity: 0 },
    { id: 3, name: "Whole Grain Bread", price: 4.99, quantity: 0 },
  ]);

  const addToCart = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const removeFromCart = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  return (
    <div className="mt-[18vh] md:mt-[25vh] bg-[#E6E6E6] pb-10">
      <Image src={shopBanner} alt="" />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          My Shopping Cart
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-green-600 truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="mx-2 text-gray-900">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <p className="flex items-center text-sm text-gray-500">
                    ${product.price.toFixed(2)} each
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    Subtotal: ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-4 sm:px-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-green-600">
                ${total.toFixed(2)}
              </p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#00B207] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
