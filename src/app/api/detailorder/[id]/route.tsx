import { connectMongoDB } from "@/app/lib/mongodb";
import Order from "@/app/models/order";
import OrderDetail from "@/app/models/orderdetail";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await connectMongoDB();
    const SelectOrder = await OrderDetail.find({ orderId: id });
    return NextResponse.json({ SelectOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await connectMongoDB();
    const DeleteDetailOrder = await OrderDetail.deleteMany({ orderId: id });
    return NextResponse.json({ DeleteDetailOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
