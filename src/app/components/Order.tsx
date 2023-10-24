
import { useRouter } from "next/navigation";
import React from "react";

type AllOrdersFromMongo = {
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

type OrderProps = {
  order: AllOrdersFromMongo;
};

const Order = ({ order }: OrderProps) => {
  const router = useRouter();
  const originalDate = new Date(order.orderDate);
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();

  const formattedDate = `${year}/${month}/${day}`;

  const handleSubmit =  (id: string) => {
    router.push(`/dashboard/${id}`);
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
      </tr>
    </tbody>
  );
};

export default Order;
