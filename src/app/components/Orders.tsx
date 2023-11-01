"use client";
import React, { useEffect, useState } from "react";
import Order from "./Order";

export type AllOrders = {
  createdAt: string;
  customerName: string;
  orderDate: string;
  shippingAddress: string;
  status: string;
  totalAmount: number;
  updatedAt: string;
  __v: number;
  _id: string;
};

const Orders = () => {
  const [allOrders, setAllOrders] = useState<AllOrders[] | null>(null);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("api/dashboard", {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setAllOrders(data.AllOrders);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(allOrders);
  }, [allOrders]);
  return (
    <div className="w-full">
      <table className="border-solid border-2 shadow-xl mx-auto">
        <thead>
          <tr className="border-solid border-4">
            <th className="w-1/14">注文日付</th>
            <th className="w-1/6">注文番号</th>
            <th className="w-1/7">注文者</th>
            <th className="w-1/7">住所</th>
            <th className="w-1/7">合計金額</th>
            <th className="w-1/7">ステータス</th>
            <th className="w-1/7">詳細</th>
            <th className="w-1/7">削除</th>
          </tr>
        </thead>
        {allOrders &&
          allOrders.map((order) => {
            return <Order key={order._id} order={order} />;
          })}
      </table>
    </div>
  );
};

export default Orders;
