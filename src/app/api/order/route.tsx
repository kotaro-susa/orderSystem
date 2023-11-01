import { connectMongoDB } from "@/app/lib/mongodb";
import Order from "@/app/models/order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { orderName, shippingAddress, orderDate, totalAmount, status } =
      await req.json();
    const numericTotalAmount = parseFloat(totalAmount);
    await connectMongoDB();
    const newOrder = await Order.create({
      customerName: orderName,
      shippingAddress: shippingAddress,
      orderDate: orderDate,
      totalAmount: numericTotalAmount,
      status: status,
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


