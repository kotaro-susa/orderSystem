import { connectMongoDB } from "@/app/lib/mongodb";
import Order from "@/app/models/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const AllOrders = await Order.find({});
    return NextResponse.json({ AllOrders }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
