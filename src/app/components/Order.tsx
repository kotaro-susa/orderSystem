import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AllOrders } from "./Orders";

type OrderProps = {
  order: AllOrders;
};

const Order = ({ order }: OrderProps) => {
  const router = useRouter();
  const originalDate = new Date(order.orderDate);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();

  const formattedDate = `${year}/${month}/${day}`;

  const handleSubmit = (id: string) => {
    router.push(`/dashboard/${id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const OrderDeleteRes = await fetch(`../api/order/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const OrderDetailDeleteRes = await fetch(`../api/detailorder/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (OrderDeleteRes.ok && OrderDetailDeleteRes.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tbody>
      <tr className="text-center">
        <td className="pb-2">{formattedDate}</td>
        <td className="pb-2">{order._id}</td>
        <td className="pb-2">{order.customerName}</td>
        <td className="pb-2">{order.shippingAddress}</td>
        <td className="pb-2">{order.totalAmount}</td>
        <td className="pb-2">{order.status}</td>
        <td className="pb-2">
          <button
            className="border-gray-700 text-base text-white bg-gray-700 rounded-sm p-1 font-bold"
            onClick={() => handleSubmit(order._id)}
          >
            詳細
          </button>
        </td>
        <td className="pb-2">
          <button
            className="border-red-700 text-base text-white bg-red-700 rounded-sm p-1 font-bold"
            onClick={() => handleDelete(order._id)}
          >
            削除
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Order;
