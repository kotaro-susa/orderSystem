import { connectMongoDB } from "@/app/lib/mongodb";
import Order from "@/app/models/order";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await connectMongoDB();
    const SelectOrder = await Order.findOne({ _id: id });
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
    const DeleteOrder = await Order.deleteOne({ _id: id });
    return NextResponse.json({ DeleteOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { shippingAddress, status } = await req.json();
    const id = params.id;
    await connectMongoDB();
    await Order.updateOne(
      {
        _id: id,
      },
      { $set: { shippingAddress: shippingAddress, status: status } }
    );
    return NextResponse.json(
      { message: "更新が完了しました" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
