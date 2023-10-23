"use client";
import React, { useState } from "react";

const ProductRegistration = () => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productDescription, setProductDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  console.log(productDescription);
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value);
    setProductPrice(isNaN(price) ? 0 : price);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productName || !productPrice || !productDescription) {
      setError("全て入力してください");
      return;
    }
    try {
      const res = await fetch(`api/product`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ productName, productPrice, productDescription }),
      });
      if (res.ok) {
        const form: HTMLFormElement = e.target as HTMLFormElement;
        form.reset();
        console.log("成功");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>商品名</div>
        <input
          type="text"
          placeholder="名前"
          className="border border-gray-200 p-2"
          onChange={(e) => setProductName(e.target.value)}
          id="name"
        />
        <div>値段</div>
        <input
          type="number"
          placeholder="値段"
          className="border border-gray-200 p-2"
          min="0"
          id="price"
          onChange={handlePriceChange}
        />
        <div>商品説明</div>
        <textarea
          placeholder="商品説明"
          className="border border-gray-200 p-2"
          id="description"
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <div>
          <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2 mt-2">
            登録する
          </button>
          {error && (
            <>
              {" "}
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductRegistration;
