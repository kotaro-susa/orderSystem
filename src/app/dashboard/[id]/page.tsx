"use client";
import Header from "@/app/components/Header";
import OrderDisplayInfo from "@/app/components/OrderDisplayInfo";
import { AllOrders } from "@/app/components/Orders";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export type OrderDetailFromMongoDB = {
  _id: string;
  quantity: number;
  name: string;
  price: number;
  amount: number;
  orderId: string;
  ProductId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const OrderDetail = () => {
  const [order, setOrder] = useState<AllOrders | null>(null);
  const [orderDetail, setOrderDetail] = useState<
    OrderDetailFromMongoDB[] | null
  >(null);
  const { id } = useParams();
  useEffect(() => {
    async function fetchOrder() {
      try {
        const OrderRes = await fetch(`../api/order/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const OrderDetailRes = await fetch(`../api/detailorder/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (OrderRes.ok && OrderDetailRes.ok) {
          const orderData = await OrderRes.json();
          const orderDetailData = await OrderDetailRes.json();
          console.log(orderData.SelectOrder);
          console.log(orderDetailData.SelectOrder);
          setOrder(orderData.SelectOrder);
          setOrderDetail(orderDetailData.SelectOrder);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrder();
  }, []);
  return (
    <>
      <div>
        <Header />
        <OrderDisplayInfo
          order={order}
          orderDetail={orderDetail}
          setOrder={setOrder}
          setOrderDetail={setOrderDetail}
        />
      </div>
    </>
  );
};

export default OrderDetail;
