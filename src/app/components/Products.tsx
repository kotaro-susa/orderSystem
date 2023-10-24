"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";

type ProductType = {
  _id: string;
  productName: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type OrderDetail = {
  quantity: number;
  name: string;
  price: number;
  orderId: string | null;
  ProductId: string;
  amount: number;
};

const Products = () => {
  const [orderList, setOrderList] = useState<OrderDetail[] | null>(null);
  const [orderName, setOrderName] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleQuantityIncrease = (id: string) => {
    setOrderList((prevOrderList) =>
      prevOrderList!.map((product) => {
        if (product.ProductId === id) {
          const updatedQuantity = product.quantity + 1;
          const updatedAmount = updatedQuantity * product.price;
          setTotalAmount(totalAmount + product.price);
          return {
            ...product,
            quantity: updatedQuantity,
            amount: updatedAmount,
          };
        }
        return product;
      })
    );
  };

  const handleQuantityDecrease = (id: String) => {
    setOrderList((prevOrderList) =>
      prevOrderList!.map((product) => {
        if (product.ProductId === id && product.quantity > 0) {
          const updatedQuantity = product.quantity - 1;
          const updatedAmount = updatedQuantity * product.price;
          setTotalAmount(totalAmount - product.price);
          return {
            ...product,
            quantity: updatedQuantity,
            amount: updatedAmount,
          };
        }
        return product;
      })
    );
  };

  const handleNewOrder = async () => {
    if (!orderName || !shippingAddress) {
      setError("全部入力してください");
      return;
    }
    try {
      const orderDate = new Date();
      const NewOrderRes = await fetch(`api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderName,
          shippingAddress,
          orderDate,
          totalAmount,
          status: "発送準備中",
        }),
      });
      if (NewOrderRes.ok) {
        NewOrderRes.json() // JSONデータを非同期に取得するPromiseを返す
          .then((res) => {
            const NewOrderList = orderList!.filter(
              (product) => product.quantity > 0
            );
            NewOrderList.forEach(async (product) => {
              const NewOrderRes = await fetch(`api/detailorder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...product, orderId: res.newOrder._id }),
              });
            });
          });
      }
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`api/product`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.products) {
            const SingleOrders = data.products!.map((product: ProductType) => ({
              quantity: 0,
              name: product.productName,
              price: product.price,
              orderId: null,
              ProductId: product._id,
              amount: 0,
            }));
            setOrderList(SingleOrders);
          }
        } else {
          console.log("データを取得できませんでした");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="flex justify-end">合計:{totalAmount}</div>
      <div>注文者名</div>
      <input
        id="orderName"
        type="text"
        placeholder="注文者名"
        className="border border-gray-200 p-2 mt-2 mb-4"
        onChange={(e) => setOrderName(e.target.value)}
      />

      <div>住所</div>
      <input
        id="orderAddress"
        type="text"
        placeholder="住所"
        className="border border-gray-200 p-2 mt-2 mb-4 w-2/4"
        onChange={(e) => setShippingAddress(e.target.value)}
      />
      <div>
        <button
          className="border border-blue-200 p-2 mt-2 mb-4"
          onClick={handleNewOrder}
        >
          注文する
        </button>
      </div>

      <div>
        {orderList ? (
          <div className="flex gap-3 flex-wrap">
            {orderList.map((product, index) => (
              <article key={product.ProductId}>
                <div>
                  <img src="https://picsum.photos/200/300" alt="#" />
                </div>
                <div>商品名: {product.name}</div>
                <div>値段: ¥{product.price}</div>
                <div>
                  <button
                    onClick={() => handleQuantityIncrease(product.ProductId)}
                  >
                    ＋
                  </button>
                  {product.quantity}
                  <button
                    onClick={() => handleQuantityDecrease(product.ProductId)}
                  >
                    －
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Products;
