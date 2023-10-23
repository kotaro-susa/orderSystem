import { connectMongoDB } from "@/app/lib/mongodb";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { productName, productPrice, productDescription } = await req.json();
    await connectMongoDB();
    await Product.create({
      productName: productName,
      price: productPrice,
      description: productDescription,
    });
    return NextResponse.json(
      { message: "ユーザーの登録が完了しました" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const products = await Product.find({});
    return NextResponse.json({ products }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
