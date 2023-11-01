import React, { Dispatch, SetStateAction, useState } from "react";
import { AllOrders } from "./Orders";
import { OrderDetailFromMongoDB } from "../dashboard/[id]/page";
import { useRouter } from "next/navigation";

type MyComponentProps = {
  order: AllOrders | null;
  orderDetail: OrderDetailFromMongoDB[] | null;
  setOrder: Dispatch<SetStateAction<AllOrders | null>>;
  setOrderDetail: Dispatch<SetStateAction<OrderDetailFromMongoDB[] | null>>;
};

const OrderDisplayInfo = ({
  order,
  orderDetail,
  setOrder,
  setOrderDetail,
}: MyComponentProps) => {
  const options = [
    { value: "発送準備中", label: "発送準備中" },
    { value: "発送済", label: "発送済" },
    { value: "返品", label: "返品" },
  ];
  const router = useRouter();
  const handleUpdate = async (id: string) => {
    try {
      const OrderUpdatedRes = await fetch(`../api/order/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress: order?.shippingAddress,
          status: order?.status,
        }),
      });
      if (OrderUpdatedRes.ok) {
        return router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {order && (
        <div>
          <div>注文者名</div>
          <div className="border border-gray-400 p-2 mt-2 mb-4 w-2/4">
            {order.customerName}
          </div>
          <div>注文日時</div>
          <div className="border border-gray-400 p-2 mt-2 mb-4 w-2/4">
            {order.orderDate}
          </div>
          <div className="font-bold text-blue-400">送付先（※変更可能）</div>
          <input
            type="text"
            className="border border-gray-400 p-2 mt-2 mb-4 w-2/4"
            value={order.shippingAddress}
            onChange={(e) =>
              setOrder({ ...order, shippingAddress: e.target.value })
            }
          />
          <div className="font-bold text-blue-400">ステータス（※変更可能）</div>
          <select
            className="border border-gray-400 p-2 mt-2 mb-4 w-1/5"
            value={order.status}
            onChange={(e) => setOrder({ ...order, status: e.target.value })}
          >
            <option>{order.status}</option>
            {options.map((option) => {
              if (order.status !== option.value) {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              }
            })}
          </select>
          <div>合計金額</div>
          <div className="border border-gray-400 p-2 mt-2 mb-4 w-1/5">
            {order.totalAmount}
          </div>
          <div>注文詳細</div>
          {orderDetail?.map((detail, index) => {
            return (
              <div className="mt-3 ml-3" key={detail._id}>
                注文{index + 1}
                <div key={detail._id} className="flex flex-wrap p-2">
                  <p className="border border-gray-400 p-2 mt-2 mb-4 w-1/5 mr-2">
                    商品名: {detail.name}
                  </p>
                  <p className="border border-gray-400 p-2 mt-2 mb-4 w-1/5 mr-2">
                    数量: {detail.quantity}
                  </p>
                  <p className="border border-gray-400 p-2 mt-2 mb-4 w-1/5">
                    値段: {detail.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button
        className="border-blue-700 text-base text-white bg-blue-700 rounded-sm p-1 font-bold"
        onClick={() => handleUpdate(order._id)}
      >
        更新する
      </button>
    </>
  );
};

export default OrderDisplayInfo;
