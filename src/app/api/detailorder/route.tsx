import { connectMongoDB } from "@/app/lib/mongodb";
import Order from "@/app/models/order";
import OrderDetail from "@/app/models/orderdetail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { quantity, name, price, orderId, ProductId, amount } =
      await req.json();
    await connectMongoDB();
    const newOrder = await OrderDetail.create({
      quantity: quantity,
      name: name,
      price: price,
      amount: amount,
      orderId: orderId,
      ProductId: ProductId,
    });
    return NextResponse.json(
      { newOrder, message: "ユーザーの登録が完了しました" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}

