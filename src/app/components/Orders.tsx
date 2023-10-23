"use client";
import React from "react";
import Order from "./Order";

const Orders = () => {
  // データを取得する
  return (
    <div className="">
      <table className="border-solid border-2 shadow-xl">
        <thead>
          <tr className="border-solid border-4">
            <th>注文番号</th>
            <th>注文者</th>
            <th>住所</th>
            <th>請求金額</th>
            <th>ステータス</th>
          </tr>
        </thead>
        <Order />
      </table>
    </div>
  );
};

export default Orders;
